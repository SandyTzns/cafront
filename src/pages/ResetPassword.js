import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ResetPassword.css";

function ResetPassword() {
  const navigate = useNavigate();

  const handleResetPassword = (e) => {
    e.preventDefault();
    // Placeholder for password reset logic
    navigate("/auth");
  };

  return (
    <div className="reset-password-page">
      <h1>Réinitialiser le mot de passe</h1>
      <form onSubmit={handleResetPassword}>
        <div className="form-group">
          <label htmlFor="password">Nouveau mot de passe</label>
          <input type="password" id="password" placeholder="Mot de passe" />
        </div>
        <div className="form-group">
          <label htmlFor="confirm-password">Confirmer le mot de passe</label>
          <input
            type="password"
            id="confirm-password"
            placeholder="Confirmer le mot de passe"
          />
        </div>
        <button type="submit">Confirmer</button>
      </form>
    </div>
  );
}

export default ResetPassword;
