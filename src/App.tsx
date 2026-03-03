import { useState, useCallback } from "react"
import type { Habit, LogEntry } from "./utils/habits"
import { generateId, today, isLogged } from "./utils/habits"
import { useLocalStorage } from "./hooks"
import { Button, Calendar, HabitForm, HabitList } from "./components"

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
    <main className="mx-auto mt-10 max-w-120 rounded-lg border border-border bg-base-light p-4">
      <h1 className="mb-4 text-4xl">Focus Habit</h1>

      <nav className="mb-4 flex gap-2">
        <Button
          onClick={() => setView("today")}
          disabled={view === "today"}
          variant="filled"
          color="primary"
        >
          Today
        </Button>
        <Button
          onClick={() => setView("calendar")}
          disabled={view === "calendar"}
          variant="outlined"
          color="primary"
        >
          Calendar
        </Button>
      </nav>

      {view === "today" ? (
        <>
          <h2 className="mb-3 text-lg font-semibold text-text-muted">
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
    </main>
  )
}

export default App
