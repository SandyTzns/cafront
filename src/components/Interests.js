import React, { useState } from "react";
import "../styles/Interests.css";

function Interests({
  selectedInterests = [],
  allInterests = [],
  onToggleInterest,
}) {
  const [showAvailableInterests, setShowAvailableInterests] = useState(false);

  // Local helper to check if an interest is already selected
  const isSelected = (interestId) =>
    selectedInterests.some((i) => i.id === interestId);

  const getCategoryById = (id) => allInterests.find((cat) => cat.id === id);
  const getCategoryByName = (name) =>
    allInterests.find((cat) => cat.name === name);

  return (
    <div>
      <h3>Mes intérêts</h3>

      {/* Selected Interests */}
      <div className="interests-container">
        {selectedInterests.map((interest, index) => {
          const category =
            getCategoryById(interest.id) || getCategoryByName(interest.name);
          if (!category) return null;

          return (
            <div
              key={index}
              className="interest-badge"
              style={{ borderColor: category.color }}
            >
              {category.name}
              <span
                className="remove-btn"
                onClick={() => onToggleInterest(category.id, true)}
              >
                ×
              </span>
            </div>
          );
        })}
      </div>

      {/* Toggle Add Interest */}
      <button
        className="add-interest-btn"
        onClick={() => setShowAvailableInterests(!showAvailableInterests)}
      >
        Ajouter un intérêt
      </button>

      {/* Available Interests */}
      {showAvailableInterests && (
        <div className="interest-selection">
          {allInterests
            .filter((cat) => !isSelected(cat.id))
            .map((category, index) => (
              <span
                key={index}
                className="interest-option"
                style={{ borderColor: category.color }}
                onClick={() => onToggleInterest(category.id, false)}
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
