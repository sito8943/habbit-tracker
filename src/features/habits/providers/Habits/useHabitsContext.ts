import { createContext, useContext } from "react";
import type { HabitsContextType } from "./types";

export const HabitsContext = createContext<HabitsContextType | null>(null);

export const useHabitsContext = (): HabitsContextType => {
  const context = useContext(HabitsContext);

  if (!context) {
    throw new Error("useHabitsContext must be used within a HabitsProvider");
  }

  return context;
};
