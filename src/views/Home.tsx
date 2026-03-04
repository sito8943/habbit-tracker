import { useOutletContext } from "react-router";
import { HabitForm, HabitList } from "../components";
import type { ViewContextType } from "../layouts/View";
import { isLogged } from "../utils/habits";

const Home = () => {
  const { habits, logs, selectedDate, addHabit, deleteHabit, toggleLog } =
    useOutletContext<ViewContextType>();
  const doneCount = habits.filter((habit) => isLogged(logs, habit.id, selectedDate)).length;

  return (
    <>
      <h2 className="mb-3 text-lg font-semibold text-text-muted">
        {selectedDate} — {doneCount}/{habits.length} done
      </h2>
      <HabitList
        habits={habits}
        logs={logs}
        date={selectedDate}
        onToggle={toggleLog}
        onDelete={deleteHabit}
      />
      <HabitForm onAdd={addHabit} />
    </>
  );
};

export default Home;
