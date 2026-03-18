import useLocalStorage from "../shared/hooks/useLocalStorage";
import { useAuthPromptModal } from "../features/auth/hooks/useAuthPromptModal";
import { useCalendarMonth } from "../features/calendar/hooks/useCalendarMonth";
import { useCalendarView } from "../features/calendar/hooks/useCalendarView";
import { useHabitForm } from "../features/habits/hooks/useHabitForm";
import { useHabitList } from "../features/habits/hooks/useHabitList";
import { useHomeView } from "../features/habits/hooks/useHomeView";

export { useLocalStorage };
export {
  useAuthPromptModal,
  useCalendarMonth,
  useCalendarView,
  useHabitForm,
  useHabitList,
  useHomeView,
};
