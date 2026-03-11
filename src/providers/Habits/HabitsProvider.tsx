import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  useCreateHabitMutation,
  useDeleteHabitMutation,
  useHabitsQuery,
  useLogsQuery,
  useToggleLogMutation,
} from "../../entities";
import { useLocalStorage } from "../../hooks";
import type { Habit, LogEntry } from "../../utils/habits";
import { getHabitLogsCacheKey, getHabitsCacheKey } from "../../utils/cache";
import { useSyncCode } from "../SyncCode";
import { today } from "../../utils/habits";
import { HabitsContext, type HabitsContextType } from "./useHabitsContext";

type HabitsProviderProps = {
  children: ReactNode;
};

const toError = (candidate: unknown): Error | null => {
  if (!candidate) {
    return null;
  }

  if (candidate instanceof Error) {
    return candidate;
  }

  return new Error("Unexpected habits error");
};

const mergeErrors = (...candidates: unknown[]): Error | null => {
  for (const candidate of candidates) {
    const error = toError(candidate);
    if (error) {
      return error;
    }
  }

  return null;
};

export const HabitsProvider = ({ children }: HabitsProviderProps) => {
  const { code } = useSyncCode();
  const [selectedDate, setSelectedDate] = useState(() => today());
  const [cachedHabits, setCachedHabits] = useLocalStorage<Habit[]>(getHabitsCacheKey(code), []);
  const [cachedLogs, setCachedLogs] = useLocalStorage<LogEntry[]>(getHabitLogsCacheKey(code), []);
  const habitsQuery = useHabitsQuery(cachedHabits);
  const logsQuery = useLogsQuery(cachedLogs);
  const {
    mutate: createHabit,
    error: createHabitError,
    isPending: isCreatingHabit,
  } = useCreateHabitMutation();
  const {
    mutate: removeHabit,
    error: deleteHabitError,
    isPending: isDeletingHabit,
  } = useDeleteHabitMutation();
  const {
    mutate: toggleHabitLog,
    error: toggleLogError,
    isPending: isTogglingLog,
  } = useToggleLogMutation();

  useEffect(() => {
    if (habitsQuery.data) {
      setCachedHabits(habitsQuery.data);
    }
  }, [habitsQuery.data, setCachedHabits]);

  useEffect(() => {
    if (logsQuery.data) {
      setCachedLogs(logsQuery.data);
    }
  }, [logsQuery.data, setCachedLogs]);

  const addHabit = useCallback(
    (name: string, color: string) => {
      createHabit({ name, color });
    },
    [createHabit]
  );

  const deleteHabit = useCallback(
    (id: number) => {
      removeHabit(id);
    },
    [removeHabit]
  );

  const toggleLog = useCallback(
    (habitId: number) => {
      toggleHabitLog({ habitId, date: selectedDate });
    },
    [selectedDate, toggleHabitLog]
  );

  const selectDate = useCallback((date: string) => {
    setSelectedDate(date);
  }, []);

  const error = mergeErrors(
    habitsQuery.error,
    logsQuery.error,
    createHabitError,
    deleteHabitError,
    toggleLogError
  );

  const isLoading = habitsQuery.isLoading || logsQuery.isLoading;
  const isSyncing =
    habitsQuery.isFetching ||
    logsQuery.isFetching ||
    isCreatingHabit ||
    isDeletingHabit ||
    isTogglingLog;

  const contextValue = useMemo<HabitsContextType>(
    () => ({
      habits: habitsQuery.data ?? [],
      logs: logsQuery.data ?? [],
      selectedDate,
      addHabit,
      deleteHabit,
      toggleLog,
      selectDate,
      isLoading,
      isSyncing,
      isCreatingHabit,
      isDeletingHabit,
      isTogglingLog,
      error,
    }),
    [
      habitsQuery.data,
      logsQuery.data,
      selectedDate,
      addHabit,
      deleteHabit,
      toggleLog,
      selectDate,
      isLoading,
      isSyncing,
      isCreatingHabit,
      isDeletingHabit,
      isTogglingLog,
      error,
    ]
  );

  return <HabitsContext.Provider value={contextValue}>{children}</HabitsContext.Provider>;
};
