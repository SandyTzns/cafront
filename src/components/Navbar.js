import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <NavLink to="/" id="navbar-title">
          COEUR ALIZÉS SPIRIT [L'Art du Positif]
        </NavLink>
      </div>
      <div className={`navbar-right ${menuOpen ? "active" : ""}`}>
        <div className="navbar-dropdown">
          <span className="navbar-dropdown-title">Publications</span>
          <div className="navbar-dropdown-content">
            <NavLink
              to="/create-post"
              className={({ isActive }) =>
                isActive ? "navbar-active-link" : undefined
              }
            >
              Créer un nouveau post
            </NavLink>
            <NavLink
              to="/mes-coups-de-coeur"
              className={({ isActive }) =>
                isActive ? "navbar-active-link" : undefined
              }
            >
              Mes Coups de Coeur
            </NavLink>
            <NavLink
              to="/mes-contributions"
              className={({ isActive }) =>
                isActive ? "navbar-active-link" : undefined
              }
            >
              Mes Contributions
            </NavLink>
          </div>
        </div>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "navbar-active-link" : undefined
          }
        >
          A Propos
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            isActive ? "navbar-active-link" : undefined
          }
        >
          Contact
        </NavLink>
        <div className="navbar-dropdown">
          <span className="navbar-dropdown-title">Sandy</span>
          <div className="navbar-dropdown-content">
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                isActive ? "navbar-active-link" : undefined
              }
            >
              Mon Profil
            </NavLink>
            <span className="navbar-logout-link" role="button" tabIndex="0">
              Déconnexion
            </span>
          </div>
        </div>
      </div>
      <div className="navbar-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </nav>
  );
}

export default Navbar;
