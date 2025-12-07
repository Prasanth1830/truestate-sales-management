// src/components/FilterPanel.jsx
import React from 'react';
import '../styles/FilterPanel.css';

export const FilterPanel = ({ filters, filterOptions, onFilterChange, onAddFilter, hasActiveFilters, onClearFilters }) => {
  if (!filterOptions) {
    return <div className="filter-panel">Loading filter options...</div>;
  }

  return (
    <div className="filter-panel">
      <div className="filter-panel-header">
        <h3>Filters</h3>
        {hasActiveFilters && (
          <button className="clear-all-btn" onClick={onClearFilters}>Clear All</button>
        )}
      </div>

      {/* Customer Region Filter */}
      <div className="filter-group">
        <label className="filter-label">Customer Region</label>
        <div className="filter-options">
          {filterOptions.customerRegions?.map(region => (
            <label key={region} className="checkbox-label">
              <input
                type="checkbox"
                checked={filters.customerRegions.includes(region)}
                onChange={() => onAddFilter('customerRegions', region)}
              />
              {region}
            </label>
          ))}
        </div>
      </div>

      {/* Gender Filter */}
      <div className="filter-group">
        <label className="filter-label">Gender</label>
        <div className="filter-options">
          {filterOptions.genders?.map(gender => (
            <label key={gender} className="checkbox-label">
              <input
                type="checkbox"
                checked={filters.genders.includes(gender)}
                onChange={() => onAddFilter('genders', gender)}
              />
              {gender}
            </label>
          ))}
        </div>
      </div>

      {/* Age Range Filter */}
      <div className="filter-group">
        <label className="filter-label">Age Range</label>
        <div className="range-inputs">
          <input
            type="number"
            placeholder="Min"
            value={filters.ageRange.min}
            onChange={(e) => onFilterChange('ageRange', {
              ...filters.ageRange,
              min: parseInt(e.target.value) || 0
            })}
            className="range-input"
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.ageRange.max}
            onChange={(e) => onFilterChange('ageRange', {
              ...filters.ageRange,
              max: parseInt(e.target.value) || 100
            })}
            className="range-input"
          />
        </div>
      </div>

      {/* Product Category Filter */}
      <div className="filter-group">
        <label className="filter-label">Product Category</label>
        <div className="filter-options">
          {filterOptions.productCategories?.map(category => (
            <label key={category} className="checkbox-label">
              <input
                type="checkbox"
                checked={filters.productCategories.includes(category)}
                onChange={() => onAddFilter('productCategories', category)}
              />
              {category}
            </label>
          ))}
        </div>
      </div>

      {/* Tags Filter */}
      <div className="filter-group">
        <label className="filter-label">Tags</label>
        <div className="filter-options">
          {filterOptions.tags?.map(tag => (
            <label key={tag} className="checkbox-label">
              <input
                type="checkbox"
                checked={filters.tags.includes(tag)}
                onChange={() => onAddFilter('tags', tag)}
              />
              {tag}
            </label>
          ))}
        </div>
      </div>

      {/* Payment Method Filter */}
      <div className="filter-group">
        <label className="filter-label">Payment Method</label>
        <div className="filter-options">
          {filterOptions.paymentMethods?.map(method => (
            <label key={method} className="checkbox-label">
              <input
                type="checkbox"
                checked={filters.paymentMethods.includes(method)}
                onChange={() => onAddFilter('paymentMethods', method)}
              />
              {method}
            </label>
          ))}
        </div>
      </div>

      {/* Date Range Filter */}
      <div className="filter-group">
        <label className="filter-label">Date Range</label>
        <div className="date-range-inputs">
          <input
            type="date"
            value={filters.dateRange.startDate}
            onChange={(e) => onFilterChange('dateRange', {
              ...filters.dateRange,
              startDate: e.target.value
            })}
            className="date-input"
          />
          <span>to</span>
          <input
            type="date"
            value={filters.dateRange.endDate}
            onChange={(e) => onFilterChange('dateRange', {
              ...filters.dateRange,
              endDate: e.target.value
            })}
            className="date-input"
          />
        </div>
      </div>
    </div>
  );
};
