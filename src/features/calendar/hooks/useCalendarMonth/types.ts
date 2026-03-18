import type { ButtonColor, ButtonVariant } from "../../components/Button";
import type { LogEntry } from "../../utils/habits";

export type UseCalendarMonthOptions = {
  logs: LogEntry[];
  selectedDate: string;
};

export type CalendarDayViewModel = {
  dateStr: string;
  dayOfMonth: number;
  color: ButtonColor;
  variant: ButtonVariant;
};

export type UseCalendarMonthResult = {
  monthLabel: string;
  firstDayOffset: number;
  days: CalendarDayViewModel[];
};
