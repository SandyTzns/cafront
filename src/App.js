import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import SignUpForm from "./components/SignUpForm";
import PasswordRecoveryEmail from "./pages/PasswordRecoveryEmail";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import CreatePost from "./pages/CreatePost";
import Layout from "./components/Layout";
import Contact from "./pages/Contact";
import APropos from "./pages/APropos";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Pages without NAVBAR */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/signup-form" element={<SignUpForm />} />
        {/* Password Recovery Pages */}
        <Route path="/forgot-password" element={<PasswordRecoveryEmail />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />

        {/* Pages WITH NAVBAR */}
        <Route
          path="/accueil"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
        <Route
          path="/nouveau-post"
          element={
            <Layout>
              <CreatePost />
            </Layout>
          }
        />
        <Route
          path="/contact"
          element={
            <Layout>
              <Contact />
            </Layout>
          }
        />
        <Route
          path="/a-propos"
          element={
            <Layout>
              <APropos />
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
