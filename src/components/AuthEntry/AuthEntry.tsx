import { useNavigate } from "react-router";
import { Button } from "../Button";

const AuthEntry = () => {
  const navigate = useNavigate();

  return (
    <section className="mb-4 rounded-lg border border-border bg-base-light/70 p-4 backdrop-blur-md">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-text">Save your progress</h3>
          <p className="text-sm text-text-muted">
            Sign up so you can save and reopen your habits when you come back.
          </p>
        </div>
        <Button variant="filled" onClick={() => navigate("/auth")}>
          Sign up / Sign in
        </Button>
      </div>
    </section>
  );
};

export default AuthEntry;
