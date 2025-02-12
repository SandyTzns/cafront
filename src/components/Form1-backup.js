import React, { useState } from "react";
import "../styles/Form1.css";
import contenuIcon from "../assets/images/contenu.png";
import MediaUpload from "./MediaUpload";
import CategorySelector from "./CategorySelector"; // Import the updated CategorySelector

function Form1() {
  // State variables
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showMediaUpload, setShowMediaUpload] = useState(false);
  const [title, setTitle] = useState(""); // For title input

  const handleCategoryChange = (categoryName, subCats) => {
    setSelectedCategory(categoryName);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleAddMediaClick = () => {
    setShowMediaUpload(true); // Show the media upload section
  };

  const handlePublish = (e) => {
    e.preventDefault();
    if (!selectedCategory) {
      alert("Please choose a category!");
      return;
    }
    alert(`Form submitted! Title: ${title}`); // Replace with actual form submission logic
  };

  return (
    <div className="form1-container">
      {/* Category Selector */}
      <CategorySelector onCategoryChange={handleCategoryChange} />

      {/* Input Field for Title */}
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

      {/* Input Field */}
      <textarea
        className="form1-input"
        placeholder="What's on your mind?"
        rows="4"
      ></textarea>

      {/* Media Section */}
      <div className="form1-media-section">
        <p>Ajouter à la publication:</p>
        <img
          src={contenuIcon} // Adjust the path to your image
          alt="Add Media"
          className="form1-media-image"
          onClick={handleAddMediaClick} // Keep the same logic
        />
      </div>

      {/* Media Upload Box */}
      {showMediaUpload && (
        <MediaUpload
          onFileSelect={(files) => console.log("Selected files:", files)} // Handle file selection
          acceptTypes="image/*,video/*" // Customize accepted file types
          multiple // Allow multiple file selection
        />
      )}

      {/* Publish Button */}
      <button
        className="form1-publish-button"
        onClick={handlePublish}
        disabled={!selectedCategory}
      >
        Publier
      </button>
    </div>
  );
}

export default Form1;
