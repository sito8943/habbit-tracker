import { Button, LinkButton } from "../../components/Button";

const PasswordRecovery = () => {
  return (
    <section className="rounded-lg border border-border bg-base-light/70 p-4 backdrop-blur-md">
      <h2 className="mb-2 text-2xl font-semibold text-text">Password Recovery</h2>
      <p className="mb-4 text-sm text-text-muted">
        We will send you a link to reset your password.
      </p>

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

        <Button type="submit" variant="filled" className="justify-self-start">
          Send link
        </Button>
      </form>

      <div className="mt-4 flex flex-wrap gap-2">
        <LinkButton to="/auth/signin">Back to Sign In</LinkButton>
      </div>
    </section>
  );
};

export default PasswordRecovery;
