import { useState } from "react";
import { COLORS } from "../../utils/constant";
import { useHabitsContext } from "../../providers";
import { Button } from "../Button";

type HabitFormProps = {
  onInteraction?: () => void;
};

const HabitForm = ({ onInteraction }: HabitFormProps) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState(COLORS[0]);
  const { addHabit, error, isCreatingHabit } = useHabitsContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addHabit(name.trim(), color);
    onInteraction?.();
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      {error && (
        <p
          role="alert"
          className="mb-3 rounded border border-error px-2 py-1 text-sm text-error bg-bg-error"
        >
          {error.message}
        </p>
      )}
      <div className="mb-2 flex gap-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
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
        {COLORS.map((c) => (
          <Button
            key={c}
            type="button"
            onClick={() => setColor(c)}
            aria-label={`Select color ${c}`}
            className={`h-6 w-6 rounded-sm border-2 p-0 ${color === c ? "border-text" : "border-transparent"}`}
            style={{ background: c }}
          />
        ))}
      </div>
    </form>
  );
};

export default HabitForm;
