import type { HabitsContextType } from "../../providers/Habits/useHabitsContext";

export type UseCalendarViewResult = {
  logs: HabitsContextType["logs"];
  selectedDate: string;
  onSelectDate: (date: string) => void;
};
