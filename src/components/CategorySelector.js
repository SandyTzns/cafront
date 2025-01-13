import React, { useState } from "react";
import categories from "../data/categories.json";
import "../styles/CategorySelector.css";

function CategorySelector({ onCategoryChange, onSubCategorySelect }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleCategoryChange = (categoryName) => {
    setSelectedCategory(categoryName);

    // Find and update sub-categories based on the selected category
    const category = categories.find((cat) => cat.name === categoryName);
    const categoryColor = category?.color;

    setSubCategories(category ? category.interests : []);

    if (onCategoryChange) {
      onCategoryChange(
        categoryName,
        category ? category.interests : [],
        categoryColor
      );
    }
    setShowDropdown(false); // Close dropdown after selection
  };

  // const handleSubCategoryClick = (subCategory) => {
  //   if (selectedSubCategories.includes(subCategory)) {
  //     setSelectedSubCategories(
  //       selectedSubCategories.filter((s) => s !== subCategory)
  //     );
  //   } else {
  //     setSelectedSubCategories([...selectedSubCategories, subCategory]);
  //   }

  //   if (onCategoryChange) {
  //     onCategoryChange(
  //       selectedCategory,
  //       [...selectedSubCategories, subCategory], // Pass updated subcategories
  //       selectedCategoryColor
  //     );
  //   }
  // };

  const handleSubCategoryClick = (subCategory) => {
    const updatedSubCategories = selectedSubCategories.includes(subCategory)
      ? selectedSubCategories.filter((s) => s !== subCategory)
      : [...selectedSubCategories, subCategory];

    console.log("Updated Subcategories (after click):", updatedSubCategories); //

    setSelectedSubCategories(updatedSubCategories);

    if (onSubCategorySelect) {
      onSubCategorySelect(updatedSubCategories); // Pass updated subcategories
    }
  };

  const selectedCategoryColor = categories.find(
    (cat) => cat.name === selectedCategory
  )?.color;

  console.log("Rendering Subcategories:", subCategories);
  console.log("Currently Selected Subcategories:", selectedSubCategories);

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
            {categories.map((category) => (
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
