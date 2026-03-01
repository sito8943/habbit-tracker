export type Habit = {
  id: string
  name: string
  color: string
}

export type LogEntry = {
  habitId: string
  date: string // YYYY-MM-DD
}

export function generateId(): string {
  return Math.random().toString(36).slice(2, 9)
}

export function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10)
}

export function today(): string {
  return formatDate(new Date())
}

export function isLogged(logs: LogEntry[], habitId: string, date: string): boolean {
  return logs.some((l) => l.habitId === habitId && l.date === date)
}

export function hasAnyLog(logs: LogEntry[], date: string): boolean {
  return logs.some((l) => l.date === date)
}

export function getStreak(logs: LogEntry[], habitId: string): number {
  let streak = 0
  const date = new Date()
  while (true) {
    const dateStr = formatDate(date)
    if (!isLogged(logs, habitId, dateStr)) break
    streak++
    date.setDate(date.getDate() - 1)
  }
  return streak
}

export function getMonthDays(year: number, month: number): Date[] {
  const days: Date[] = []
  const date = new Date(year, month, 1)
  while (date.getMonth() === month) {
    days.push(new Date(date))
    date.setDate(date.getDate() + 1)
  }
  return days
}
