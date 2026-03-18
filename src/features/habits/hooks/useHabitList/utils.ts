import type { CSSProperties } from "react";
import { getStreak, isLogged, type Habit, type LogEntry } from "../../utils/habits";
import type { HabitListItemViewModel } from "./types";

const createHabitStyle = (habitColor: string): CSSProperties => {
  return {
    borderLeftColor: habitColor,
    "--habit-hover-bg": `color-mix(in srgb, ${habitColor} 16%, transparent)`,
  } as CSSProperties;
};

export const mapHabitToListItem = (
  habit: Habit,
  logs: LogEntry[],
  selectedDate: string
): HabitListItemViewModel => {
  return {
    id: habit.id,
    name: habit.name,
    inputId: `habit-${habit.id}`,
    logged: isLogged(logs, habit.id, selectedDate),
    streak: getStreak(logs, habit.id),
    style: createHabitStyle(habit.color),
  };
};
