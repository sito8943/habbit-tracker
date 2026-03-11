import { Outlet } from "react-router";
import { AuthEntry } from "../components";
import Navbar from "../components/Navbar/Navbar";

const View = () => {
  return (
    <main className="mx-auto mt-10 max-w-120 rounded-lg border border-border bg-base-light p-4">
      <h1 className="mb-4 text-4xl">Focus Habit</h1>
      <Navbar />
      <AuthEntry />
      <Outlet />
    </main>
  );
};

export default View;
