import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import View from "./layouts/View";
import Calendar from "./views/Calendar";
import Home from "./views/Home";

const App = () => {
  const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<View />}>
          <Route index element={<Home />} />
          <Route path="calendar" element={<Calendar />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
