import { QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { createQueryClient } from "../lib/query/queryClient";
import { HabitsProvider } from "./Habits";
import { SupabaseProvider } from "./Supabase";
import { SyncCodeProvider } from "./SyncCode";
import type { AppProvidersProps } from "./types";

export const AppProviders = ({ children, manager, queryClient }: AppProvidersProps) => {
  const [resolvedQueryClient] = useState(() => queryClient ?? createQueryClient());

  return (
    <QueryClientProvider client={resolvedQueryClient}>
      <SupabaseProvider manager={manager}>
        <SyncCodeProvider>
          <HabitsProvider>{children}</HabitsProvider>
        </SyncCodeProvider>
      </SupabaseProvider>
    </QueryClientProvider>
  );
};
