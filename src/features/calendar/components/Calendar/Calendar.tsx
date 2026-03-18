import { useCalendarMonth } from "../../hooks";
import { WEEKDAYS } from "../../../../shared/utils/constants";
import { Button } from "../../../../shared/components/Button";
import type { CalendarPropsTypes } from "./types";
import styles from "./Calendar.module.css";

const Calendar = ({ logs, selectedDate, onSelectDate }: CalendarPropsTypes) => {
  const { monthLabel, firstDayOffset, days } = useCalendarMonth({ logs, selectedDate });

  return (
    <section className={styles.section}>
      <h3 className={styles.title}>{monthLabel}</h3>
      <div className={styles.grid}>
        {WEEKDAYS.map((d) => (
          <div key={d} className={styles.weekday}>
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
      <p className={styles.legend}>
        Blue = selected · Green = logged · Orange = today (if not selected/logged)
      </p>
    </section>
  );
};

export default Calendar;
