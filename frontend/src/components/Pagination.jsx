// src/components/Pagination.jsx
import React from 'react';
import '../styles/Pagination.css';

export const Pagination = ({ pagination, onPageChange, loading }) => {
  if (!pagination) {
    return null;
  }

  const { currentPage, totalPages, hasNextPage, hasPrevPage } = pagination;

  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrevPage || loading}
        className="pagination-btn"
      >
        ← Previous
      </button>

      <div className="page-info">
        Page <span className="current-page">{currentPage}</span> of <span className="total-pages">{totalPages}</span>
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNextPage || loading}
        className="pagination-btn"
      >
        Next →
      </button>
    </div>
  );
};
