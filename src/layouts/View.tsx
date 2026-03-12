import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";

const View = () => {
  return (
    <main className="">
      <Navbar />
      <div className="mx-auto mt-10 max-w-120 rounded-lg border border-border bg-base-light p-4">
        <h1 className="mb-4 text-4xl">Focus Habit</h1>
        <Outlet />
      </div>
    </main>
  );
};

export default View;
