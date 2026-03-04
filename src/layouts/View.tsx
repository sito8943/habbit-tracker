import { useCallback, useMemo, useState } from "react";
import { Outlet } from "react-router";
import { useLocalStorage } from "../hooks";
import Navbar from "../components/Navbar/Navbar";
import { generateId, isLogged, today } from "../utils/habits";
import type { Habit, LogEntry } from "../utils/habits";

export type ViewContextType = {
  habits: Habit[];
  logs: LogEntry[];
  selectedDate: string;
  addHabit: (name: string, color: string) => void;
  deleteHabit: (id: string) => void;
  toggleLog: (habitId: string) => void;
  selectDate: (date: string) => void;
};

const View = () => {
  const [habits, setHabits] = useLocalStorage<Habit[]>("ht_habits", []);
  const [logs, setLogs] = useLocalStorage<LogEntry[]>("ht_logs", []);
  const [selectedDate, setSelectedDate] = useState(today());

  const addHabit = useCallback(
    (name: string, color: string) => {
      setHabits((prev) => [...prev, { id: generateId(), name, color }]);
    },
    [setHabits]
  );

  const deleteHabit = useCallback(
    (id: string) => {
      setHabits((prev) => prev.filter((habit) => habit.id !== id));
      setLogs((prev) => prev.filter((log) => log.habitId !== id));
    },
    [setHabits, setLogs]
  );

  const toggleLog = useCallback(
    (habitId: string) => {
      setLogs((prev) => {
        if (isLogged(prev, habitId, selectedDate)) {
          return prev.filter((log) => !(log.habitId === habitId && log.date === selectedDate));
        }
        return [...prev, { habitId, date: selectedDate }];
      });
    },
    [selectedDate, setLogs]
  );

  const selectDate = useCallback((date: string) => {
    setSelectedDate(date);
  }, []);

  const contextValue = useMemo<ViewContextType>(
    () => ({
      habits,
      logs,
      selectedDate,
      addHabit,
      deleteHabit,
      toggleLog,
      selectDate,
    }),
    [habits, logs, selectedDate, addHabit, deleteHabit, toggleLog, selectDate]
  );

  return (
    <main className="mx-auto mt-10 max-w-120 rounded-lg border border-border bg-base-light p-4">
      <h1 className="mb-4 text-4xl">Focus Habit</h1>
      <Navbar />
      <Outlet context={contextValue} />
    </main>
  );
};

export default View;
