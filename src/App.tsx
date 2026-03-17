import { Suspense, lazy } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import styles from "./App.module.css";

const View = lazy(() => import("./layouts/View"));
const Home = lazy(() => import("./views/Home"));
const Calendar = lazy(() => import("./views/Calendar"));

const RouteFallback = () => <p className={styles.routeFallback}>Loading...</p>;

const App = () => {
  const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";

  return (
    <BrowserRouter basename={basename}>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<View />}>
            <Route index element={<Home />} />
            <Route path="calendar" element={<Calendar />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default App;
