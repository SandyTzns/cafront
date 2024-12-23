import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PasswordRecoveryEmail.css";

function PasswordRecoveryEmail() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for password recovery logic
    navigate("/reset-password");
  };

  return (
    <div className="password-recovery-page">
      <h1>Mot de passe oublié</h1>
      <form onSubmit={handleSubmit} className="form-wrapper">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" placeholder="Votre email" />
        </div>
        <button type="submit">Récupérer le mot de passe</button>
      </form>
    </div>
  );
}

export default PasswordRecoveryEmail;
