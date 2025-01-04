import React from "react";
import "../styles/Card.css";

function Card({ image, tagColor, tagName, date, title, userImage, userName }) {
  return (
    <div className="card">
      <img src={image} className="card__image" alt="Post visual" />
      <div className="card__content">
        <div className={`tag ${tagColor}`}>{tagName}</div>
        <span className="card__title">{title}</span>
        <div className="card__footer">
          <div className="user">
            <img src={userImage} alt="User" className="user__image" />
            <div className="user__info">
              <h5>{userName}</h5>
              <small>
                <time dateTime={date} className="card__date">
                  {date}
                </time>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
