import { useCallback, useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../lib/query/queryKeys";
import { useSupabaseManager } from "../../providers/Supabase";
import {
  isValidSyncCode,
  normalizeSyncCode,
  SYNC_CODE_LENGTH,
  useSyncCode,
} from "../../providers/SyncCode";
import { cacheHabitsAndLogs } from "../../utils/cache";
import { getInvalidCodeMessage, MODAL_TRANSITION_MS } from "./constants";
import type { UseAuthPromptModalOptions, UseAuthPromptModalResult } from "./types";
import { getUnknownErrorMessage } from "./utils";

export const useAuthPromptModal = ({
  isOpen,
  onClose,
}: UseAuthPromptModalOptions): UseAuthPromptModalResult => {
  const manager = useSupabaseManager();
  const queryClient = useQueryClient();
  const { code, setCode } = useSyncCode();
  const [isRendered, setIsRendered] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);
  const [isRestoringCode, setIsRestoringCode] = useState(false);
  const [isApplyingCode, setIsApplyingCode] = useState(false);
  const [recoveryCodeInput, setRecoveryCodeInput] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const invalidCodeMessage = getInvalidCodeMessage(SYNC_CODE_LENGTH);

  useEffect(() => {
    if (isOpen) {
      setIsRendered(true);
      const animationFrameId = window.requestAnimationFrame(() => {
        setIsVisible(true);
      });

      return () => {
        window.cancelAnimationFrame(animationFrameId);
      };
    }

    setIsVisible(false);
    const timeoutId = window.setTimeout(() => {
      setIsRendered(false);
      setIsRestoringCode(false);
      setRecoveryCodeInput("");
      setErrorMessage(null);
      setSuccessMessage(null);
    }, MODAL_TRANSITION_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (!isApplyingCode) {
      onClose();
    }
  }, [isApplyingCode, onClose]);

  const showRestoreWithCode = useCallback(() => {
    setIsRestoringCode(true);
    setErrorMessage(null);
    setSuccessMessage(null);
  }, []);

  const showCurrentCode = useCallback(() => {
    setIsRestoringCode(false);
    setErrorMessage(null);
    setSuccessMessage(null);
  }, []);

  const handleRecoveryCodeInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setRecoveryCodeInput(normalizeSyncCode(event.target.value));
    setErrorMessage(null);
    setSuccessMessage(null);
  }, []);

  const applyRecoveryCode = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setErrorMessage(null);
      setSuccessMessage(null);

      const normalizedCode = normalizeSyncCode(recoveryCodeInput);
      if (!isValidSyncCode(normalizedCode)) {
        setErrorMessage(invalidCodeMessage);
        return;
      }

      setIsApplyingCode(true);
      try {
        const [habits, logs] = await Promise.all([
          queryClient.fetchQuery({
            queryKey: queryKeys.habits(normalizedCode),
            queryFn: () => manager.habitsClient.listHabits(normalizedCode),
            staleTime: 0,
          }),
          queryClient.fetchQuery({
            queryKey: queryKeys.logs(normalizedCode),
            queryFn: () => manager.logsClient.listLogs(normalizedCode),
            staleTime: 0,
          }),
        ]);

        cacheHabitsAndLogs(normalizedCode, habits, logs);

        const wasApplied = setCode(normalizedCode);
        if (!wasApplied) {
          throw new Error(invalidCodeMessage);
        }

        setSuccessMessage("Recovery code applied. Your habits and logs were loaded successfully.");
        setIsRestoringCode(false);
        setRecoveryCodeInput("");
      } catch (error) {
        setErrorMessage(getUnknownErrorMessage(error, "Failed to load data for this code."));
      } finally {
        setIsApplyingCode(false);
      }
    },
    [
      invalidCodeMessage,
      manager.habitsClient,
      manager.logsClient,
      queryClient,
      recoveryCodeInput,
      setCode,
    ]
  );

  return {
    syncCodeLength: SYNC_CODE_LENGTH,
    code,
    isRendered,
    isVisible,
    isRestoringCode,
    isApplyingCode,
    recoveryCodeInput,
    errorMessage,
    successMessage,
    applyRecoveryCode,
    handleClose,
    handleRecoveryCodeInputChange,
    showRestoreWithCode,
    showCurrentCode,
  };
};
