import React, { useState } from "react";
import categories from "../data/categories.json";
import "../styles/CategorySelector.css";

function CategorySelector({ onCategoryChange }) {
  const data = categories;
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const handleCategoryChange = (categoryName) => {
    setSelectedCategory(categoryName);

    const category = data.find((cat) => cat.name === categoryName);
    const categoryColor = category?.color;

    if (onCategoryChange) {
      onCategoryChange(categoryName, categoryColor);
    }
    setShowDropdown(false); // Close dropdown after selection
  };

  const selectedCategoryColor = data.find(
    (cat) => cat.name === selectedCategory
  )?.color;

  return (
    <div className="category-selector-container">
      {/* Custom Category Dropdown */}
      <div className="category-row">
        <label htmlFor="category" className="dropdown-label">
          Catégorie:
        </label>
        <div
          className="category-dropdown"
          onClick={() => setShowDropdown((prev) => !prev)}
        >
          {selectedCategory ? (
            <span className="selected-category">
              <span
                className="category-dot"
                style={{ backgroundColor: selectedCategoryColor }}
              ></span>
              {selectedCategory}
            </span>
          ) : (
            <span>Choisir une catégorie</span>
          )}
        </div>

        {showDropdown && (
          <ul className="dropdown-options">
            {data.map((category) => (
              <li
                key={category.name}
                className="dropdown-option"
                onClick={() => handleCategoryChange(category.name)}
              >
                <span
                  className="category-dot"
                  style={{ backgroundColor: category.color }}
                ></span>
                {category.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default CategorySelector;
