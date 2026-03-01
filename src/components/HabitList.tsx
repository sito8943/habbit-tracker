import type { Habit, LogEntry } from "../utils/habits"
import { isLogged, getStreak } from "../utils/habits"

type Props = {
  habits: Habit[]
  logs: LogEntry[]
  date: string
  onToggle: (habitId: string) => void
  onDelete: (habitId: string) => void
}

const HabitList = ({ habits, logs, date, onToggle, onDelete }: Props) => {
  if (habits.length === 0) {
    return <p>No habits yet. Add one below!</p>
  }

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {habits.map((habit) => {
        const logged = isLogged(logs, habit.id, date)
        const streak = getStreak(logs, habit.id)
        return (
          <li
            key={habit.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 0",
              borderLeft: `4px solid ${habit.color}`,
              paddingLeft: 10,
              marginBottom: 4,
            }}
          >
            <input
              type="checkbox"
              id={habit.id}
              checked={logged}
              onChange={() => onToggle(habit.id)}
            />
            <label
              htmlFor={habit.id}
              style={{
                flex: 1,
                cursor: "pointer",
                textDecoration: logged ? "line-through" : "none",
                opacity: logged ? 0.6 : 1,
              }}
            >
              {habit.name}
            </label>
            {streak > 0 && <span title="Current streak">{streak}d</span>}
            <button onClick={() => onDelete(habit.id)} aria-label="Delete habit">
              x
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export default HabitList
