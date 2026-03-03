import { faXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { isLogged, getStreak } from "../../utils/habits"
import { IconButton } from "../Button"
import type { HabitListPropsType } from "./types"

const HabitList = ({ habits, logs, date, onToggle, onDelete }: HabitListPropsType) => {
  if (habits.length === 0) {
    return <p className="text-sm text-text-muted">No habits yet. Add one below!</p>
  }

  return (
    <ul className="list-none p-0">
      {habits.map((habit) => {
        const logged = isLogged(logs, habit.id, date)
        const streak = getStreak(logs, habit.id)
        return (
          <li
            key={habit.id}
            className="mb-1 flex items-center gap-2 border-l-4 py-2 pl-2.5"
            style={{ borderLeftColor: habit.color }}
          >
            <input
              type="checkbox"
              id={habit.id}
              checked={logged}
              onChange={() => onToggle(habit.id)}
              className="h-4 w-4 accent-primary"
            />
            <label
              htmlFor={habit.id}
              className={`flex-1 cursor-pointer ${logged ? "text-text-muted line-through" : "text-text"}`}
            >
              {habit.name}
            </label>
            {streak > 0 && (
              <span title="Current streak" className="text-xs font-semibold text-text-muted">
                {streak}d
              </span>
            )}
            <IconButton
              onClick={() => onDelete(habit.id)}
              aria-label="Delete habit"
              color="error"
              variant="text"
            >
              <FontAwesomeIcon icon={faXmark} />
            </IconButton>
          </li>
        )
      })}
    </ul>
  )
}

export default HabitList
