import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../lib/query/queryKeys";
import { useSupabaseManager } from "../../providers/";
import type { CreateHabitInput } from "./types";

export const useHabitsQuery = () => {
  const manager = useSupabaseManager();

  return useQuery({
    queryKey: queryKeys.habits,
    queryFn: () => manager.habitsClient.listHabits(),
  });
};

export const useCreateHabitMutation = () => {
  const manager = useSupabaseManager();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateHabitInput) => manager.habitsClient.createHabit(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.habits });
    },
  });
};

export const useDeleteHabitMutation = () => {
  const manager = useSupabaseManager();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (habitId: number) => {
      await manager.habitsClient.softDeleteHabit(habitId);
      await manager.logsClient.softDeleteLogsByHabit(habitId);
    },
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.habits }),
        queryClient.invalidateQueries({ queryKey: queryKeys.logs }),
      ]);
    },
  });
};
