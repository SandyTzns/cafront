import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import oceanWaves from "../assets/videos/ocean-waves.mp4";
import "../styles/LandingPage.css";

function LandingPage() {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsActive(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const navigate = useNavigate();

  const handleNavigate = () => {
    const isLoggedIn = sessionStorage.getItem("user") !== null; // Check session storage
    if (isLoggedIn) {
      navigate("/accueil"); // User is logged in → Go to Dashboard
    } else {
      navigate("/auth"); // User is NOT logged in → Go to Auth Page
    }
  };

  return (
    <div className="landing-page">
      <video autoPlay loop muted className="background-video">
        <source src={oceanWaves} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={`content ${isActive ? "active" : ""}`}>
        <h1>
          COEUR ALIZÉS SPIRIT
          <span> [L’art du Positif]</span>
        </h1>
        <p>
          Bâtissons ce nouvel horizon <br />
          NOS RÉGIONS REGORGENT DE POSITIVITÉ <br />
          Notre plateforme vous est ouverte pour ce partage
        </p>
        <button className="connect-button offset" onClick={handleNavigate}>
          ENTREZ
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
