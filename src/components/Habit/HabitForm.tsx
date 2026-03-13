import { useHabitForm } from "../../hooks";
import { Button } from "../Button";
import { Notice } from "../Notice";
import type { HabitFormProps } from "./types";

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
    <form onSubmit={handleSubmit} className="mt-4">
      {error ? (
        <Notice role="alert" tone="error" className="mb-3">
          {error.message}
        </Notice>
      ) : null}
      <div className="mb-2 flex gap-2">
        <input
          value={name}
          onChange={handleNameChange}
          disabled={isCreatingHabit}
          placeholder="New habit..."
          className="flex-1 rounded-md border border-border bg-base-light px-3 py-2 text-sm text-text placeholder:text-text-muted focus:border-primary focus:outline-none"
        />
        <Button
          type="submit"
          variant="filled"
          color="primary"
          className="px-3 py-2"
          disabled={isCreatingHabit}
        >
          {isCreatingHabit ? "Adding..." : "Add"}
        </Button>
      </div>
      <div className="flex gap-1.5">
        {colors.map((nextColor) => (
          <Button
            key={nextColor}
            type="button"
            onClick={() => handleColorSelect(nextColor)}
            aria-label={`Select color ${nextColor}`}
            className={`h-6 w-6 rounded-sm border-2 p-0 ${
              color === nextColor ? "border-text" : "border-transparent"
            }`}
            style={{ background: nextColor }}
          />
        ))}
      </div>
    </form>
  );
};

export default HabitForm;
