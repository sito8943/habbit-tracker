import { Button } from "../Button";
import { Notice } from "../Notice";
import { useAuthPromptModal } from "../../hooks";
import type { AuthPromptModalProps } from "./types";
import styles from "./AuthPromptModal.module.css";

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
    <aside className={`${styles.aside} ${isVisible ? styles.asideVisible : styles.asideHidden}`}>
      <section
        className={`${styles.section} ${isVisible ? styles.sectionVisible : styles.sectionHidden}`}
      >
        <Button
          variant="text"
          onClick={handleClose}
          className={styles.closeBtn}
          aria-label="Close recovery code prompt"
          disabled={isApplyingCode}
        >
          Close
        </Button>

        <h3 id="auth-prompt-title" className={styles.title}>
          Recovery code
        </h3>
        <p className={styles.description}>
          Save this code. Use it on another device to recover and sync your habits.
        </p>

        {isRestoringCode ? (
          <form className={styles.form} onSubmit={applyRecoveryCode}>
            <label className={styles.label}>
              Restore with code
              <input
                autoFocus
                value={recoveryCodeInput}
                disabled={isApplyingCode}
                onChange={handleRecoveryCodeInputChange}
                placeholder="AB12"
                maxLength={syncCodeLength}
                className={styles.codeInput}
              />
            </label>
            <div className={styles.btnRow}>
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
            <p className={styles.codeDisplay}>{code}</p>
            <Button
              variant="text"
              className={styles.restoreLink}
              disabled={isApplyingCode}
              onClick={showRestoreWithCode}
            >
              Already have Code
            </Button>
          </>
        )}

        {errorMessage ? (
          <Notice role="alert" tone="error" className={styles.notice}>
            {errorMessage}
          </Notice>
        ) : null}

        {successMessage ? (
          <Notice role="status" tone="success" className={styles.notice}>
            {successMessage}
          </Notice>
        ) : null}
      </section>
    </aside>
  );
};

export default AuthPromptModal;
