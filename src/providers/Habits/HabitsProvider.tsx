import { useCallback, useMemo, useState, type ReactNode } from "react";
import {
  useCreateHabitMutation,
  useDeleteHabitMutation,
  useHabitsQuery,
  useLogsQuery,
  useToggleLogMutation,
} from "../../entities";
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
  const [selectedDate, setSelectedDate] = useState(() => today());
  const habitsQuery = useHabitsQuery();
  const logsQuery = useLogsQuery();
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
