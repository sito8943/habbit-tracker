import { Outlet } from "react-router";
import { Navbar } from "../components";
import styles from "./View.module.css";

const View = () => {
  return (
    <main>
      <Navbar />
      <div className={styles.wrapper}>
        <h1 className={styles.title}>Focus Habit</h1>
        <Outlet />
      </div>
    </main>
  );
};

export default View;
