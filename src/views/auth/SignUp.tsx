import { NavLink } from "react-router";
import { Button } from "../../components/Button";

const SignUp = () => {
  return (
    <section className="">
      <h2 className="mb-2 text-2xl font-semibold text-text">Sign Up</h2>
      <p className="mb-4 text-sm text-text-muted">Create an account to save your progress.</p>

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
            autoComplete="new-password"
            placeholder="********"
            className="rounded-md border border-border bg-base-light p-2 text-text"
          />
        </label>

        <Button type="submit" variant="filled" className="justify-self-start">
          Create account
        </Button>
      </form>

      <p className="mt-4 text-sm text-text-muted">
        Already registered?{" "}
        <NavLink to="/auth/signin" className="font-medium text-primary hover:underline">
          Sign in
        </NavLink>
      </p>
    </section>
  );
};

export default SignUp;
