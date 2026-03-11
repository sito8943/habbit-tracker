import { QueryClientProvider, type QueryClient } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { createQueryClient } from "../lib/query/queryClient";
import type { SupabaseManagerLike } from "../lib/supabase/manager.types";
import { HabitsProvider } from "./Habits";
import { SupabaseProvider } from "./Supabase/SupabaseProvider";

type AppProvidersProps = {
  children: ReactNode;
  manager?: SupabaseManagerLike;
  queryClient?: QueryClient;
};

export const AppProviders = ({ children, manager, queryClient }: AppProvidersProps) => {
  const [resolvedQueryClient] = useState(() => queryClient ?? createQueryClient());

  return (
    <QueryClientProvider client={resolvedQueryClient}>
      <SupabaseProvider manager={manager}>
        <HabitsProvider>{children}</HabitsProvider>
      </SupabaseProvider>
    </QueryClientProvider>
  );
};
