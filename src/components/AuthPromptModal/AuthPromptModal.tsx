import { Button, LinkButton } from "../Button";

type AuthPromptModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AuthPromptModal = ({ isOpen, onClose }: AuthPromptModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <aside className="pointer-events-none fixed right-4 bottom-4 z-40 w-full max-w-sm p-2">
      <section className="pointer-events-auto relative rounded-lg border border-border bg-base-light/90 p-4 shadow-lg backdrop-blur-md">
        <Button
          variant="text"
          onClick={onClose}
          className="absolute top-2 right-2 text-xs text-text-muted"
          aria-label="Close auth prompt"
        >
          Close
        </Button>

        <h3 id="auth-prompt-title" className="pr-14 text-lg font-semibold text-text">
          Save your progress
        </h3>
        <p className="mt-2 text-sm text-text-muted">
          Sign up so you can save and reopen your habits when you come back.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <LinkButton to="/auth">Sign In / Sign Up</LinkButton>
          <Button variant="text" onClick={onClose}>
            Maybe later
          </Button>
        </div>
      </section>
    </aside>
  );
};

export default AuthPromptModal;
