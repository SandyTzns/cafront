import React, { useState } from "react";
import "../styles/Form1.css";
import CategorySelector from "./CategorySelector";
import axios from "axios";

function Form1({ onSubmit, closeModal }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [title, setTitle] = useState("");
  const [textAreaValue, setTextAreaValue] = useState("");
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [selectedCategoryColor, setSelectedCategoryColor] = useState("");

  const handleCategoryChange = (categoryName, subCategories, categoryColor) => {
    setSelectedCategory(categoryName);
    setSubCategories(subCategories || []);
    setSelectedSubCategories([]);
    setSelectedCategoryColor(categoryColor || "#ddd");
  };

  const handleSubCategorySelect = (subcategoryArray) => {
    setSelectedSubCategories(subcategoryArray);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleTextChange = (e) => {
    setTextAreaValue(e.target.value);
  };

  const resetForm = () => {
    setTitle("");
    setTextAreaValue("");
    setSelectedCategory("");
    setSelectedSubCategories([]);
    setSelectedCategoryColor("");
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!selectedCategory || !textAreaValue) {
      alert("Please fill in all required fields!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost/api/post/save_post.php",
        {
          category: selectedCategory,
          categoryColor: selectedCategoryColor || "#ddd",
          subcategories: selectedSubCategories,
          title,
          content: textAreaValue,
          timestamp: new Date().toISOString(),
        }
      );

      if (response.data.success) {
        alert("Post published successfully!");
        resetForm();
        if (onSubmit && response.data.success) {
          onSubmit({
            id: response.data.id, // Make sure the backend returns the new post's ID
            title,
            content: textAreaValue,
            category: selectedCategory,
            categoryColor: selectedCategoryColor || "#ddd",
            subcategories: selectedSubCategories,
            media_paths: [], // No media in Form1
            created_at: response.data.created_at,
            profilePic: "default-profile-pic.jpg", // Default until user changes it
          });
        }

        if (closeModal) closeModal();
      } else {
        alert("Failed to publish post.");
      }
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  return (
    <div className="form1-container">
      <form onSubmit={handleFormSubmit}>
        <CategorySelector
          onCategoryChange={handleCategoryChange}
          onSubCategorySelect={handleSubCategorySelect}
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
