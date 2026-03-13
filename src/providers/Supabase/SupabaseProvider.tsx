import { useState } from "react";
import { SupabaseManager } from "../../lib/supabase/SupabaseManager";
import type { SupabaseProviderProps } from "./types";
import { SupabaseContext } from "./useSupabaseManager";

export const SupabaseProvider = ({ children, manager }: SupabaseProviderProps) => {
  const [resolvedManager] = useState(() => manager ?? new SupabaseManager());

  return <SupabaseContext.Provider value={resolvedManager}>{children}</SupabaseContext.Provider>;
};
