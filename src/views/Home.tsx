import { AuthPromptModal, HabitForm, HabitList, SyncCodeFab } from "../components";
import { useHomeView } from "../hooks";

const Home = () => {
  const {
    selectedDate,
    doneCount,
    totalHabits,
    isCodePromptOpen,
    isFabBuzzing,
    handleFirstInteraction,
    openCodePrompt,
    closeCodePrompt,
  } = useHomeView();

  return (
    <>
      <h2 className="mb-3 text-lg font-semibold text-text-muted">
        {selectedDate} — {doneCount}/{totalHabits} done
      </h2>
      <HabitList onInteraction={handleFirstInteraction} />
      <HabitForm onInteraction={handleFirstInteraction} />
      <SyncCodeFab animate={isFabBuzzing} onClick={openCodePrompt} />
      <AuthPromptModal isOpen={isCodePromptOpen} onClose={closeCodePrompt} />
    </>
  );
};

export default Home;
