import type { LogEntry } from "../../../habits/utils/habits";

export type CalendarPropsTypes = {
  logs: LogEntry[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
};
