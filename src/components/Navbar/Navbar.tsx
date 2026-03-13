import { NavLink } from "react-router";
import { getTextLinkClass } from "./utils";

const Navbar = () => {
  return (
    <nav className="my-4 pr-4 flex gap-2 w-full justify-end" aria-label="Primary navigation">
      <NavLink to="/" end className={getTextLinkClass}>
        Today
      </NavLink>
      <NavLink to="/calendar" className={getTextLinkClass}>
        Calendar
      </NavLink>
    </nav>
  );
};

export default Navbar;
