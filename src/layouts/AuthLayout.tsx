import { Outlet } from "react-router";
import { LinkButton } from "../components/Button";

const AuthLayout = () => {
  return (
    <main className="mx-auto mt-10 max-w-120 rounded-lg border border-border bg-base-light/80 p-6 backdrop-blur-md">
      <h1 className="mb-1 text-4xl">Focus Habit</h1>
      <p className="mb-4 text-sm text-text-muted">Account access</p>

      <nav className="mb-4 flex flex-wrap gap-2" aria-label="Auth navigation">
        <LinkButton to="/auth/signin">Sign In</LinkButton>
        <LinkButton to="/auth/signup">Sign Up</LinkButton>
        <LinkButton to="/auth/password-recovery">Password Recovery</LinkButton>
      </nav>

      <Outlet />
    </main>
  );
};

export default AuthLayout;
