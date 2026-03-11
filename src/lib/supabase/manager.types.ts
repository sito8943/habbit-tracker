import type { HabitsClientContract } from "../../entities/habits";
import type { LogsClientContract } from "../../entities/habitLogs";

export type SupabaseManagerLike = {
  habitsClient: HabitsClientContract;
  logsClient: LogsClientContract;
};
