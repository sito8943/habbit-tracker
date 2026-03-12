import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Habit } from "../../utils/habits";
import { queryKeys } from "../../lib/query/queryKeys";
import { useSupabaseManager, useSyncCode } from "../../providers/";
import type { CreateHabitInput } from "./types";

export const useHabitsQuery = (initialData?: Habit[]) => {
  const manager = useSupabaseManager();
  const { code } = useSyncCode();

  return useQuery({
    queryKey: queryKeys.habits(code),
    queryFn: () => manager.habitsClient.listHabits(code),
    initialData,
  });
};

export const useCreateHabitMutation = () => {
  const manager = useSupabaseManager();
  const { code } = useSyncCode();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateHabitInput) => manager.habitsClient.createHabit(input, code),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.habits(code) });
    },
  });
};

export const useDeleteHabitMutation = () => {
  const manager = useSupabaseManager();
  const { code } = useSyncCode();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (habitId: number) => {
      await manager.habitsClient.softDeleteHabit(habitId, code);
      await manager.logsClient.softDeleteLogsByHabit(habitId, code);
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.habits(code) }),
        queryClient.invalidateQueries({ queryKey: queryKeys.logs(code) }),
      ]);
    },
  });
};
