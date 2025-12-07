// src/components/SortDropdown.jsx
import React from 'react';
import '../styles/SortDropdown.css';

export const SortDropdown = ({ sortBy, sortOrder, onSortChange }) => {
  return (
    <div className="sort-controls">
      <div className="sort-group">
        <label className="sort-label">Sort By:</label>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value, sortOrder)}
          className="sort-select"
        >
          <option value="date">Date</option>
          <option value="quantity">Quantity</option>
          <option value="customerName">Customer Name (A-Z)</option>
        </select>
      </div>

      <div className="sort-group">
        <label className="sort-label">Order:</label>
        <select
          value={sortOrder}
          onChange={(e) => onSortChange(sortBy, e.target.value)}
          className="sort-select"
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>
    </div>
  );
};
