import type { ButtonColor, ButtonVariant } from "../../../../shared/components/Button";
import type { LogEntry } from "../../../habits/utils/habits";

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
