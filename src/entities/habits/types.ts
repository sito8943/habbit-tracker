import type { Habit } from "../../utils/habits";

export type CreateHabitInput = {
  name: string;
  color: string;
};

export interface HabitsClientContract {
  listHabits: (code: string) => Promise<Habit[]>;
  createHabit: (input: CreateHabitInput, code: string) => Promise<Habit>;
  softDeleteHabit: (id: number, code: string) => Promise<void>;
}
