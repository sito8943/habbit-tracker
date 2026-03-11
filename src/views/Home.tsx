import { lazy, Suspense } from "react";
import { HabitForm, HabitList, SyncCodeFab } from "../components";
import { useHomeView } from "../hooks";

const AuthPromptModal = lazy(() => import("../components/AuthPromptModal/AuthPromptModal"));

const Home = () => {
  const {
    selectedDate,
    doneCount,
    totalHabits,
    isCodePromptOpen,
    shouldRenderCodePrompt,
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
      {shouldRenderCodePrompt ? (
        <Suspense fallback={null}>
          <AuthPromptModal isOpen={isCodePromptOpen} onClose={closeCodePrompt} />
        </Suspense>
      ) : null}
    </>
  );
};

export default Home;
