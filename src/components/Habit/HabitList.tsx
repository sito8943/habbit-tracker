import { faSpinner, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHabitList } from "../../hooks";
import { IconButton } from "../Button";
import { Notice } from "../Notice";
import type { HabitListProps } from "./types";
import styles from "./HabitList.module.css";

const HabitList = ({ onInteraction }: HabitListProps) => {
  const { items, isEmpty, error, isSyncing, isDeletingHabit, onDelete, onToggle } = useHabitList({
    onInteraction,
  });

  if (isEmpty) {
    return <p className={styles.empty}>No habits yet. Add one below!</p>;
  }

  return (
    <ul className={styles.list}>
      {error ? (
        <Notice role="alert" tone="error" className={styles.notice}>
          {error.message}
        </Notice>
      ) : null}
      {items.map((habit) => {
        return (
          <li key={habit.id} className={styles.item} style={habit.style}>
            <input
              disabled={isSyncing}
              type="checkbox"
              id={habit.inputId}
              checked={habit.logged}
              onChange={() => onToggle(habit.id)}
              className={styles.checkbox}
            />
            <label
              htmlFor={habit.inputId}
              className={`${styles.label} ${habit.logged ? styles.labelLogged : ""}`}
            >
              {habit.name}
            </label>
            {habit.streak > 0 && (
              <span title="Current streak" className={styles.streak}>
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
