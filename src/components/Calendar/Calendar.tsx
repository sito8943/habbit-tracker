import { useMemo } from "react";
import { formatDate, getMonthDays, hasAnyLog } from "../../utils/habits";
import { WEEKDAYS } from "../../utils/constant";
import { Button } from "../Button";
import type { CalendarPropsTypes } from "./types";

const Calendar = ({ logs, selectedDate, onSelectDate }: CalendarPropsTypes) => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();

  const days = useMemo(() => getMonthDays(year, month), [year, month]);
  const todayStr = formatDate(now);
  const monthLabel = now.toLocaleString("default", { month: "long", year: "numeric" });
  const firstDayOffset = days[0].getDay();

  return (
    <section className="rounded-lg border border-border bg-base-light p-3 shadow-sm">
      <h3 className="mb-2 text-lg font-semibold capitalize text-text">{monthLabel}</h3>
      <div className="grid grid-cols-7 gap-1 text-center">
        {WEEKDAYS.map((d) => (
          <div key={d} className="py-1 text-xs font-bold text-text-muted">
            {d}
          </div>
        ))}

        {Array.from({ length: firstDayOffset }).map((_, i) => (
          <div key={`pad-${i}`} />
        ))}

        {days.map((day) => {
          const dateStr = formatDate(day);
          const isSelected = dateStr === selectedDate;
          const isToday = dateStr === todayStr;
          const hasLog = hasAnyLog(logs, dateStr);

          const color = isSelected ? "info" : hasLog ? "success" : isToday ? "warning" : "primary";
          const variant = isSelected || hasLog ? "filled" : "outlined";

          return (
            <Button
              key={dateStr}
              type="button"
              onClick={() => onSelectDate(dateStr)}
              variant={variant}
              color={color}
            >
              {day.getDate()}
            </Button>
          );
        })}
      </div>
      <p className="mt-2 text-xs text-text-muted">
        Blue = selected · Green = logged · Orange = today (if not selected/logged)
      </p>
    </section>
  );
};

export default Calendar;
