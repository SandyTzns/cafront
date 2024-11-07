import React, { useState } from "react";
import "../scss/InterestButton.scss";

function InterestButton() {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryClick = (category) => {
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(category)) {
        // If already selected, remove it
        return prevSelected.filter((item) => item !== category);
      } else {
        // If not selected, add it
        return [...prevSelected, category];
      }
    });
  };

  return (
    <div className="interest-button">
      <div
        className={`half-button left-button ${
          selectedCategories.includes("painting") ? "selected" : ""
        }`}
        onClick={() => handleCategoryClick("painting")}
      >
        Peinture
      </div>
      <div
        className={`half-button right-button ${
          selectedCategories.includes("music") ? "selected" : ""
        }`}
        onClick={() => handleCategoryClick("music")}
      >
        Musique
      </div>
    </div>
  );
}

export default InterestButton;
