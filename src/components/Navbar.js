import React from "react";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2>Coeur Alizés Spirit [L'Art du Positif]</h2>
      </div>
      <div className="navbar-right">
        <span>Bonjour Sandy</span>
        <a href="#about">A propos</a>
        <a href="#contact">Contact</a>
        <button className="logout-btn" aria-label="Se déconnecter">
          🔓
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
