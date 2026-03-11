import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { LogEntry } from "../../utils/habits";
import { queryKeys } from "../../lib/query/queryKeys";
import { useSupabaseManager, useSyncCode } from "../../providers";
import type { ToggleLogInput } from "./types";

export const useLogsQuery = (initialData?: LogEntry[]) => {
  const manager = useSupabaseManager();
  const { code } = useSyncCode();

  return useQuery({
    queryKey: queryKeys.logs(code),
    queryFn: () => manager.logsClient.listLogs(code),
    initialData,
  });
};

export const useLogsByRangeQuery = (from: string, to: string) => {
  const manager = useSupabaseManager();
  const { code } = useSyncCode();

  return useQuery({
    queryKey: queryKeys.logsByRange(code, from, to),
    queryFn: () => manager.logsClient.listLogsByRange(from, to, code),
  });
};

export const useToggleLogMutation = () => {
  const manager = useSupabaseManager();
  const { code } = useSyncCode();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: ToggleLogInput) => manager.logsClient.toggleLog(input, code),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.logs(code) });
    },
  });
};
