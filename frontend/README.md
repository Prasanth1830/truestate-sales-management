# TruEstate Retail Sales Management System - Frontend

## Overview
Modern React-based frontend for the Retail Sales Management System. Provides intuitive UI for searching, filtering, sorting, and browsing sales transactions with real-time updates.

## Features
- Responsive and clean interface
- Real-time search with debouncing
- Multi-select filters with independent and combined filtering
- Sorting by date, quantity, and customer name
- Pagination with next/previous navigation
- Filter state persistence during navigation
- Professional table visualization with status badges
- Comprehensive error handling

## Components
- `SearchBar` - Full-text search input
- `FilterPanel` - Multi-select filter controls
- `SortDropdown` - Sort field and order selection
- `TransactionTable` - Transaction list with formatting
- `Pagination` - Page navigation controls

## Hooks
- `useFilters` - Custom hook for filter state management

## Services
- `api.js` - API client for backend communication

## Setup & Installation

```bash
# Install dependencies
npm install

# Development mode with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Configuration
Backend API URL is configured in `src/services/api.js` and via Vite proxy in `vite.config.js`.

## Styling
CSS modules for component-scoped styling and responsive design for mobile, tablet, and desktop viewports.
