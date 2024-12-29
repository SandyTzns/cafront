import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import MainPage from "./pages/MainPage";
import CreatePost from "./pages/CreatePost";
import PasswordRecoveryEmail from "./pages/PasswordRecoveryEmail";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import SignUpForm from "./components/SignUpForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/signup-form" element={<SignUpForm />} />
        <Route path="/newpost" element={<CreatePost />} />

        {/* Password Recovery Pages */}
        <Route path="/forgot-password" element={<PasswordRecoveryEmail />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
