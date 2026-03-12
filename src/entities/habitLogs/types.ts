import type { LogEntry } from "../../utils/habits";

export type ToggleLogInput = {
  habitId: number;
  date: string;
};

export interface LogsClientContract {
  listLogs: (code: string) => Promise<LogEntry[]>;
  listLogsByRange: (from: string, to: string, code: string) => Promise<LogEntry[]>;
  toggleLog: (input: ToggleLogInput, code: string) => Promise<LogEntry | null>;
  softDeleteLogsByHabit: (habitId: number, code: string) => Promise<void>;
}
