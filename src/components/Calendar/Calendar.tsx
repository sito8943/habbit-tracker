import { useMemo } from "react"
import { formatDate, getMonthDays, hasAnyLog } from "../../utils/habits"
import { WEEKDAYS } from "../../utils/constant"
import type { CalendarPropsTypes } from "./types"

const Calendar = ({ logs, selectedDate, onSelectDate }: CalendarPropsTypes) => {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth()

  const days = useMemo(() => getMonthDays(year, month), [year, month])
  const todayStr = formatDate(now)
  const monthLabel = now.toLocaleString("default", { month: "long", year: "numeric" })
  const firstDayOffset = days[0].getDay()

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
      <h3 className="mb-2 text-lg font-semibold capitalize text-slate-800">{monthLabel}</h3>
      <div className="grid grid-cols-7 gap-1 text-center">
        {WEEKDAYS.map((d) => (
          <div key={d} className="py-1 text-xs font-bold text-slate-500">
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
                "rounded border px-0.5 py-1.5 text-sm font-medium transition",
                hasLog
                  ? "border-emerald-600 bg-emerald-500 text-white hover:bg-emerald-600"
                  : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100",
                isSelected ? "border-blue-600 bg-blue-500 text-white hover:bg-blue-600" : "",
                isToday ? "border-2 border-orange-500" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {day.getDate()}
            </button>
          )
        })}
      </div>
      <p className="mt-2 text-xs text-slate-600">
        Green = logged · Blue = selected · Orange border = today
      </p>
    </section>
  )
}

export default Calendar
