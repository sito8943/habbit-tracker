import { render, screen } from "@testing-library/react";
import Notice from "./Notice";
import styles from "./Notice.module.css";

describe("Notice", () => {
  it("renders status by default", () => {
    render(<Notice>All good</Notice>);

    expect(screen.getByRole("status")).toHaveTextContent("All good");
  });

  it("supports alert role and tone classes", () => {
    render(
      <Notice role="alert" tone="error">
        Something went wrong
      </Notice>
    );

    const alert = screen.getByRole("alert");
    expect(alert).toHaveTextContent("Something went wrong");
    expect(alert).toHaveClass(styles.error);
  });
});
