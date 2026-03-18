import { HabitsClient } from "../../../features/habits/entities/habits";
import { LogsClient } from "../../../features/habits/entities/habitLogs";
import { createSupabaseClient } from "./client";
import type { SupabaseManagerLike } from "./manager.types";

export class SupabaseManager implements SupabaseManagerLike {
  readonly habitsClient;
  readonly logsClient;

  constructor() {
    const supabase = createSupabaseClient();
    this.habitsClient = new HabitsClient(supabase);
    this.logsClient = new LogsClient(supabase);
  }
}
