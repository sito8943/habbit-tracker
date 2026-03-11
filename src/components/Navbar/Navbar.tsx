import { LinkButton } from "../Button/";

const Navbar = () => {
  return (
    <nav className="mb-4 flex gap-2" aria-label="Primary navigation">
      <LinkButton to="/">Today</LinkButton>
      <LinkButton to="/calendar">Calendar</LinkButton>
      <LinkButton to="/auth">Sign In / Sign Up</LinkButton>
    </nav>
  );
};

export default Navbar;
