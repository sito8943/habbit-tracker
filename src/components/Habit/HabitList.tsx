import { useCallback, type CSSProperties } from "react";
import { faSpinner, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getStreak, isLogged } from "../../utils/habits";
import { useHabitsContext } from "../../providers";
import { IconButton } from "../Button";

type HabitListProps = {
  onInteraction?: () => void;
};

const HabitList = ({ onInteraction }: HabitListProps) => {
  const { habits, logs, selectedDate, deleteHabit, toggleLog, error, isSyncing, isDeletingHabit } =
    useHabitsContext();

  const onDelete = useCallback(
    (id: number) => {
      onInteraction?.();
      deleteHabit(id);
    },
    [deleteHabit, onInteraction]
  );

  const onToggle = useCallback(
    (habitId: number) => {
      onInteraction?.();
      toggleLog(habitId);
    },
    [onInteraction, toggleLog]
  );

  if (habits.length === 0) {
    return <p className="text-sm text-text-muted">No habits yet. Add one below!</p>;
  }

  return (
    <ul className="list-none p-0">
      {error && (
        <p role="alert" className="mb-3 rounded border border-error px-2 py-1 text-sm text-error">
          {error.message}
        </p>
      )}
      {habits.map((habit) => {
        const logged = isLogged(logs, habit.id, selectedDate);
        const streak = getStreak(logs, habit.id);
        const inputId = `habit-${habit.id}`;
        const habitItemStyle = {
          borderLeftColor: habit.color,
          "--habit-hover-bg": `color-mix(in srgb, ${habit.color} 16%, transparent)`,
        } as CSSProperties;

        return (
          <li
            key={habit.id}
            className="mb-1 flex items-center gap-2 rounded-md border-l-4 py-2 px-2.5 transition-colors hover:bg-(--habit-hover-bg)"
            style={habitItemStyle}
          >
            <input
              disabled={isSyncing}
              type="checkbox"
              id={inputId}
              checked={logged}
              onChange={() => onToggle(habit.id)}
              className="h-4 w-4 accent-primary"
            />
            <label
              htmlFor={inputId}
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
              disabled={isSyncing}
              aria-label="Delete habit"
              color="error"
              variant="text"
            >
              <FontAwesomeIcon icon={isDeletingHabit ? faSpinner : faXmark} />
            </IconButton>
          </li>
        );
      })}
    </ul>
  );
};

export default HabitList;
