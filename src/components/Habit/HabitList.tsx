import { faSpinner, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHabitList } from "../../hooks";
import { IconButton } from "../Button";
import { Notice } from "../Notice";

type HabitListProps = {
  onInteraction?: () => void;
};

const HabitList = ({ onInteraction }: HabitListProps) => {
  const { items, isEmpty, error, isSyncing, isDeletingHabit, onDelete, onToggle } = useHabitList({
    onInteraction,
  });

  if (isEmpty) {
    return <p className="text-sm text-text-muted">No habits yet. Add one below!</p>;
  }

  return (
    <ul className="list-none p-0">
      {error ? (
        <Notice role="alert" tone="error" className="mb-3">
          {error.message}
        </Notice>
      ) : null}
      {items.map((habit) => {
        return (
          <li
            key={habit.id}
            className="mb-1 flex items-center gap-2 rounded-md border-l-4 py-2 px-2.5 transition-colors hover:bg-(--habit-hover-bg)"
            style={habit.style}
          >
            <input
              disabled={isSyncing}
              type="checkbox"
              id={habit.inputId}
              checked={habit.logged}
              onChange={() => onToggle(habit.id)}
              className="h-4 w-4 accent-primary"
            />
            <label
              htmlFor={habit.inputId}
              className={`flex-1 cursor-pointer ${
                habit.logged ? "text-text-muted line-through" : "text-text"
              }`}
            >
              {habit.name}
            </label>
            {habit.streak > 0 && (
              <span title="Current streak" className="text-xs font-semibold text-text-muted">
                {habit.streak}d
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
