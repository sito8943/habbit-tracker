import { useMemo } from "react"
import type { LogEntry } from "../utils/habits"
import { formatDate, getMonthDays, hasAnyLog } from "../utils/habits"

type Props = {
  logs: LogEntry[]
  selectedDate: string
  onSelectDate: (date: string) => void
}

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]

const Calendar = ({ logs, selectedDate, onSelectDate }: Props) => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()

  const days = useMemo(() => getMonthDays(year, month), [year, month])
  const todayStr = formatDate(now)
  const monthLabel = now.toLocaleString("default", { month: "long", year: "numeric" })
  const firstDayOffset = days[0].getDay()

  return (
    <div>
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
    </div>
  )
}

export default Calendar
