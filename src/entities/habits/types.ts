import type { Habit } from "../../utils/habits";

export type CreateHabitInput = {
  name: string;
  color: string;
};

export interface HabitsClientContract {
  listHabits: () => Promise<Habit[]>;
  createHabit: (input: CreateHabitInput) => Promise<Habit>;
  softDeleteHabit: (id: number) => Promise<void>;
}
