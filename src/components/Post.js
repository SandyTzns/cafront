import React from "react";
import "../styles/Post.css";
import Logo from "../assets/images/logo.png";

function Post({ post }) {
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

  const youtubeId = isYouTubeLink(post.content);

  return (
    <div className="post">
      <div className="post-container">
        {/* Profile Picture */}
        <img
          src={
            post.profilePic && !post.profilePic.startsWith("http")
              ? `http://localhost/api/uploads/${post.profilePic}`
              : post.profilePic || Logo
          }
          alt="Profile"
          className="post-profile-pic"
        />

        {/* Category, Subcategories, and Timestamp */}
        <div className="post-cat-sub-time">
          <div
            className="post-category"
            style={{ backgroundColor: post.categoryColor || "#ddd" }}
          >
            {post.category}
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

          <span className="post-timestamp">
            {formatTimestamp(post.timestamp)}
          </span>
        </div>
      </div>

      {/* Title and Content */}
      {post.title && <h3 className="post-title">{post.title}</h3>}
      {youtubeId ? (
        <iframe
          width="100%"
          height="315"
          src={`https://www.youtube.com/embed/${youtubeId}`}
          title="YouTube video player"
          style={{ border: "none" }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ) : (
        <p className="post-text">{renderContentWithLinks(post.content)}</p>
      )}

      {/* Media Files from Backend */}
      {post.media_paths && post.media_paths.length > 0 && (
        <div className="post-media">
          {post.media_paths.map((file, index) => (
            <div key={index} className="post-media-item">
              {file.endsWith(".jpg") || file.endsWith(".png") ? (
                <img
                  src={`http://localhost/api/uploads/${file}`}
                  alt={`Media ${index + 1}`}
                  className="post-media-image"
                />
              ) : (
                <video controls className="post-media-video">
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
