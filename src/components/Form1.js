// Form1.js
import React, { useState } from "react";
import "../styles/Form1.css";
import MediaUpload from "./MediaUpload";
import CategorySelector from "./CategorySelector";
import contenuIcon from "../assets/images/contenu.png";

function Form1({ initialView, onSubmit, closeModal }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [isMediaUploadVisible, setIsMediaUploadVisible] = useState(
    initialView === "media"
  );
  const [title, setTitle] = useState("");
  const [textAreaValue, setTextAreaValue] = useState("");
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [selectedCategoryColor, setSelectedCategoryColor] = useState("");

  const handleCategoryChange = (categoryName, subCategories, categoryColor) => {
    setSelectedCategory(categoryName);
    setSubCategories(subCategories || []); // Set available subcategories
    setSelectedSubCategories([]); // Reset selected subcategories when category changes
    setSelectedCategoryColor(categoryColor || "#ddd");
  };

  const handleSubCategorySelect = (subcategoryArray) => {
    // Just set the array directly; no need to nest it
    setSelectedSubCategories(subcategoryArray);
    console.log("Updated Subcategories (flat array):", subcategoryArray); // Debug log
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTextChange = (e) => {
    setTextAreaValue(e.target.value);
  };

  const handleAddMediaClick = () => {
    setIsMediaUploadVisible((prev) => !prev); // Toggle visibility
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("Form Subcategories Before Submit:", selectedSubCategories);

    if (!selectedCategory || !textAreaValue) {
      alert("Please fill in all required fields!");

      return;
    }

    const newPost = {
      id: Date.now(),
      profilePic: "path/to/profile-pic.jpg", // Replace with a dynamic profile pic
      category: selectedCategory,
      categoryColor: selectedCategoryColor, // Pass the category color
      subcategories: [...selectedSubCategories], // Ensure flat array
      title,
      content: textAreaValue,
      timestamp: new Date(),
    };
    console.log("Submitting Post:", newPost);

    console.log("New Post Data:", newPost);
    onSubmit(newPost); // Pass the new post to Dashboard
    setTitle("");
    setTextAreaValue("");
    setSelectedCategory("");
    setSelectedSubCategories([]);
    setSelectedCategoryColor("");
    setIsMediaUploadVisible(false); // Reset the form state

    if (closeModal) {
      closeModal(); // Close the modal
    }

    console.log("Submitting Post:", {
      selectedCategory,
      selectedSubCategories,
    });
  };

  return (
    <div className="form1-container">
      <form onSubmit={handleFormSubmit}>
        <CategorySelector
          onCategoryChange={handleCategoryChange}
          onSubCategorySelect={handleSubCategorySelect} // Use the updated logic
        />

        <div className="form1-title-field">
          <label htmlFor="title">Titre: </label>
          <input
            type="text"
            id="title"
            className="form1-title-input"
            value={title}
            onChange={handleTitleChange}
          />
        </div>

        <textarea
          className="form1-input"
          placeholder="What's on your mind?"
          rows="4"
          value={textAreaValue}
          onChange={handleTextChange}
        ></textarea>

        {isMediaUploadVisible && (
          <MediaUpload
            onFileSelect={(files) => console.log("Selected files:", files)}
            acceptTypes="image/*,video/*"
            multiple
          />
        )}

        <div className="form1-media-section">
          <p>Ajouter à la publication:</p>
          <img
            src={contenuIcon}
            alt="Add Media"
            className="form1-media-image"
            onClick={handleAddMediaClick}
          />
        </div>

        <button
          className="form1-publish-button"
          type="submit"
          disabled={!selectedCategory}
        >
          Publish
        </button>
      </form>
    </div>
  );
}

export default Form1;
