import React from "react";
import "../styles/InterestButton.css";

function InterestButton({ interest, isSelected, onClick }) {
  return (
    <button
      className={`interest-button ${isSelected ? "selected" : ""}`}
      onClick={onClick}
    >
      {interest}
    </button>
  );
}

export default InterestButton;
