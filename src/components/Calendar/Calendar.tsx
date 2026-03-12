import { useCalendarMonth } from "../../hooks";
import { WEEKDAYS } from "../../utils/constant";
import { Button } from "../Button";
import type { CalendarPropsTypes } from "./types";

const Calendar = ({ logs, selectedDate, onSelectDate }: CalendarPropsTypes) => {
  const { monthLabel, firstDayOffset, days } = useCalendarMonth({ logs, selectedDate });

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
          return (
            <Button
              key={day.dateStr}
              type="button"
              onClick={() => onSelectDate(day.dateStr)}
              variant={day.variant}
              color={day.color}
            >
              {day.dayOfMonth}
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
