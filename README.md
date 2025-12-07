# TruEstate - Retail Sales Management System

## Overview
A full-stack retail sales management system built with Node.js/Express backend and React frontend. Features advanced search, filtering, sorting, and pagination capabilities for managing sales transactions. Handles 30+ attributes across customer, product, sales, and operational dimensions with professional-grade architecture and user experience.

## Tech Stack

### Backend
- **Runtime:** Node.js 16+
- **Framework:** Express 4.18
- **Data Handling:** JSON-based in-memory store
- **CORS:** Enabled for cross-origin requests
- **Environment:** dotenv for configuration

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite 4
- **HTTP Client:** Axios
- **Styling:** CSS3 with responsive design
- **State Management:** React Hooks (useState, useEffect, useContext)

## Search Implementation Summary

**Location:** `/backend/src/models/SalesData.js`, `/frontend/src/components/SearchBar.jsx`

- **Case-Insensitive:** Converts search terms to lowercase for comparison
- **Multi-Field:** Searches across customer name and phone number
- **Performant:** O(n) filtering with early termination
- **Integration:** Works seamlessly with filters and sorting
- **Frontend:** Controlled input component with form submission

## Filter Implementation Summary

**Location:** `/backend/src/models/SalesData.js`, `/frontend/src/components/FilterPanel.jsx`

**Supported Filters:**
- Customer Region (multi-select checkbox)
- Gender (multi-select checkbox)
- Age Range (min/max numeric input)
- Product Category (multi-select checkbox)
- Tags (multi-select checkbox)
- Payment Method (multi-select checkbox)
- Date Range (start/end date input)

**Implementation:**
- Independent filters work in isolation
- Combined filters use AND logic between filter types and OR logic within same type
- State management with custom `useFilters` hook
- Validation on backend to prevent invalid ranges
- Clear All functionality to reset all filters at once

## Sorting Implementation Summary

**Location:** `/backend/src/models/SalesData.js`, `/frontend/src/components/SortDropdown.jsx`

**Sorting Fields:**
- Date (default, newest first)
- Quantity (numeric)
- Customer Name (alphabetical A-Z)

**Implementation:**
- Preserves active search and filters during sort
- Server-side sorting for optimal performance
- Dropdown UI with ascending/descending options
- Sort state maintained across page navigation

## Pagination Implementation Summary

**Location:** `/backend/src/models/SalesData.js`, `/frontend/src/components/Pagination.jsx`

**Features:**
- Fixed page size: 10 items per page
- Next/Previous navigation buttons
- Disabled buttons when at boundaries
- Page info display (current/total)
- Maintains filter, sort, and search state
- Server-side pagination for efficiency

## Setup Instructions

### Prerequisites
- Node.js 16 or higher
- npm or yarn

### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Development mode (with auto-reload)
npm run dev

# Production mode
npm start
```

Server runs on `http://localhost:5000`

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Development mode with hot reload
npm run dev

# Build for production
npm run build
```

Application accessible at `http://localhost:3000`

### Complete Setup

```bash
# From root directory

# Terminal 1: Start Backend
cd backend && npm install && npm run dev

# Terminal 2: Start Frontend
cd frontend && npm install && npm run dev
```

## Project Structure

```
root/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── salesController.js
│   │   ├── services/
│   │   │   └── salesService.js
│   │   ├── models/
│   │   │   └── SalesData.js
│   │   ├── routes/
│   │   │   └── salesRoutes.js
│   │   ├── data/
│   │   │   └── sales_data.json
│   │   └── index.js
│   ├── package.json
│   └── README.md
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── SearchBar.jsx
│   │   │   ├── FilterPanel.jsx
│   │   │   ├── SortDropdown.jsx
│   │   │   ├── TransactionTable.jsx
│   │   │   └── Pagination.jsx
│   │   ├── hooks/
│   │   │   └── useFilters.js
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── utils/
│   │   │   └── filterUtils.js
│   │   ├── styles/
│   │   │   ├── App.css
│   │   │   ├── SearchBar.css
│   │   │   ├── FilterPanel.css
│   │   │   ├── SortDropdown.css
│   │   │   ├── TransactionTable.css
│   │   │   └── Pagination.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── README.md
│
├── docs/
│   └── architecture.md
│
└── README.md
```

## API Endpoints

### Transactions
- `GET /api/sales/transactions` - Get filtered, sorted, paginated transactions
- `GET /api/sales/all` - Get all transactions
- `GET /api/sales/filters` - Get available filter options
- `GET /api/sales/search` - Dedicated search endpoint

## Error Handling

- Invalid filter ranges return 400 with error details
- Missing required fields handled gracefully
- No results return empty data array
- Network errors caught and displayed to user
- Backend validation prevents conflicting filters

## Performance Considerations

- In-memory JSON data store for instant access
- Server-side filtering and sorting minimize data transfer
- Pagination limits response payload
- React component memoization prevents unnecessary re-renders
- CSS classes scoped to components for efficient styling

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- Database integration (MongoDB/PostgreSQL)
- Authentication and authorization
- Advanced analytics and reporting
- Export to CSV/Excel
- Real-time data updates with WebSockets
- Advanced search with regex support
- Saved filter presets
