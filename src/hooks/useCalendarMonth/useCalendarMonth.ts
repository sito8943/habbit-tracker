import { useMemo } from "react";
import { formatDate, getMonthDays, hasAnyLog } from "../../utils/habits";
import { MONTH_LABEL_FORMAT_OPTIONS } from "./constants";
import type { UseCalendarMonthOptions, UseCalendarMonthResult } from "./types";
import { resolveCalendarDayAppearance } from "./utils";

export const useCalendarMonth = ({
  logs,
  selectedDate,
}: UseCalendarMonthOptions): UseCalendarMonthResult => {
  const now = useMemo(() => new Date(), []);
  const year = now.getFullYear();
  const month = now.getMonth();

  const monthDays = useMemo(() => getMonthDays(year, month), [year, month]);
  const todayStr = useMemo(() => formatDate(now), [now]);
  const monthLabel = useMemo(
    () => now.toLocaleString("default", MONTH_LABEL_FORMAT_OPTIONS),
    [now]
  );

  const days = useMemo(
    () =>
      monthDays.map((day) => {
        const dateStr = formatDate(day);
        const isSelected = dateStr === selectedDate;
        const isToday = dateStr === todayStr;
        const hasLog = hasAnyLog(logs, dateStr);
        const { color, variant } = resolveCalendarDayAppearance(isSelected, hasLog, isToday);

        return {
          dateStr,
          dayOfMonth: day.getDate(),
          color,
          variant,
        };
      }),
    [monthDays, logs, selectedDate, todayStr]
  );

  return {
    monthLabel,
    firstDayOffset: monthDays[0]?.getDay() ?? 0,
    days,
  };
};
