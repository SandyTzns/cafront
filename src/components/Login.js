import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/userService"; // ✅ Import the service
import "../styles/Login.css";
import { FaGoogle, FaLinkedin } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset previous errors before trying again

    try {
      console.log("🚀 handleLogin function is running!");
      const response = await loginUser(email, password, rememberMe);

      if (response.success) {
        console.log("✅ Navigation triggered: Redirecting to Dashboard");
        alert("Connexion réussie !");
        window.location.reload();
        // navigate("/accueil"); //
      } else {
        console.error("❌ Login failed:", response.message);

        // ✅ Use setTimeout to ensure state updates before React re-renders
        setTimeout(() => {
          setErrorMessage(response.message);
        }, 100);
      }
    } catch (error) {
      setTimeout(() => {
        setErrorMessage("Erreur lors de la connexion. Veuillez réessayer.");
      }, 100);
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login">
      <div className="social-header">
        <h2 className="social-text">Connectez-vous</h2>
        <div className="social-icons">
          <button className="social-icon-button" aria-label="Login with Gmail">
            <FaGoogle />
          </button>
          <button
            className="social-icon-button"
            aria-label="Login with LinkedIn"
          >
            <FaLinkedin />
          </button>
        </div>
      </div>

      <form onSubmit={handleLogin}>
        <label htmlFor="email">EMAIL</label>
        <input
          type="email"
          id="email"
          placeholder="Adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label htmlFor="password">MOT DE PASSE</label>
        <input
          type="password"
          id="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {/* Show error message */}
        <button type="submit" className="login-button">
          Se connecter
        </button>
        <div className="options">
          <div className="checkbox-remember-me">
            <input
              type="checkbox"
              id="remember-me"
              name="remember-me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember-me">Se souvenir de moi</label>
          </div>
          <button
            onClick={() => navigate("/forgot-password")}
            className="forgot-password"
          >
            Mot de passe oublié ?
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
