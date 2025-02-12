// EditPostForm.js
import React, { useState } from "react";
import "../styles/EditPostForm.css";
import MediaUpload from "./MediaUpload";
import CategorySelector from "./CategorySelector";

function EditPostForm({ post, onClose, onPostEdit }) {
  // Pre-populate state with existing post data.
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [selectedCategory, setSelectedCategory] = useState(post.category);
  const [selectedCategoryColor, setSelectedCategoryColor] = useState(
    post.categoryColor
  );
  const [selectedSubCategories, setSelectedSubCategories] = useState(
    post.subcategories || []
  );
  const [mediaFiles, setMediaFiles] = useState([]);

  const handleCategoryChange = (categoryName, subCategories, categoryColor) => {
    setSelectedCategory(categoryName);
    setSelectedCategoryColor(categoryColor);
  };

  const handleSubCategorySelect = (subCategories) => {
    setSelectedSubCategories(subCategories);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedPost = {
      ...post,
      title,
      content,
      category: selectedCategory,
      categoryColor: selectedCategoryColor,
      subcategories: selectedSubCategories,
      // Optionally include media updates if new media is provided
    };

    // Call the onPostEdit callback passed from Dashboard.
    await onPostEdit(updatedPost);
  };

  return (
    <form onSubmit={handleSubmit} className="edit-post-form">
      <h2>Edit Post</h2>
      <label>Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label>Content:</label>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>

      <CategorySelector
        options={{ useSimpleCategories: true }}
        onCategoryChange={handleCategoryChange}
        onSubCategorySelect={handleSubCategorySelect}
      />

      <MediaUpload
        onFileSelect={(files) => setMediaFiles(files)}
        acceptTypes="image/*,video/*"
        multiple
      />

      <div className="edit-form-buttons">
        <button type="submit">Save Changes</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default EditPostForm;
