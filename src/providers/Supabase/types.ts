import type { ReactNode } from "react";
import type { SupabaseManagerLike } from "../../lib/supabase/manager.types";

export type SupabaseProviderProps = {
  children: ReactNode;
  manager?: SupabaseManagerLike;
};
