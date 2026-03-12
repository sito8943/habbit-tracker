import { createContext, useContext } from "react";
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

export const HabitsContext = createContext<HabitsContextType | null>(null);

export const useHabitsContext = (): HabitsContextType => {
  const context = useContext(HabitsContext);

  if (!context) {
    throw new Error("useHabitsContext must be used within a HabitsProvider");
  }

  return context;
};
