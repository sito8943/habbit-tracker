import type { QueryClient } from "@tanstack/react-query";
import type { ReactNode } from "react";
import type { SupabaseManagerLike } from "../lib/supabase/manager.types";

export type AppProvidersProps = {
  children: ReactNode;
  manager?: SupabaseManagerLike;
  queryClient?: QueryClient;
};
