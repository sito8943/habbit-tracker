import type { SupabaseManagerLike } from "../lib/supabase/manager.types";
import type { Habit, LogEntry } from "../utils/habits";

type SeedData = {
  habits?: Habit[];
  logs?: LogEntry[];
};

const cloneHabit = (habit: Habit): Habit => ({ ...habit });
const cloneLog = (log: LogEntry): LogEntry => ({ ...log });

export const createMockSupabaseManager = (seed: SeedData = {}): SupabaseManagerLike => {
  let habits = (seed.habits ?? []).map(cloneHabit);
  let logs = (seed.logs ?? []).map(cloneLog);
  let habitIdSequence = habits.reduce((maxId, habit) => Math.max(maxId, habit.id), 0) + 1;
  let logIdSequence = logs.reduce((maxId, log) => Math.max(maxId, log.id ?? 0), 0) + 1;

  const now = () => new Date().toISOString();

  return {
    habitsClient: {
      async listHabits(_code) {
        void _code;
        return habits.filter((habit) => !habit.deletedAt).map(cloneHabit);
      },
      async createHabit(input, _code) {
        void _code;
        const habit: Habit = {
          id: habitIdSequence++,
          name: input.name,
          color: input.color,
          createdAt: now(),
          updatedAt: now(),
          deletedAt: null,
        };

        habits = [...habits, habit];
        return cloneHabit(habit);
      },
      async softDeleteHabit(id, _code) {
        void _code;
        const deletedAt = now();
        habits = habits.map((habit) =>
          habit.id === id && !habit.deletedAt
            ? {
                ...habit,
                deletedAt,
                updatedAt: deletedAt,
              }
            : habit
        );
      },
    },
    logsClient: {
      async listLogs(_code) {
        void _code;
        return logs.filter((log) => !log.deletedAt).map(cloneLog);
      },
      async listLogsByRange(from, to, _code) {
        void _code;
        return logs
          .filter((log) => !log.deletedAt && log.date >= from && log.date <= to)
          .map(cloneLog);
      },
      async toggleLog(input, _code) {
        void _code;
        const existingLog = logs.find(
          (log) => !log.deletedAt && log.habitId === input.habitId && log.date === input.date
        );

        if (existingLog) {
          const deletedAt = now();
          logs = logs.map((log) =>
            log.id === existingLog.id
              ? {
                  ...log,
                  deletedAt,
                  updatedAt: deletedAt,
                }
              : log
          );
          return null;
        }

        const inserted: LogEntry = {
          id: logIdSequence++,
          habitId: input.habitId,
          date: input.date,
          createdAt: now(),
          updatedAt: now(),
          deletedAt: null,
        };

        logs = [...logs, inserted];
        return cloneLog(inserted);
      },
      async softDeleteLogsByHabit(habitId, _code) {
        void _code;
        const deletedAt = now();
        logs = logs.map((log) =>
          log.habitId === habitId && !log.deletedAt
            ? {
                ...log,
                deletedAt,
                updatedAt: deletedAt,
              }
            : log
        );
      },
    },
  };
};
