import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "../../lib/supabase/database.types";
import type { LogEntry } from "../../utils/habits";
import type { LogsClientContract, ToggleLogInput } from "./types";

type HabitLogRow = Database["public"]["Tables"]["habit_logs"]["Row"];

const mapLogRow = (row: HabitLogRow): LogEntry => ({
  id: row.id,
  habitId: row.habit_id,
  date: row.log_date,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
  deletedAt: row.deleted_at,
});

export class LogsClient implements LogsClientContract {
  private readonly supabase: SupabaseClient<Database>;

  constructor(supabase: SupabaseClient<Database>) {
    this.supabase = supabase;
  }

  async listLogs(code: string): Promise<LogEntry[]> {
    const { data, error } = await this.supabase
      .from("habit_logs")
      .select("*, habits!inner(code)")
      .eq("habits.code", code)
      .is("deleted_at", null)
      .order("log_date", { ascending: false });

    if (error) {
      throw new Error(`Failed to load logs: ${error.message}`);
    }

    return ((data as HabitLogRow[] | null) ?? []).map(mapLogRow);
  }

  async listLogsByRange(from: string, to: string, code: string): Promise<LogEntry[]> {
    const { data, error } = await this.supabase
      .from("habit_logs")
      .select("*, habits!inner(code)")
      .eq("habits.code", code)
      .is("deleted_at", null)
      .gte("log_date", from)
      .lte("log_date", to)
      .order("log_date", { ascending: true });

    if (error) {
      throw new Error(`Failed to load logs by range: ${error.message}`);
    }

    return ((data as HabitLogRow[] | null) ?? []).map(mapLogRow);
  }

  async toggleLog(input: ToggleLogInput, code: string): Promise<LogEntry | null> {
    const { data: matchingHabit, error: habitError } = await this.supabase
      .from("habits")
      .select("id")
      .eq("id", input.habitId)
      .eq("code", code)
      .is("deleted_at", null)
      .maybeSingle();

    if (habitError) {
      throw new Error(`Failed to validate habit code: ${habitError.message}`);
    }

    if (!matchingHabit) {
      throw new Error("This habit does not belong to the active recovery code.");
    }

    const { data: existing, error: findError } = await this.supabase
      .from("habit_logs")
      .select("*, habits!inner(code)")
      .eq("habit_id", input.habitId)
      .eq("log_date", input.date)
      .eq("habits.code", code)
      .is("deleted_at", null)
      .maybeSingle();

    if (findError) {
      throw new Error(`Failed to toggle log: ${findError.message}`);
    }

    const existingLog = existing as (HabitLogRow & { habits: { code: string } }) | null;

    if (existingLog) {
      const { error: deleteError } = await this.supabase
        .from("habit_logs")
        .update({ deleted_at: new Date().toISOString() })
        .eq("id", existingLog.id)
        .is("deleted_at", null);

      if (deleteError) {
        throw new Error(`Failed to remove log: ${deleteError.message}`);
      }

      return null;
    }

    const { data: inserted, error: insertError } = await this.supabase
      .from("habit_logs")
      .insert({
        habit_id: input.habitId,
        log_date: input.date,
      })
      .select("*")
      .single();

    if (insertError) {
      throw new Error(`Failed to create log: ${insertError.message}`);
    }

    return mapLogRow(inserted as HabitLogRow);
  }

  async softDeleteLogsByHabit(habitId: number, code: string): Promise<void> {
    const { data: matchingHabit, error: habitError } = await this.supabase
      .from("habits")
      .select("id")
      .eq("id", habitId)
      .eq("code", code)
      .is("deleted_at", null)
      .maybeSingle();

    if (habitError) {
      throw new Error(`Failed to validate habit before deleting logs: ${habitError.message}`);
    }

    if (!matchingHabit) {
      return;
    }

    const { error } = await this.supabase
      .from("habit_logs")
      .update({ deleted_at: new Date().toISOString() })
      .eq("habit_id", habitId)
      .is("deleted_at", null);

    if (error) {
      throw new Error(`Failed to delete habit logs: ${error.message}`);
    }
  }
}
