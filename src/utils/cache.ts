import type { Habit, LogEntry } from "./habits";

export const getHabitsCacheKey = (code: string): string => `habits-cache:${code}`;

export const getHabitLogsCacheKey = (code: string): string => `habit-logs-cache:${code}`;

export const cacheHabitsAndLogs = (code: string, habits: Habit[], logs: LogEntry[]): void => {
  localStorage.setItem(getHabitsCacheKey(code), JSON.stringify(habits));
  localStorage.setItem(getHabitLogsCacheKey(code), JSON.stringify(logs));
};
