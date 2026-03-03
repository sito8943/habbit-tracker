import type { Habit, LogEntry } from "../../utils/habits"

export type HabitFormPropsType = {
  onAdd: (name: string, color: string) => void
}

export type HabitListPropsType = {
  habits: Habit[]
  logs: LogEntry[]
  date: string
  onToggle: (habitId: string) => void
  onDelete: (habitId: string) => void
}
