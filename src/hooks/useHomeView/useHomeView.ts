import { useCallback, useEffect, useMemo, useState } from "react";
import { useHabitsContext } from "../../providers/Habits";
import { isLogged } from "../../utils/habits";
import useLocalStorage from "../useLocalStorage";
import type { UseHomeViewResult } from "./types";

const SYNC_CODE_FAB_BUZZ_STORAGE_KEY = "sync-code-fab-buzzed";
const FAB_BUZZ_DURATION_MS = 1200;

export const useHomeView = (): UseHomeViewResult => {
  const { habits, logs, selectedDate } = useHabitsContext();
  const [isCodePromptOpen, setIsCodePromptOpen] = useState(false);
  const [hasOpenedCodePrompt, setHasOpenedCodePrompt] = useState(false);
  const [hasPlayedFabBuzz, setHasPlayedFabBuzz] = useLocalStorage<boolean>(
    SYNC_CODE_FAB_BUZZ_STORAGE_KEY,
    false
  );
  const [isFabBuzzing, setIsFabBuzzing] = useState(false);

  useEffect(() => {
    if (!isFabBuzzing) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setIsFabBuzzing(false);
    }, FAB_BUZZ_DURATION_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isFabBuzzing]);

  const doneCount = useMemo(
    () => habits.filter((habit) => isLogged(logs, habit.id, selectedDate)).length,
    [habits, logs, selectedDate]
  );

  const handleFirstInteraction = useCallback(() => {
    if (hasPlayedFabBuzz || isFabBuzzing) {
      return;
    }

    setHasPlayedFabBuzz(true);
    setIsFabBuzzing(true);
  }, [hasPlayedFabBuzz, isFabBuzzing, setHasPlayedFabBuzz]);

  const openCodePrompt = useCallback(() => {
    setHasOpenedCodePrompt(true);
    setIsCodePromptOpen(true);
  }, []);

  const closeCodePrompt = useCallback(() => {
    setIsCodePromptOpen(false);
  }, []);

  return {
    selectedDate,
    doneCount,
    totalHabits: habits.length,
    isCodePromptOpen,
    shouldRenderCodePrompt: hasOpenedCodePrompt || isCodePromptOpen,
    isFabBuzzing,
    handleFirstInteraction,
    openCodePrompt,
    closeCodePrompt,
  };
};
