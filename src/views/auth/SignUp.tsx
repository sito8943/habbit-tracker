import { Button, LinkButton } from "../../components/Button";

const SignUp = () => {
  return (
    <section className="rounded-lg border border-border bg-base-light/70 p-4 backdrop-blur-md">
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

      <div className="mt-4 flex flex-wrap gap-2">
        <LinkButton to="/auth/signin">I already have an account</LinkButton>
      </div>
    </section>
  );
};

export default SignUp;
