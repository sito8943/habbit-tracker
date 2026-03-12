import { Button } from "../Button";
import { Notice } from "../Notice";
import { useAuthPromptModal } from "../../hooks";

type AuthPromptModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AuthPromptModal = ({ isOpen, onClose }: AuthPromptModalProps) => {
  const {
    syncCodeLength,
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
  } = useAuthPromptModal({ isOpen, onClose });

  if (!isRendered) {
    return null;
  }

  return (
    <aside
      className={`fixed right-4 bottom-4 z-40 w-full max-w-sm p-2 transition-opacity duration-200 ${
        isVisible ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <section
        className={`relative rounded-lg border border-border bg-base-light/90 p-4 shadow-lg backdrop-blur-md transition-all duration-200 ${
          isVisible ? "translate-y-0 scale-100" : "translate-y-2 scale-95"
        }`}
      >
        <Button
          variant="text"
          onClick={handleClose}
          className="absolute top-2 right-2 text-xs text-text-muted"
          aria-label="Close recovery code prompt"
          disabled={isApplyingCode}
        >
          Close
        </Button>

        <h3 id="auth-prompt-title" className="pr-14 text-lg font-semibold text-text">
          Recovery code
        </h3>
        <p className="mt-2 text-sm text-text-muted">
          Save this code. Use it on another device to recover and sync your habits.
        </p>

        {isRestoringCode ? (
          <form className="mt-3 grid gap-2" onSubmit={applyRecoveryCode}>
            <label className="grid gap-1 text-sm text-text-muted">
              Restore with code
              <input
                autoFocus
                value={recoveryCodeInput}
                disabled={isApplyingCode}
                onChange={handleRecoveryCodeInputChange}
                placeholder="AB12"
                maxLength={syncCodeLength}
                className="rounded-md border border-border bg-base-light p-2 font-mono uppercase text-text"
              />
            </label>
            <div className="flex flex-wrap gap-2">
              <Button type="submit" variant="filled" disabled={isApplyingCode}>
                {isApplyingCode ? "Loading..." : "Use code"}
              </Button>
              <Button variant="text" disabled={isApplyingCode} onClick={showCurrentCode}>
                Show my code
              </Button>
            </div>
          </form>
        ) : (
          <>
            <p className="mt-3 rounded-md border border-border bg-base px-3 py-2 font-mono text-center text-xl tracking-[0.25em] text-text">
              {code}
            </p>
            <Button
              variant="text"
              className="mt-2 px-0 text-xs text-primary"
              disabled={isApplyingCode}
              onClick={showRestoreWithCode}
            >
              Already have Code
            </Button>
          </>
        )}

        {errorMessage ? (
          <Notice role="alert" tone="error" className="mt-3 p-2">
            {errorMessage}
          </Notice>
        ) : null}

        {successMessage ? (
          <Notice role="status" tone="success" className="mt-3 p-2">
            {successMessage}
          </Notice>
        ) : null}
      </section>
    </aside>
  );
};

export default AuthPromptModal;
