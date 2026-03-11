import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "../../lib/supabase/database.types";
import type { Habit } from "../../utils/habits";
import type { CreateHabitInput, HabitsClientContract } from "./types";

type HabitRow = Database["public"]["Tables"]["habits"]["Row"];

const mapHabitRow = (row: HabitRow): Habit => ({
  id: row.id,
  name: row.name,
  color: row.color,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
  deletedAt: row.deleted_at,
});

export class HabitsClient implements HabitsClientContract {
  private readonly supabase: SupabaseClient<Database>;

  constructor(supabase: SupabaseClient<Database>) {
    this.supabase = supabase;
  }

  async listHabits(): Promise<Habit[]> {
    const { data, error } = await this.supabase
      .from("habits")
      .select("*")
      .is("deleted_at", null)
      .order("created_at", { ascending: true });

    if (error) {
      throw new Error(`Failed to load habits: ${error.message}`);
    }

    return ((data as HabitRow[] | null) ?? []).map(mapHabitRow);
  }

  async createHabit(input: CreateHabitInput): Promise<Habit> {
    const { data, error } = await this.supabase
      .from("habits")
      .insert({
        name: input.name,
        color: input.color,
      })
      .select("*")
      .single();

    if (error) {
      throw new Error(`Failed to create habit: ${error.message}`);
    }

    return mapHabitRow(data as HabitRow);
  }

  async softDeleteHabit(id: number): Promise<void> {
    const { error } = await this.supabase
      .from("habits")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", id)
      .is("deleted_at", null);

    if (error) {
      throw new Error(`Failed to delete habit: ${error.message}`);
    }
  }
}
