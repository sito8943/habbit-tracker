import type { LogEntry } from "../../utils/habits";

export type CalendarPropsTypes = {
  logs: LogEntry[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
};
