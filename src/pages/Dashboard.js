import React from "react";
import Navbar from "../components/Navbar";
import "../styles/Dashboard.css";

function Dashboard() {
  return (
    <div>
      <Navbar />

      <div className="dashboard-container">
        <main className="dashboard-content">
          <section className="preferred-categories">
            <h2>Récent partage dans vos catégories préférées</h2>
            <div className="post-card">
              {" "}
              {/* Example card */}
              <div className="category">Maritime</div>
              <h3>TITRE DU POST</h3>
              <p>Lien YouTube</p>
              <small>Post créé par .... le 23 août 2024</small>
            </div>
            <button className="see-more-btn">Voir plus</button>
          </section>
          <section className="recent-posts">
            <h2>Vos récents partage</h2>
            <div className="post-card">
              {" "}
              {/* Example card */}
              <div className="category">Viticole</div>
              <h3>TITRE DU POST</h3>
              <p>Lien YouTube</p>
              <small>Post créé par .... le 23 août 2024</small>
            </div>
            <button className="see-more-btn">Voir plus</button>
          </section>
        </main>
        <footer className="dashboard-footer">
          <p>Coeur Alizés Spirit 2024</p>
        </footer>
      </div>
    </div>
  );
}

export default Dashboard;
