import { isLogged, getStreak } from "../../utils/habits"
import type { HabitListPropsType } from "./types"

import "./styles.css"

const HabitList = ({ habits, logs, date, onToggle, onDelete }: HabitListPropsType) => {
  if (habits.length === 0) {
    return <p>No habits yet. Add one below!</p>
  }

  return (
    <ul className="habit-list">
      {habits.map((habit) => {
        const logged = isLogged(logs, habit.id, date)
        const streak = getStreak(logs, habit.id)
        return (
          <li key={habit.id} className="habit-list-item" style={{ borderLeftColor: habit.color }}>
            <input
              type="checkbox"
              id={habit.id}
              checked={logged}
              onChange={() => onToggle(habit.id)}
            />
            <label
              htmlFor={habit.id}
              className={`habit-label${logged ? " habit-label-completed" : ""}`}
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
