import type { LogEntry } from "../../utils/habits";

export type ToggleLogInput = {
  habitId: number;
  date: string;
};

export interface LogsClientContract {
  listLogs: () => Promise<LogEntry[]>;
  listLogsByRange: (from: string, to: string) => Promise<LogEntry[]>;
  toggleLog: (input: ToggleLogInput) => Promise<LogEntry | null>;
  softDeleteLogsByHabit: (habitId: number) => Promise<void>;
}
