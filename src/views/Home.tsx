import { useCallback, useState } from "react";
import { AuthPromptModal, HabitForm, HabitList } from "../components";
import { useHabitsContext } from "../providers";
import { isLogged } from "../utils/habits";

const Home = () => {
  const { habits, logs, selectedDate } = useHabitsContext();
  const [isAuthPromptOpen, setIsAuthPromptOpen] = useState(false);
  const [hasShownAuthPrompt, setHasShownAuthPrompt] = useState(false);
  const doneCount = habits.filter((habit) => isLogged(logs, habit.id, selectedDate)).length;

  const handleHabitInteraction = useCallback(() => {
    if (hasShownAuthPrompt) {
      return;
    }

    setHasShownAuthPrompt(true);
    setIsAuthPromptOpen(true);
  }, [hasShownAuthPrompt]);

  const closeAuthPrompt = useCallback(() => {
    setIsAuthPromptOpen(false);
  }, []);

  return (
    <>
      <h2 className="mb-3 text-lg font-semibold text-text-muted">
        {selectedDate} — {doneCount}/{habits.length} done
      </h2>
      <HabitList onInteraction={handleHabitInteraction} />
      <HabitForm onInteraction={handleHabitInteraction} />
      <AuthPromptModal isOpen={isAuthPromptOpen} onClose={closeAuthPrompt} />
    </>
  );
};

export default Home;
