import React from "react";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const navigate = useNavigate();

  const handleNewPostClick = () => {
    navigate("/newpost"); // Navigate to the SignUpForm page
  };

  return (
    <div>
      <h1>Main Page</h1>
      <button type="submit" onClick={handleNewPostClick}>
        Créer un Nouveau post
      </button>
    </div>
  );
}

export default MainPage;
