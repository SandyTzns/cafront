// Form2.js
import React, { useState } from "react";
import "../styles/Form2.css"; // Reusing the same styles as Form1
import MediaUpload from "./MediaUpload";
import CategorySelector from "./CategorySelector";
import textIcon from "../assets/images/text.png";

function Form2({ initialView, onSubmit, closeModal }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [selectedCategoryColor, setSelectedCategoryColor] = useState("");
  const [title, setTitle] = useState("");
  const [isTextAreaVisible, setIsTextAreaVisible] = useState(false); // For toggling text area

  const handleCategoryChange = (categoryName, subCategories, categoryColor) => {
    setSelectedCategory(categoryName);
    setSelectedSubCategories([]); // Reset subcategories when category changes
    setSelectedCategoryColor(categoryColor || "#ddd");
  };

  const handleSubCategorySelect = (subcategory) => {
    setSelectedSubCategories((prev) => {
      const updatedSubs = prev.includes(subcategory)
        ? prev.filter((sub) => sub !== subcategory) // Remove if deselected
        : [...prev, subcategory]; // Add if selected
      console.log("Updated Subcategories:", updatedSubs); // Debug log
      return updatedSubs;
    });
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const toggleTextArea = () => {
    setIsTextAreaVisible((prev) => !prev);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!selectedCategory) {
      alert("Please select a category!");
      return;
    }

    const newPost = {
      id: Date.now(),
      profilePic: "path/to/profile-pic.jpg",
      category: selectedCategory,
      categoryColor: selectedCategoryColor,
      subcategories: selectedSubCategories,
      title,
      content: isTextAreaVisible ? "Optional comment here" : "",
      timestamp: new Date(),
    };

    console.log("New Post Data:", newPost);
    onSubmit(newPost);
    setTitle("");
    setSelectedCategory("");
    setSelectedSubCategories([]);
    setSelectedCategoryColor("");
    setIsTextAreaVisible(false);

    if (closeModal) {
      closeModal();
    }
  };

  return (
    <div className="form2-container">
      <form onSubmit={handleFormSubmit}>
        <CategorySelector
          onCategoryChange={handleCategoryChange}
          onSubCategorySelect={handleSubCategorySelect}
        />

        <div className="form2-title-field">
          <label htmlFor="title">Titre: </label>
          <input
            type="text"
            id="title"
            className="form2-title-input"
            value={title}
            onChange={handleTitleChange}
          />
        </div>

        <MediaUpload
          onFileSelect={(files) => console.log("Selected files:", files)}
          acceptTypes="image/*,video/*"
          multiple
        />

        <div className="form2-media-section">
          <p>Ajouter à la publication:</p>
          <img
            src={textIcon}
            alt="Add Comment"
            className="form2-text-icon"
            onClick={toggleTextArea}
          />
        </div>

        {isTextAreaVisible && (
          <textarea
            className="form2-input"
            placeholder="Add your comment here..."
            rows="4"
          ></textarea>
        )}

        <button
          className="form2-publish-button"
          type="submit"
          disabled={!selectedCategory}
        >
          Publish
        </button>
      </form>
    </div>
  );
}

export default Form2;
