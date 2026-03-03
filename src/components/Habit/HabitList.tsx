import { isLogged, getStreak } from "../../utils/habits"
import type { HabitListPropsType } from "./types"

const HabitList = ({ habits, logs, date, onToggle, onDelete }: HabitListPropsType) => {
  if (habits.length === 0) {
    return <p className="text-sm text-slate-600">No habits yet. Add one below!</p>
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
              className="h-4 w-4 accent-emerald-600"
            />
            <label
              htmlFor={habit.id}
              className={`flex-1 cursor-pointer ${logged ? "text-slate-500 line-through" : "text-slate-800"}`}
            >
              {habit.name}
            </label>
            {streak > 0 && (
              <span title="Current streak" className="text-xs font-semibold text-slate-500">
                {streak}d
              </span>
            )}
            <button
              onClick={() => onDelete(habit.id)}
              aria-label="Delete habit"
              className="rounded px-2 py-0.5 text-sm text-slate-500 transition hover:bg-rose-100 hover:text-rose-700"
            >
              x
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export default HabitList
