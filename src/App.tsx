import { useState, useCallback } from "react"
import type { Habit, LogEntry } from "./utils/habits"
import { generateId, today, isLogged } from "./utils/habits"
import useLocalStorage from "./hooks/useLocalStorage"
import HabitList from "./components/HabitList"
import HabitForm from "./components/HabitForm"
import Calendar from "./components/Calendar"

const App = () => {
  const [habits, setHabits] = useLocalStorage<Habit[]>("ht_habits", [])
  const [logs, setLogs] = useLocalStorage<LogEntry[]>("ht_logs", [])

  const [selectedDate, setSelectedDate] = useState(today())
  const [view, setView] = useState<"today" | "calendar">("today")

  const addHabit = useCallback(
    (name: string, color: string) => {
      setHabits((prev) => [...prev, { id: generateId(), name, color }])
    },
    [setHabits]
  )

  const deleteHabit = useCallback(
    (id: string) => {
      setHabits((prev) => prev.filter((h) => h.id !== id))
      setLogs((prev) => prev.filter((l) => l.habitId !== id))
    },
    [setHabits, setLogs]
  )

  const toggleLog = useCallback(
    (habitId: string) => {
      setLogs((prev) => {
        if (isLogged(prev, habitId, selectedDate)) {
          return prev.filter((l) => !(l.habitId === habitId && l.date === selectedDate))
        }
        return [...prev, { habitId, date: selectedDate }]
      })
    },
    [selectedDate, setLogs]
  )

  const doneCount = habits.filter((h) => isLogged(logs, h.id, selectedDate)).length

  return (
    <div style={{ maxWidth: 480, margin: "0 auto", padding: 16 }}>
      <h1>Habit Tracker</h1>

      <nav style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        <button onClick={() => setView("today")} disabled={view === "today"}>
          Today
        </button>
        <button onClick={() => setView("calendar")} disabled={view === "calendar"}>
          Calendar
        </button>
      </nav>

      {view === "today" ? (
        <>
          <h2>
            {selectedDate} — {doneCount}/{habits.length} done
          </h2>
          <HabitList
            habits={habits}
            logs={logs}
            date={selectedDate}
            onToggle={toggleLog}
            onDelete={deleteHabit}
          />
          <HabitForm onAdd={addHabit} />
        </>
      ) : (
        <Calendar
          logs={logs}
          selectedDate={selectedDate}
          onSelectDate={(date) => {
            setSelectedDate(date)
            setView("today")
          }}
        />
      )}
    </div>
  )
}

export default App
