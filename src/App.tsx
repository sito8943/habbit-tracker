import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import AuthLayout from "./layouts/AuthLayout";
import View from "./layouts/View";
import Calendar from "./views/Calendar";
import Home from "./views/Home";
import PasswordRecovery from "./views/auth/PasswordRecovery";
import SignIn from "./views/auth/SignIn";
import SignUp from "./views/auth/SignUp";

const App = () => {
  const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";

  return (
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<View />}>
          <Route index element={<Home />} />
          <Route path="calendar" element={<Calendar />} />
        </Route>
        <Route path="auth" element={<AuthLayout />}>
          <Route index element={<SignIn />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="password-recovery" element={<PasswordRecovery />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
