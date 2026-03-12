import { useState, type ReactNode } from "react";
import { SupabaseManager } from "../../lib/supabase/SupabaseManager";
import type { SupabaseManagerLike } from "../../lib/supabase/manager.types";
import { SupabaseContext } from "./useSupabaseManager";

type SupabaseProviderProps = {
  children: ReactNode;
  manager?: SupabaseManagerLike;
};

export const SupabaseProvider = ({ children, manager }: SupabaseProviderProps) => {
  const [resolvedManager] = useState(() => manager ?? new SupabaseManager());

  return <SupabaseContext.Provider value={resolvedManager}>{children}</SupabaseContext.Provider>;
};
