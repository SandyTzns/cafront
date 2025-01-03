import React from "react";
import "../styles/Post.css";

const Post = ({ title, category, description }) => {
  return (
    <div className="post-container">
      <div className="post-card">
        <span className="post-category">Musical</span>
        <h3 className="post-title">BLEU SILÂNS</h3>
        <audio controls src="song.mp3" className="post-audio"></audio>
        <p className="post-comment">Amazing track for a calm evening!</p>
        <div className="post-footer">
          <span>Posted by John Doe on Jan 1, 2025</span>
        </div>
      </div>
    </div>
  );
};

export default Post;
