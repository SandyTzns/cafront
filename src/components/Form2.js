import React, { useState } from "react";
import "../styles/Form2.css";
import MediaUpload from "./MediaUpload";
import CategorySelector from "./CategorySelector";
import textIcon from "../assets/images/text.png";
import { savePost, savePostWithMedia } from "../services/postService";

function Form2({ initialView, onSubmit, closeModal, useSimpleCategories }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategoryColor, setSelectedCategoryColor] = useState("");
  const [title, setTitle] = useState("");
  const [isTextAreaVisible, setIsTextAreaVisible] = useState(false);
  const [mediaFiles, setMediaFiles] = useState([]);

  const handleCategoryChange = (categoryName, categoryColor) => {
    setSelectedCategory(categoryName);
    setSelectedCategoryColor(categoryColor || "#ddd");
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const toggleTextArea = () => {
    setIsTextAreaVisible((prev) => !prev);
  };

  const resetForm = () => {
    setTitle("");
    setSelectedCategory("");
    setSelectedCategoryColor("");
    setIsTextAreaVisible(false);
    setMediaFiles([]);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!selectedCategory) {
      alert("Please select a category!");
      return;
    }

    const newPost = {
      id: Date.now(),
      profilePic: "default-profile-pic.jpg",
      category: selectedCategory,
      categoryColor: selectedCategoryColor,
      title,
      content: isTextAreaVisible ? title : "",
      timestamp: new Date().toISOString(),
      media_paths: [],
    };

    try {
      let response;
      if (mediaFiles && mediaFiles.length > 0) {
        response = await savePostWithMedia(newPost, mediaFiles);
      } else {
        response = await savePost(newPost);
      }

      if (response.success) {
        const updatedPost = {
          ...newPost,
          id: response.id,
          media_paths: response.media_paths
            ? JSON.parse(response.media_paths)
            : [],
        };

        if (onSubmit) onSubmit(updatedPost);

        resetForm();
        if (closeModal) closeModal();
      } else {
        alert("Failed to publish post.");
      }
    } catch (error) {
      console.error("Error submitting post:", error);
      alert("An error occurred while publishing the post.");
    }
  };

  return (
    <div className="form2-container">
      <form onSubmit={handleFormSubmit}>
        <CategorySelector
          options={{ useSimpleCategories }}
          onCategoryChange={handleCategoryChange}
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
          onFileSelect={(files) => setMediaFiles(files)}
          acceptTypes="image/*,video/*"
          multiple
        />

        <button
          className="form2-publish-button"
          type="submit"
          disabled={!selectedCategory}
        >
          Publier
        </button>
      </form>
    </div>
  );
}

export default Form2;
