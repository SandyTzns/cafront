import React from "react";
import "../styles/PostCard.css";

function PostCard({
  image,
  category,
  tagColor,
  title,
  content,
  userImage,
  userName,
  timestamp,
}) {
  return (
    <div className="postcard-container">
      <div className="postcard">
        <div className="postcard__header">
          <img src={image} alt="postcard__image" className="postcard__image" />
        </div>
        <div className="postcard__body">
          <span className={`tag ${tagColor}`}>{category}</span>
          <h4>{title}</h4>
          <p>{content}</p>
        </div>
        <div className="postcard__footer">
          <div className="user">
            <img src={userImage} alt="user__image" className="user__image" />
            <div className="user__info">
              <h5>{userName}</h5>
              <small>{timestamp}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostCard;
