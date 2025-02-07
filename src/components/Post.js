import React, { useState } from "react";
import "../styles/Post.css";

// Utility functions
const formatTimestamp = (timestamp) => {
  if (!timestamp) return "";
  const diff = Math.floor((new Date() - new Date(timestamp)) / 1000);
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

const renderContentWithLinks = (content) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return content.split(urlRegex).map((part, index) => {
    if (part.match(urlRegex)) {
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="post-link"
        >
          {part}
        </a>
      );
    }
    return part;
  });
};

const isYouTubeLink = (url) => {
  const youtubeRegex =
    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = url.match(youtubeRegex);
  return match ? match[1] : null;
};

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
              ? `http://localhost/api/uploads/${post.profilePic}`
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
                    <li onClick={handleEdit}>Edit</li>
                    <li onClick={handleDelete}>Delete</li>
                  </ul>
                </div>
              )}
            </div>
          </div>
          {/* Subcategories and timestamp on a separate row */}
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
          <span className="post-timestamp">
            {formatTimestamp(post.created_at)}
          </span>
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
                  src={`http://localhost/api/uploads/${file}`}
                  alt={`Media ${index + 1}`}
                  className="post-media-image"
                />
              ) : (
                <video controls preload="metadata" className="post-media-video">
                  <source
                    src={`http://localhost/api/uploads/${file}`}
                    type="video/mp4"
                  />
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
