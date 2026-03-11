import { createContext, useContext } from "react";
import type { SupabaseManagerLike } from "../../lib/supabase/manager.types";

export const SupabaseContext = createContext<SupabaseManagerLike | null>(null);

export const useSupabaseManager = (): SupabaseManagerLike => {
  const context = useContext(SupabaseContext);

  if (!context) {
    throw new Error("useSupabaseManager must be used within a SupabaseProvider");
  }

  return context;
};
