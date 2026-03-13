import type { ReactNode } from "react";
import type { Habit, LogEntry } from "../../utils/habits";

export type HabitsContextType = {
  habits: Habit[];
  logs: LogEntry[];
  selectedDate: string;
  addHabit: (name: string, color: string) => void;
  deleteHabit: (id: number) => void;
  toggleLog: (habitId: number) => void;
  selectDate: (date: string) => void;
  isLoading: boolean;
  isSyncing: boolean;
  isCreatingHabit: boolean;
  isDeletingHabit: boolean;
  isTogglingLog: boolean;
  error: Error | null;
};

export type HabitsProviderProps = {
  children: ReactNode;
};
