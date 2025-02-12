import React, { useState } from "react";
import "../styles/Post.css";
import {
  renderContentWithLinks,
  isYouTubeLink,
} from "../services/postUtils.js";

function Post({ post, onEdit, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleEdit = () => {
    if (onEdit) onEdit(post);
    setMenuOpen(false);
  };

  const handleDelete = () => {
    if (onDelete) onDelete(post);
    setMenuOpen(false);
  };

  return (
    <div className="post">
      <div className="post-container">
        <img
          src={
            post.profilePic && !post.profilePic.startsWith("http")
              ? `/api/uploads/${post.profilePic}`
              : post.profilePic || "default-logo-path.jpg"
          }
          alt="Profile"
          className="post-profile-pic"
        />
        <div className="post-cat-sub-time">
          {/* New wrapper for top row: category and dropdown */}
          <div className="post-cat-top">
            <div
              className="post-category"
              style={{ backgroundColor: post.categoryColor || "#ddd" }}
            >
              {post.category}
            </div>
            <div className="post-menu">
              <button className="post-menu-button" onClick={toggleMenu}>
                …
              </button>
              {menuOpen && (
                <div className="post-menu-dropdown">
                  <ul>
                    <li onClick={handleEdit}>Modifier</li>
                    <li onClick={handleDelete}>Supprimer</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          {post.subcategories && post.subcategories.length > 0 && (
            <div className="post-subcategories">
              {post.subcategories.map((sub) => (
                <span
                  key={sub}
                  className="post-subcategory"
                  style={{
                    border: `1px solid ${post.categoryColor || "#ccc"}`,
                  }}
                >
                  {sub}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {post.title && <h3 className="post-title">{post.title}</h3>}
      {post.content && (
        <p className="post-text">
          {isYouTubeLink(post.content) ? (
            <iframe
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${isYouTubeLink(
                post.content
              )}`}
              title="YouTube video player"
              style={{ border: "none" }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            renderContentWithLinks(post.content)
          )}
        </p>
      )}

      {post.media_paths && post.media_paths.length > 0 && (
        <div className="post-media">
          {post.media_paths.map((file, index) => (
            <div key={index} className="post-media-item">
              {file.toLowerCase().endsWith(".jpg") ||
              file.toLowerCase().endsWith(".jpeg") ||
              file.toLowerCase().endsWith(".png") ? (
                <img
                  src={`/api/uploads/${file}`}
                  alt={`Media ${index + 1}`}
                  className="post-media-image"
                />
              ) : (
                <video controls preload="metadata" className="post-media-video">
                  <source src={`/api/uploads/${file}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Post;
