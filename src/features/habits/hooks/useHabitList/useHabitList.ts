import { useCallback, useMemo } from "react";
import { useHabitsContext } from "../../providers/Habits";
import type { UseHabitListOptions, UseHabitListResult } from "./types";
import { mapHabitToListItem } from "./utils";

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
    () => habits.map((habit) => mapHabitToListItem(habit, logs, selectedDate)),
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
