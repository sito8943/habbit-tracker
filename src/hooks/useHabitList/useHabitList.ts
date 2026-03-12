import { useCallback, useMemo, type CSSProperties } from "react";
import { useHabitsContext } from "../../providers/Habits";
import { getStreak, isLogged } from "../../utils/habits";
import type { UseHabitListOptions, UseHabitListResult } from "./types";

export const useHabitList = ({ onInteraction }: UseHabitListOptions = {}): UseHabitListResult => {
  const { habits, logs, selectedDate, deleteHabit, toggleLog, error, isSyncing, isDeletingHabit } =
    useHabitsContext();

  const onDelete = useCallback(
    (id: number) => {
      onInteraction?.();
      deleteHabit(id);
    },
    [deleteHabit, onInteraction]
  );

  const onToggle = useCallback(
    (habitId: number) => {
      onInteraction?.();
      toggleLog(habitId);
    },
    [onInteraction, toggleLog]
  );

  const items = useMemo(
    () =>
      habits.map((habit) => ({
        id: habit.id,
        name: habit.name,
        inputId: `habit-${habit.id}`,
        logged: isLogged(logs, habit.id, selectedDate),
        streak: getStreak(logs, habit.id),
        style: {
          borderLeftColor: habit.color,
          "--habit-hover-bg": `color-mix(in srgb, ${habit.color} 16%, transparent)`,
        } as CSSProperties,
      })),
    [habits, logs, selectedDate]
  );

  return {
    items,
    isEmpty: items.length === 0,
    error,
    isSyncing,
    isDeletingHabit,
    onDelete,
    onToggle,
  };
};
