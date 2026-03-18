import { useCallback } from "react";
import { useNavigate } from "react-router";
import { useHabitsContext } from "../../../habits/providers/Habits";
import type { UseCalendarViewResult } from "./types";

export const useCalendarView = (): UseCalendarViewResult => {
  const { logs, selectedDate, selectDate } = useHabitsContext();
  const navigate = useNavigate();

  const onSelectDate = useCallback(
    (date: string) => {
      selectDate(date);
      navigate("/");
    },
    [navigate, selectDate]
  );

  return {
    logs,
    selectedDate,
    onSelectDate,
  };
};
