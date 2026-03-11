import { NavLink } from "react-router";
import { Button } from "../../components/Button";

const SignIn = () => {
  return (
    <section className="">
      <h2 className="mb-2 text-2xl font-semibold text-text">Sign In</h2>
      <p className="mb-4 text-sm text-text-muted">Sign in to sync your saved habits.</p>

      <form className="grid gap-3" onSubmit={(event) => event.preventDefault()}>
        <label className="grid gap-1 text-sm text-text-muted">
          Email
          <input
            type="email"
            autoComplete="email"
            placeholder="you@email.com"
            className="rounded-md border border-border bg-base-light p-2 text-text"
          />
        </label>

        <label className="grid gap-1 text-sm text-text-muted">
          Password
          <input
            type="password"
            autoComplete="current-password"
            placeholder="********"
            className="rounded-md border border-border bg-base-light p-2 text-text"
          />
        </label>

        <Button type="submit" variant="filled" className="justify-self-start">
          Sign in
        </Button>
      </form>

      <p className="mt-4 text-sm text-text-muted">
        Not registered yet?{" "}
        <NavLink to="/auth/signup" className="font-medium text-primary hover:underline">
          Create account
        </NavLink>
      </p>
      <p className="mt-1 text-sm text-text-muted">
        Forgot password?{" "}
        <NavLink to="/auth/password-recovery" className="font-medium text-primary hover:underline">
          Reset it
        </NavLink>
      </p>
    </section>
  );
};

export default SignIn;
