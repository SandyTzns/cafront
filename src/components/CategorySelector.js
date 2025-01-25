import React, { useState } from "react";
import categories from "../data/categories.json";
import simpleCategories from "../data/categories_simple.json";
import "../styles/CategorySelector.css";

function CategorySelector({ options, onCategoryChange, onSubCategorySelect }) {
  const { useSimpleCategories } = options || {};
  const data = useSimpleCategories ? simpleCategories : categories;

  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleCategoryChange = (categoryName) => {
    setSelectedCategory(categoryName);

    // Find and update sub-categories based on the selected category
    const category = data.find((cat) => cat.name === categoryName); // Use `data` here
    const categoryColor = category?.color;

    setSubCategories(category?.interests || []); // If no subcategories, fallback to an empty array

    if (onCategoryChange) {
      onCategoryChange(
        categoryName,
        category?.interests || [], // Pass subcategories if available
        categoryColor
      );
    }
    setShowDropdown(false); // Close dropdown after selection
  };

  const handleSubCategoryClick = (subCategory) => {
    const updatedSubCategories = selectedSubCategories.includes(subCategory)
      ? selectedSubCategories.filter((s) => s !== subCategory)
      : [...selectedSubCategories, subCategory];

    console.log("Updated Subcategories (after click):", updatedSubCategories);

    setSelectedSubCategories(updatedSubCategories);

    if (onSubCategorySelect) {
      onSubCategorySelect(updatedSubCategories); // Pass updated subcategories
    }
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
                <span className="category-text">{category.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Sub-category Buttons */}
      {subCategories.length > 0 && (
        <div className="subcategory-container">
          <label htmlFor="sub-categories" className="subcategory-label">
            Sous-catégories:
          </label>
          <div className="subcategory-buttons">
            {subCategories.map((subCategory) => (
              <button
                key={subCategory}
                type="button"
                className={`subcategory-button ${
                  selectedSubCategories.includes(subCategory) ? "selected" : ""
                }`}
                onClick={() => handleSubCategoryClick(subCategory)}
                style={{
                  "--selected-color": selectedCategoryColor || "#333", // Dynamic selected color
                  "--hover-color": selectedCategoryColor || "#777", // Dynamic hover color
                }}
              >
                {subCategory}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default CategorySelector;
