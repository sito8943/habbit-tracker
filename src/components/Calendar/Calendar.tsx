import { useMemo } from "react"
import { formatDate, getMonthDays, hasAnyLog } from "../../utils/habits"
import { WEEKDAYS } from "../../utils/constant"
import type { CalendarPropsTypes } from "./types"
import "./styles.css"
const Calendar = ({ logs, selectedDate, onSelectDate }: CalendarPropsTypes) => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()

  const days = useMemo(() => getMonthDays(year, month), [year, month])
  const todayStr = formatDate(now)
  const monthLabel = now.toLocaleString("default", { month: "long", year: "numeric" })
  const firstDayOffset = days[0].getDay()

  return (
    <section>
      <h3 className="calendar-month-title">{monthLabel}</h3>
      <div className="calendar-grid">
        {WEEKDAYS.map((d) => (
          <div key={d} className="calendar-weekday">
            {d}
          </div>
        ))}

        {Array.from({ length: firstDayOffset }).map((_, i) => (
          <div key={`pad-${i}`} />
        ))}

        {days.map((day) => {
          const dateStr = formatDate(day)
          const isSelected = dateStr === selectedDate
          const isToday = dateStr === todayStr
          const hasLog = hasAnyLog(logs, dateStr)

          return (
            <button
              key={dateStr}
              onClick={() => onSelectDate(dateStr)}
              className={[
                "calendar-day",
                hasLog ? "calendar-day-logged" : "",
                isSelected ? "calendar-day-selected" : "",
                isToday ? "calendar-day-today" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {day.getDate()}
            </button>
          )
        })}
      </div>
      <p className="calendar-legend">Green = logged · Blue = selected · Orange border = today</p>
    </section>
  )
}

export default Calendar
