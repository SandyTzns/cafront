import React from "react";
import "../styles/Login.css";
import { FaGoogle, FaLinkedin } from "react-icons/fa"; // Social Icons

function Login() {
  return (
    <div className="login">
      {/* Social Login Section */}
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

      {/* Form */}
      <form>
        <label htmlFor="email">EMAIL</label>
        <input type="email" id="email" placeholder="Adresse email" required />
        <label htmlFor="password">MOT DE PASSE</label>
        <input
          type="password"
          id="password"
          placeholder="Mot de passe"
          required
        />
        <button type="submit" className="login-button">
          Se connecter
        </button>
        <div className="options">
          <div className="checkbox-remember-me">
            <input type="checkbox" id="remember-me" name="remember-me" />
            <label htmlFor="remember-me">Se souvenir de moi</label>
          </div>
          <a href="#" className="forgot-password">
            Mot de passe oublié ?
          </a>
        </div>
      </form>
    </div>
  );
}

export default Login;
