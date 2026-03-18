import type { HabitsContextType } from "../../../habits/providers/Habits";

export type UseCalendarViewResult = {
  logs: HabitsContextType["logs"];
  selectedDate: string;
  onSelectDate: (date: string) => void;
};
