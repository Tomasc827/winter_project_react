import React, { useState } from "react";
import "./Card.css";
import bookmarkIcon from "./bookmarkicon.jpg";
import bookmarkIconActive from "./bookmarkiconactive.png";

const Card = ({ image, title, details }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmarkClick = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className="show-card">
      <div className="show-card-image">
        <img src={image} alt={title} className="show-card-img" />
        <div className="play-overlay">
          <button className="play-button">
            <div className="play-icon"></div>
            <span className="play-text">Play</span>
          </button>
        </div>
      </div>
      <div className="show-card-content">
        <p className="show-card-details">{details}</p>
        <h2 className="show-card-title">{title}</h2>
      </div>
      <button
        className={`show-card-bookmark ${isBookmarked ? "active" : ""}`}
        onClick={handleBookmarkClick}
        title={isBookmarked ? "Remove from Bookmarks" : "Add to Bookmarks"}
      >
        <img
          src={isBookmarked ? bookmarkIconActive : bookmarkIcon}
          alt="Bookmark Icon"
        />
      </button>
    </div>
  );
};

export default Card;
