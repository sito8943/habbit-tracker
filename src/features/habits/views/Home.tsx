import { lazy, Suspense } from "react";
import { HabitForm, HabitList } from "../components";
import { useHomeView } from "../hooks";
import { SyncCodeFab } from "../../sync/components/SyncCodeFab";
import styles from "./Home.module.css";

const AuthPromptModal = lazy(() =>
  import("../../auth/components/AuthPromptModal").then((module) => ({
    default: module.AuthPromptModal,
  }))
);

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
      <h2 className={styles.subtitle}>
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
