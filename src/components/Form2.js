import React, { useState } from "react";
import "../styles/Form2.css";
import MediaUpload from "./MediaUpload";
import CategorySelector from "./CategorySelector";
import textIcon from "../assets/images/text.png";
import { savePost, savePostWithMedia } from "../services/postService";

function Form2({ initialView, onSubmit, closeModal, useSimpleCategories }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subCategories, setSubCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [selectedCategoryColor, setSelectedCategoryColor] = useState("");
  const [title, setTitle] = useState("");
  const [isTextAreaVisible, setIsTextAreaVisible] = useState(false);
  const [mediaFiles, setMediaFiles] = useState([]);

  const handleCategoryChange = (categoryName, subCategories, categoryColor) => {
    setSelectedCategory(categoryName);
    setSubCategories(subCategories || []);
    setSelectedSubCategories([]);
    setSelectedCategoryColor(categoryColor || "#ddd");
  };

  const handleSubCategorySelect = (subcategoryArray) => {
    setSelectedSubCategories(subcategoryArray);
    console.log("Updated Subcategories (flat array):", subcategoryArray);
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
    setSelectedSubCategories([]);
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

    // Build the new post object with text and meta data
    const newPost = {
      id: Date.now(), // Temporary ID; will be replaced by the backend-generated ID.
      profilePic: "default-profile-pic.jpg", // Default value
      category: selectedCategory,
      categoryColor: selectedCategoryColor,
      subcategories: [...selectedSubCategories],
      title,
      content: isTextAreaVisible ? title : "", // Adjust if you want a separate comment field.
      timestamp: new Date().toISOString(),
      media_paths: [], // Initially empty.
    };

    try {
      let response;
      if (mediaFiles && mediaFiles.length > 0) {
        // Use the function that handles media uploads
        response = await savePostWithMedia(newPost, mediaFiles);
      } else {
        // Use the text-only function
        response = await savePost(newPost);
      }

      if (response.success) {
        alert("Post published successfully!");

        // Create an updated post object that includes media_paths from the backend.
        const updatedPost = {
          ...newPost,
          id: response.id, // Use the ID returned by the backend.
          media_paths: response.media_paths
            ? JSON.parse(response.media_paths)
            : [],
        };

        // Call onSubmit with the updated post object so the Dashboard updates immediately.
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
          onFileSelect={(files) => setMediaFiles(files)}
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
            value={title} // If you want a separate field for comment, consider a new state variable
            onChange={(e) => setTitle(e.target.value)}
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
