import { useAuth } from "../context/AuthContext";
import React, { useState } from "react";
import "../styles/Form1.css";
import CategorySelector from "./CategorySelector";
import axios from "axios";

function Form1({ onSubmit, closeModal }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [title, setTitle] = useState("");
  const [textAreaValue, setTextAreaValue] = useState("");
  const [selectedCategoryColor, setSelectedCategoryColor] = useState("");
  const { user } = useAuth();
  const userId = user?.id;

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
      const formData = new FormData();
      const formattedTimestamp = new Date()
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      formData.append("user_id", userId);
      formData.append("title", title);
      formData.append("content", textAreaValue);
      formData.append("category", selectedCategory);
      formData.append("categoryColor", selectedCategoryColor || "#ddd");
      formData.append("timestamp", formattedTimestamp);

      const response = await axios.post(
        "http://localhost/caback/post/save_post.php",
        formData
      );

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
