import { HabitForm, HabitList } from "../components";
import { useHabitsContext } from "../providers";
import { isLogged } from "../utils/habits";

const Home = () => {
  const { habits, logs, selectedDate } = useHabitsContext();
  const doneCount = habits.filter((habit) => isLogged(logs, habit.id, selectedDate)).length;

  return (
    <>
      <h2 className="mb-3 text-lg font-semibold text-text-muted">
        {selectedDate} — {doneCount}/{habits.length} done
      </h2>
      <HabitList />
      <HabitForm />
    </>
  );
};

export default Home;
