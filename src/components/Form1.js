import React, { useState } from "react";
import "../styles/Form1.css";
import CategorySelector from "./CategorySelector";
import axios from "axios";

function Form1({ onSubmit, closeModal }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [title, setTitle] = useState("");
  const [textAreaValue, setTextAreaValue] = useState("");
  const [selectedCategoryColor, setSelectedCategoryColor] = useState("");

  const handleCategoryChange = (categoryName, categoryColor) => {
    setSelectedCategory(categoryName);
    setSelectedCategoryColor(categoryColor || "#ddd");
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
    setSelectedCategoryColor("");
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!selectedCategory || !textAreaValue) {
      alert("Please fill in all required fields!");
      return;
    }

    try {
      const response = await axios.post("/api/post/save_post.php", {
        category: selectedCategory,
        categoryColor: selectedCategoryColor || "#ddd",
        title,
        content: textAreaValue,
        timestamp: new Date().toISOString(),
      });

      if (response.data.success) {
        resetForm();
        if (onSubmit && response.data.success) {
          onSubmit({
            id: response.data.id,
            title,
            content: textAreaValue,
            category: selectedCategory,
            categoryColor: selectedCategoryColor || "#ddd",
            media_paths: [],
            created_at: response.data.created_at,
            profilePic: "default-profile-pic.jpg",
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
        <CategorySelector onCategoryChange={handleCategoryChange} />

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
          placeholder="Que veux-tu partager ?"
          rows="4"
          value={textAreaValue}
          onChange={handleTextChange}
        ></textarea>

        <button
          className="form1-publish-button"
          type="submit"
          disabled={!selectedCategory}
        >
          Publier
        </button>
      </form>
    </div>
  );
}

export default Form1;
