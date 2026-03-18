import { NavLink } from "react-router";
import styles from "./Navbar.module.css";

const getLinkClass = ({ isActive }: { isActive: boolean }): string =>
  isActive ? `${styles.link} ${styles.linkActive}` : styles.link;

const Navbar = () => {
  return (
    <nav className={styles.nav} aria-label="Primary navigation">
      <NavLink to="/" end className={getLinkClass}>
        Today
      </NavLink>
      <NavLink to="/calendar" className={getLinkClass}>
        Calendar
      </NavLink>
    </nav>
  );
};

export default Navbar;
