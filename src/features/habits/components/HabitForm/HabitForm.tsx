import { useHabitForm } from "../../hooks";
import { Button } from "../../../../shared/components/Button";
import { Notice } from "../../../../shared/components/Notice";
import type { HabitFormProps } from "../types";
import styles from "./HabitForm.module.css";

const HabitForm = ({ onInteraction }: HabitFormProps) => {
  const {
    name,
    color,
    colors,
    error,
    isCreatingHabit,
    handleNameChange,
    handleColorSelect,
    handleSubmit,
  } = useHabitForm({ onInteraction });

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      {error ? (
        <Notice role="alert" tone="error" className={styles.notice}>
          {error.message}
        </Notice>
      ) : null}
      <div className={styles.inputRow}>
        <input
          value={name}
          onChange={handleNameChange}
          disabled={isCreatingHabit}
          placeholder="New habit..."
          className={styles.input}
        />
        <Button
          type="submit"
          variant="filled"
          color="primary"
          className={styles.addBtn}
          disabled={isCreatingHabit}
        >
          {isCreatingHabit ? "Adding..." : "Add"}
        </Button>
      </div>
      <div className={styles.colorPicker}>
        {colors.map((nextColor) => (
          <Button
            key={nextColor}
            type="button"
            onClick={() => handleColorSelect(nextColor)}
            aria-label={`Select color ${nextColor}`}
            className={`${styles.colorBtn} ${color === nextColor ? styles.colorBtnActive : styles.colorBtnInactive}`}
            style={{ background: nextColor }}
          />
        ))}
      </div>
    </form>
  );
};

export default HabitForm;
