import { createContext, useContext } from "react";
import type { SyncCodeContextType } from "./types";

export const SyncCodeContext = createContext<SyncCodeContextType | null>(null);

export const useSyncCode = (): SyncCodeContextType => {
  const context = useContext(SyncCodeContext);

  if (!context) {
    throw new Error("useSyncCode must be used within a SyncCodeProvider");
  }

  return context;
};
