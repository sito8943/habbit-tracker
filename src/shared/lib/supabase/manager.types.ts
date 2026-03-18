import type { HabitsClientContract } from "../../../features/habits/entities/habits";
import type { LogsClientContract } from "../../../features/habits/entities/habitLogs";

export type SupabaseManagerLike = {
  habitsClient: HabitsClientContract;
  logsClient: LogsClientContract;
};
