import React, { useState } from "react";
import InterestButton from "./InterestButton";
import "../styles/Collapsible.css";
import arrow_down from "../assets/images/arrow_down.png";
import arrow_up from "../assets//images/arrow_up.png";

export const Collapsible = ({
  category,
  onToggleInterest,
  selectedInterests,
}) => {
  const [active, setActive] = useState(false);

  const toggleDropdown = () => {
    setActive(!active);
  };

  return (
    <div className="dropdown">
      <button
        className="title"
        type="button"
        style={{ backgroundColor: category.color }}
        onClick={toggleDropdown}
      >
        <h2>{category.name}</h2>
        <span className="arrows">
          {active ? (
            <img src={arrow_up} alt="arrow up" />
          ) : (
            <img src={arrow_down} alt="arrow down" />
          )}
        </span>
      </button>
      <div className={`collapsible-content ${active ? "show" : ""}`}>
        <div className="interests">
          {category.interests.map((interest, index) => (
            <InterestButton
              key={index}
              interest={interest}
              isSelected={selectedInterests.includes(interest)}
              onClick={() => onToggleInterest(category.name, interest)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};