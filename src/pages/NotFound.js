import React from "react";
import "../styles/NotFound.css";

function NotFound() {
  return (
    <div className="not-found-page">
      <h1>404 - Page non trouvée</h1>
      <button onClick={() => (window.location.href = "/accueil")}>
        Retour à l'accueil
      </button>
    </div>
  );
}

export default NotFound;
