import { useCallback, useState, type ChangeEvent, type FormEvent } from "react";
import { useHabitsContext } from "../../providers/Habits";
import { COLORS } from "../../utils/constants";
import { DEFAULT_HABIT_COLOR } from "./constants";
import type { UseHabitFormOptions, UseHabitFormResult } from "./types";

export const useHabitForm = ({ onInteraction }: UseHabitFormOptions = {}): UseHabitFormResult => {
  const [name, setName] = useState("");
  const [color, setColor] = useState(DEFAULT_HABIT_COLOR);
  const { addHabit, error, isCreatingHabit } = useHabitsContext();

  const handleNameChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }, []);

  const handleColorSelect = useCallback((nextColor: string) => {
    setColor(nextColor);
  }, []);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const trimmedName = name.trim();

      if (!trimmedName) {
        return;
      }

      addHabit(trimmedName, color);
      onInteraction?.();
      setName("");
    },
    [addHabit, color, name, onInteraction]
  );

  return {
    name,
    color,
    colors: COLORS,
    error,
    isCreatingHabit,
    handleNameChange,
    handleColorSelect,
    handleSubmit,
  };
};
