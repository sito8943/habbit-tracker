import type { ChangeEvent, FormEvent } from "react";

export type UseHabitFormOptions = {
  onInteraction?: () => void;
};

export type UseHabitFormResult = {
  name: string;
  color: string;
  colors: string[];
  error: Error | null;
  isCreatingHabit: boolean;
  handleNameChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleColorSelect: (nextColor: string) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
};
