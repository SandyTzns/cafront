import React, { useState } from "react";
import categoriesData from "../data/categories.json";
import "../scss/InterestButton.scss";

function InterestButton() {
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryClick = (category) => {
    setSelectedCategories((prevSelected) => {
      if (prevSelected.includes(category)) {
        return prevSelected.filter((item) => item !== category);
      } else {
        return [...prevSelected, category];
      }
    });
  };

  return (
    <div className="interest-button">
      {categoriesData.map((set) => (
        <div
          key={set.id}
          className={`button-set ${
            set.categories.length === 1 ? "single" : "double"
          }`}
        >
          {set.categories.map((category) => (
            <div
              key={category}
              className={`half-button ${
                selectedCategories.includes(category) ? "selected" : ""
              }`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default InterestButton;
