import { useAuth } from "./context/AuthContext";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import SignUpForm from "./components/SignUpForm";
import PasswordRecoveryEmail from "./pages/PasswordRecoveryEmail";
import ResetPassword from "./pages/ResetPassword";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/Layout";
import Contact from "./pages/Contact";
import APropos from "./pages/APropos";
import Profile from "./pages/Profile";
import { AuthProvider } from "./context/AuthContext";

function AppRoutes() {
  const { isLoggedIn, isLoading } = useAuth();

  if (isLoading) return <div>Chargement...</div>;

  return (
    <Routes>
      <Route
        path="/"
        element={isLoggedIn ? <Navigate to="/accueil" /> : <LandingPage />}
      />
      <Route
        path="/auth"
        element={isLoggedIn ? <Navigate to="/accueil" /> : <AuthPage />}
      />
      <Route
        path="/signup-form"
        element={isLoggedIn ? <Navigate to="/accueil" /> : <SignUpForm />}
      />
      <Route path="/forgot-password" element={<PasswordRecoveryEmail />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="*" element={<NotFound />} />

      <Route
        path="/accueil"
        element={
          isLoggedIn ? (
            <Layout>
              <Dashboard />
            </Layout>
          ) : (
            <Navigate to="/auth" />
          )
        }
      />
      <Route
        path="/contact"
        element={
          isLoggedIn ? (
            <Layout>
              <Contact />
            </Layout>
          ) : (
            <Navigate to="/auth" />
          )
        }
      />
      <Route
        path="/a-propos"
        element={
          isLoggedIn ? (
            <Layout>
              <APropos />
            </Layout>
          ) : (
            <Navigate to="/auth" />
          )
        }
      />
      <Route
        path="/profile"
        element={
          isLoggedIn ? (
            <Layout>
              <Profile />
            </Layout>
          ) : (
            <Navigate to="/auth" />
          )
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </AuthProvider>
  );
}

export default App;
