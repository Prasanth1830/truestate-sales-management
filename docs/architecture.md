# Architecture Document - TruEstate Sales Management System

## System Overview

The TruEstate Retail Sales Management System is a full-stack web application implementing a modern separation of concerns architecture. The backend provides a RESTful API for data operations while the frontend consumes this API to deliver an interactive user experience.

## Backend Architecture

### Technology Stack
- **Runtime:** Node.js
- **Framework:** Express.js
- **Data Store:** In-memory JSON (file-based)
- **Port:** 5000

### Architectural Layers

#### 1. Route Layer (`src/routes/`)
**Responsibility:** HTTP endpoint definition and request routing

**File:** `salesRoutes.js`
- Defines URL patterns and maps to controllers
- Handles all endpoints: `/api/sales/transactions`, `/api/sales/filters`, `/api/sales/search`, `/api/sales/all`
- Implements request method (GET) constraints

#### 2. Controller Layer (`src/controllers/`)
**Responsibility:** HTTP request/response handling

**File:** `salesController.js`
- Parses query parameters from HTTP requests
- Validates incoming data
- Calls appropriate service methods
- Formats and returns JSON responses
- Implements error handling with HTTP status codes
- Handles both success (200) and error (400, 500) cases

#### 3. Service Layer (`src/services/`)
**Responsibility:** Business logic implementation

**File:** `salesService.js`
- Implements transaction retrieval logic
- Orchestrates filtering operations
- Manages pagination calculations
- Provides filter option generation
- Validates filter ranges and date consistency
- Acts as intermediary between controllers and data models

#### 4. Model Layer (`src/models/`)
**Responsibility:** Data management and manipulation

**File:** `SalesData.js`
- Singleton pattern for data access
- Loads JSON data on initialization
- Implements filtering algorithms:
  - Search: case-insensitive string matching
  - Region/Gender/Category/PaymentMethod: array inclusion checks
  - Age: numeric range filtering
  - Tags: partial tag matching with string splitting
  - Date: temporal range filtering
- Implements sorting by:
  - Date: ascending/descending chronological order
  - Quantity: numeric comparison
  - CustomerName: alphabetical ordering
- Implements pagination with offset calculation

#### 5. Data Layer
**File:** `src/data/sales_data.json`
- JSON data store with 30+ transaction records
- Fields include customer, product, sales, and operational data

### Data Flow

```
HTTP Request
    ↓
Route Handler (salesRoutes.js)
    ↓
Controller (salesController.js)
    - Parse query parameters
    - Build filter object
    - Validate input
    ↓
Service Layer (salesService.js)
    - Apply business logic
    - Coordinate operations
    ↓
Model Layer (SalesData.js)
    - Apply filters
    - Apply sorting
    - Apply pagination
    ↓
Response (JSON)
    ↓
HTTP Response
```

### API Contract

**Base URL:** `http://localhost:5000/api`

**Query Parameters:**
- `search` - String search query
- `customerRegions` - Array of regions
- `genders` - Array of genders
- `ageMin`, `ageMax` - Age range
- `productCategories` - Array of categories
- `tags` - Array of tags
- `paymentMethods` - Array of payment methods
- `startDate`, `endDate` - Date range (YYYY-MM-DD)
- `sortBy` - 'date', 'quantity', 'customerName'
- `sortOrder` - 'asc', 'desc'
- `page` - Page number (1-indexed)
- `pageSize` - Items per page (default: 10)

**Response Format:**
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "currentPage": 1,
    "pageSize": 10,
    "totalItems": 45,
    "totalPages": 5,
    "hasNextPage": true,
    "hasPrevPage": false
  }
}
```

## Frontend Architecture

### Technology Stack
- **Framework:** React 18
- **Build Tool:** Vite
- **HTTP Client:** Axios
- **State Management:** React Hooks
- **Port:** 3000

### Component Architecture

#### Page/Container Components
- `App.jsx` - Root component managing app state and orchestration

#### Feature Components
1. **SearchBar.jsx**
   - Controlled input component
   - Handles search term updates
   - Form submission trigger

2. **FilterPanel.jsx**
   - Multi-select checkbox filters
   - Range input filters (age, date)
   - Filter state display
   - Clear all functionality

3. **SortDropdown.jsx**
   - Sort field selection
   - Sort order selection
   - Change handlers

4. **TransactionTable.jsx**
   - Displays transaction data
   - Formats currency and dates
   - Status badge rendering
   - Error and loading states

5. **Pagination.jsx**
   - Previous/Next buttons
   - Page information display
   - Disabled state management

### Hook Architecture

**useFilters.js** - Custom Hook
- Manages filter state with useState
- Provides filter manipulation methods:
  - `updateFilter()` - Update filter value
  - `addToFilter()` - Toggle checkbox selections
  - `clearFilters()` - Reset all filters
  - `clearFilter()` - Reset individual filter
  - `hasActiveFilters()` - Check if any filters active

### Service Layer

**api.js** - API Client
- Axios instance configuration
- Methods:
  - `getTransactions()` - Fetch filtered data
  - `getFilterOptions()` - Fetch available options
  - `search()` - Dedicated search endpoint
  - `getAllTransactions()` - Fetch all data
- Error handling and response parsing

### Utility Layer

**filterUtils.js** - Helper Functions
- `buildFilterParams()` - Convert filter state to API parameters
- `formatCurrency()` - Format numbers as INR currency
- `formatDate()` - Format dates for display

### State Management

**Application State:**
```javascript
{
  data: Array,                    // Current page data
  pagination: Object,             // Pagination metadata
  loading: Boolean,               // Loading state
  error: String,                  // Error message
  filterOptions: Object,          // Available filter options
  sortBy: String,                 // Current sort field
  sortOrder: String,              // Current sort order
  currentPage: Number,            // Current page number
  searchInput: String,            // Search input value
  filters: {                      // Active filters
    search: String,
    customerRegions: Array,
    genders: Array,
    ageRange: Object,
    productCategories: Array,
    tags: Array,
    paymentMethods: Array,
    dateRange: Object
  }
}
```

### Data Flow

```
User Interaction (Search/Filter/Sort/Paginate)
    ↓
Hook State Update (useFilters)
    ↓
Effect Hook Trigger
    ↓
API Client Call (api.js)
    ↓
HTTP Request to Backend
    ↓
Backend Processing
    ↓
HTTP Response (JSON)
    ↓
State Update (setData, setPagination)
    ↓
Component Re-render
    ↓
UI Update
```

### Styling Architecture

- **Style Scoping:** CSS files per component
- **Responsive Design:** Mobile-first with breakpoints
- **Color Scheme:** Professional blue (#0066cc), gray (#495057), status colors
- **Layout:** CSS Grid for main layout, Flexbox for components

### Component Dependency Tree

```
App.jsx
├── SearchBar.jsx
├── FilterPanel.jsx
│   └── (Checkbox components)
├── SortDropdown.jsx
├── TransactionTable.jsx
├── Pagination.jsx
└── (useFilters hook)
└── (api service)
```

## Data Processing Pipeline

### Filtering Pipeline
1. **Search Filter** - String matching on customer name/phone
2. **Multi-Select Filters** - Array inclusion checks (OR logic within filter)
3. **Range Filters** - Numeric/date range validation
4. **Combination** - All filters combined with AND logic

### Sorting Pipeline
1. **Sort Selection** - Field selection from dropdown
2. **Sort Direction** - Ascending/descending order
3. **Application** - Array sorting after filtering

### Pagination Pipeline
1. **Page Calculation** - Calculate start/end indices
2. **Data Slicing** - Extract page subset
3. **Metadata Generation** - Calculate total pages and navigation flags

## Error Handling

### Backend
- Input validation in controllers
- Range validation in services
- Try-catch blocks in async operations
- HTTP status codes (400 for bad input, 500 for server errors)

### Frontend
- Try-catch in API calls
- Error state display
- User-friendly error messages
- Fallback UI for loading/error states

## Performance Optimizations

1. **Backend:**
   - Single-pass filtering algorithms
   - Efficient array operations
   - Pagination to limit data transfer

2. **Frontend:**
   - React component memoization (built-in with function components)
   - Event handler debouncing (potential improvement)
   - Efficient re-renders with proper dependency arrays

## Security Considerations

1. **Input Validation:**
   - Backend validates all query parameters
   - Type checking for numeric fields
   - Date format validation

2. **CORS:**
   - Configured to allow frontend requests
   - Can be restricted to specific domains in production

3. **Future Enhancements:**
   - Authentication middleware
   - Authorization checks
   - Input sanitization for XSS prevention
   - Rate limiting

## Scalability Considerations

**Current Limitations:**
- In-memory data store (limited by RAM)
- Synchronous file I/O on startup

**Scaling Path:**
1. Database integration (MongoDB/PostgreSQL)
2. Caching layer (Redis)
3. API versioning
4. Horizontal scaling with load balancing
5. Async/await for I/O operations

## Testing Strategy

**Recommended Tests:**
1. **Backend:**
   - Unit tests for SalesData model
   - Integration tests for service layer
   - API endpoint tests
   - Filter/sort/pagination logic tests

2. **Frontend:**
   - Component unit tests (React Testing Library)
   - Hook tests
   - API client tests
   - Integration tests for data flow

## Deployment Architecture

**Backend Deployment:**
- Docker container
- Environment variables for configuration
- Port mapping (5000)
- Persistent volume for data (if needed)

**Frontend Deployment:**
- Build static files (npm run build)
- Serve from CDN/web server
- Environment variables for API URL
- Port mapping (3000 or reverse proxy)

**Production Considerations:**
- Environment-specific configurations
- HTTPS only
- CORS domain whitelisting
- Rate limiting
- Monitoring and logging
