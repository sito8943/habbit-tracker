import type { CSSProperties } from "react";

export type UseHabitListOptions = {
  onInteraction?: () => void;
};

export type HabitListItemViewModel = {
  id: number;
  name: string;
  inputId: string;
  logged: boolean;
  streak: number;
  style: CSSProperties;
};

export type UseHabitListResult = {
  items: HabitListItemViewModel[];
  isEmpty: boolean;
  error: Error | null;
  isSyncing: boolean;
  isDeletingHabit: boolean;
  onDelete: (id: number) => void;
  onToggle: (habitId: number) => void;
};
