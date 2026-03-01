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
      <h3 style={{ marginBottom: 8 }}>{monthLabel}</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: 4,
          textAlign: "center",
        }}
      >
        {WEEKDAYS.map((d) => (
          <div key={d} style={{ fontWeight: "bold", fontSize: 12, padding: 4 }}>
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
              style={{
                padding: "6px 2px",
                background: isSelected ? "#3498db" : hasLog ? "#2ecc71" : "transparent",
                color: isSelected ? "#fff" : "inherit",
                border: isToday ? "2px solid #f39c12" : "1px solid #ccc",
                cursor: "pointer",
                borderRadius: 4,
                fontWeight: isToday ? "bold" : "normal",
              }}
            >
              {day.getDate()}
            </button>
          )
        })}
      </div>
      <p style={{ fontSize: 12, marginTop: 8 }}>
        Green = logged · Blue = selected · Orange border = today
      </p>
    </div>
  )
}

export default Calendar
