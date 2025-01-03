import React from "react";
import "../styles/SearchBar.css";

const SearchBar = () => {
  return (
    <form className="search-bar-form">
      <input
        type="text"
        placeholder="Rechercher un post..."
        className="search-bar-input"
      />
      <button type="submit" className="search-bar-button">
        Rechercher
      </button>
    </form>
  );
};

export default SearchBar;
