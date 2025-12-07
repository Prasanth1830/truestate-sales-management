// src/components/SearchBar.jsx
import React from 'react';
import '../styles/SearchBar.css';

export const SearchBar = ({ value, onChange, onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search by Customer Name or Phone Number..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </form>
    </div>
  );
};
