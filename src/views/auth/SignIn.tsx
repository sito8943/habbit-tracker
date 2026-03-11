import { Button, LinkButton } from "../../components/Button";

const SignIn = () => {
  return (
    <section className="rounded-lg border border-border bg-base-light/70 p-4 backdrop-blur-md">
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

      <div className="mt-4 flex flex-wrap gap-2">
        <LinkButton to="/auth/signup">Create account</LinkButton>
        <LinkButton to="/auth/password-recovery">I forgot my password</LinkButton>
      </div>
    </section>
  );
};

export default SignIn;
