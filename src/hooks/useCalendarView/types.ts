import type { HabitsContextType } from "../../providers/Habits";

export type UseCalendarViewResult = {
  logs: HabitsContextType["logs"];
  selectedDate: string;
  onSelectDate: (date: string) => void;
};
