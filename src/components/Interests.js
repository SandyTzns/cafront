import React, { useState } from "react";
import categoriesData from "../data/categories.json"; // Assuming you have categories with colors
import "../styles/Interests.css";

function Interests() {
  const [selectedInterests, setSelectedInterests] = useState([
    "Photography",
    "Traveling",
  ]);
  const [showAvailableInterests, setShowAvailableInterests] = useState(false); // Toggle State

  const availableInterests = categoriesData.filter(
    (category) => !selectedInterests.includes(category.name)
  );

  const addInterest = (interest) => {
    setSelectedInterests([...selectedInterests, interest]);
  };

  const removeInterest = (interest) => {
    setSelectedInterests(selectedInterests.filter((item) => item !== interest));
  };

  return (
    <div>
      <h3>Interests</h3>

      {/* Selected Interests */}
      <div className="interests-container">
        {selectedInterests.map((interest, index) => {
          const category = categoriesData.find((cat) => cat.name === interest);
          if (!category) return null; // Prevent error if category is not found

          return (
            <div
              key={index}
              className="interest-badge"
              style={{ borderColor: category.color }}
            >
              {interest}
              <span
                className="remove-btn"
                onClick={() => removeInterest(interest)}
              >
                ×
              </span>
            </div>
          );
        })}
      </div>

      {/* Toggle Button */}
      <button
        className="add-interest-btn"
        onClick={() => setShowAvailableInterests(!showAvailableInterests)}
      >
        Ajouter un intérêt
      </button>

      {/* Available Interests (only shows when button is clicked) */}
      {showAvailableInterests && (
        <div className="interest-selection">
          {availableInterests.map((category, index) => (
            <span
              key={index}
              className="interest-option"
              style={{ borderColor: category.color }}
              onClick={() => addInterest(category.name)}
            >
              {category.name}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export default Interests;
