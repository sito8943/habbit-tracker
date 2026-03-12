import { NavLink } from "react-router";

const Navbar = () => {
  const textLinkClass = ({ isActive }: { isActive: boolean }) =>
    [
      "rounded px-2 py-1 text-sm font-medium transition-colors flex items-center",
      isActive ? "text-primary" : "text-text hover:text-primary",
    ].join(" ");

  return (
    <nav className="my-4 pr-4 flex gap-2 w-full justify-end" aria-label="Primary navigation">
      <NavLink to="/" end className={textLinkClass}>
        Today
      </NavLink>
      <NavLink to="/calendar" className={textLinkClass}>
        Calendar
      </NavLink>
    </nav>
  );
};

export default Navbar;
