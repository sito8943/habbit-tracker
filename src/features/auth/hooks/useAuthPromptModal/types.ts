import type { ChangeEvent, FormEvent } from "react";

export type UseAuthPromptModalOptions = {
  isOpen: boolean;
  onClose: () => void;
};

export type UseAuthPromptModalResult = {
  syncCodeLength: number;
  code: string;
  isRendered: boolean;
  isVisible: boolean;
  isRestoringCode: boolean;
  isApplyingCode: boolean;
  recoveryCodeInput: string;
  errorMessage: string | null;
  successMessage: string | null;
  applyRecoveryCode: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  handleClose: () => void;
  handleRecoveryCodeInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  showRestoreWithCode: () => void;
  showCurrentCode: () => void;
};
