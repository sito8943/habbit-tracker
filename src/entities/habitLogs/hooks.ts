import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../lib/query/queryKeys";
import { useSupabaseManager } from "../../providers";
import type { ToggleLogInput } from "./types";

export const useLogsQuery = () => {
  const manager = useSupabaseManager();

  return useQuery({
    queryKey: queryKeys.logs,
    queryFn: () => manager.logsClient.listLogs(),
  });
};

export const useLogsByRangeQuery = (from: string, to: string) => {
  const manager = useSupabaseManager();

  return useQuery({
    queryKey: queryKeys.logsByRange(from, to),
    queryFn: () => manager.logsClient.listLogsByRange(from, to),
  });
};

export const useToggleLogMutation = () => {
  const manager = useSupabaseManager();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: ToggleLogInput) => manager.logsClient.toggleLog(input),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.logs });
    },
  });
};
