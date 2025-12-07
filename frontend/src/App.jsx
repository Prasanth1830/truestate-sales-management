// src/App.jsx
import React, { useState, useEffect } from 'react';
import './styles/App.css';
import { SearchBar } from './components/SearchBar';
import { FilterPanel } from './components/FilterPanel';
import { SortDropdown } from './components/SortDropdown';
import { TransactionTable } from './components/TransactionTable';
import { Pagination } from './components/Pagination';
import { useFilters } from './hooks/useFilters';
import { api } from './services/api';
import { buildFilterParams } from './utils/filterUtils';

function App() {
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterOptions, setFilterOptions] = useState(null);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');

  const {
    filters,
    updateFilter,
    addToFilter,
    clearFilters,
    hasActiveFilters
  } = useFilters();

  // Load filter options on mount
  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        const options = await api.getFilterOptions();
        setFilterOptions(options);
      } catch (err) {
        console.error('Failed to load filter options:', err);
      }
    };
    loadFilterOptions();
  }, []);

  // Main function to load transactions
  const loadTransactions = async (pageNum = 1) => {
    setLoading(true);
    setError(null);
    try {
      const filterParams = buildFilterParams(filters);
      const result = await api.getTransactions(
        filterParams,
        sortBy,
        sortOrder,
        pageNum,
        10
      );

      setData(result.data);
      setPagination(result.pagination);
      setCurrentPage(pageNum);
    } catch (err) {
      console.error('Failed to load transactions:', err);
      setError(err.message || 'Failed to load transactions');
    } finally {
      setLoading(false);
    }
  };

  // Load transactions when filters or sorting changes
  useEffect(() => {
    loadTransactions(1);
  }, [filters, sortBy, sortOrder]);

  // Handle search submission
  const handleSearch = () => {
    updateFilter('search', searchInput);
  };

  // Handle sort change
  const handleSortChange = (newSortBy, newSortOrder) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    loadTransactions(newPage);
  };

  // Handle clear all filters
  const handleClearAllFilters = () => {
    clearFilters();
    setSearchInput('');
    setCurrentPage(1);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>🏢 TruEstate Sales Management</h1>
        <p>Advanced Search, Filter & Analytics Dashboard</p>
      </header>

      <div className="container">
        <SearchBar
          value={searchInput}
          onChange={setSearchInput}
          onSearch={handleSearch}
        />

        <div className="layout">
          {/* Sidebar with Filters */}
          <aside className="sidebar">
            <FilterPanel
              filters={filters}
              filterOptions={filterOptions}
              onFilterChange={updateFilter}
              onAddFilter={addToFilter}
              hasActiveFilters={hasActiveFilters()}
              onClearFilters={handleClearAllFilters}
            />
          </aside>

          {/* Main Content Area */}
          <main className="main-content">
            {/* Sort Controls */}
            <div className="controls-section">
              <SortDropdown
                sortBy={sortBy}
                sortOrder={sortOrder}
                onSortChange={handleSortChange}
              />

              {/* Info Bar */}
              {hasActiveFilters() || searchInput && (
                <div className="info-bar">
                  📊 Showing results with active filters
                  {hasActiveFilters() && ` (${pagination?.totalItems || 0} matches)`}
                </div>
              )}
            </div>

            {/* Transaction Table */}
            <TransactionTable
              data={data}
              loading={loading}
              error={error}
            />

            {/* Pagination */}
            {!error && !loading && (
              <Pagination
                pagination={pagination}
                onPageChange={handlePageChange}
                loading={loading}
              />
            )}
          </main>
        </div>
      </div>

      <footer className="footer">
        <p>© 2025 TruEstate. All rights reserved. | Retail Sales Management System</p>
      </footer>
    </div>
  );
}

export default App;
