# TruEstate Retail Sales Management System - Backend

## Overview
Backend service for the Retail Sales Management System built with Node.js and Express. Provides comprehensive API endpoints for search, filtering, sorting, and pagination of sales transactions.

## Features
- Full-text search across customer name and phone number
- Multi-select filtering for customer region, gender, age, product category, tags, payment method, and date range
- Sorting capabilities for date, quantity, and customer name
- Pagination with configurable page size
- Comprehensive filter validation
- Dynamic filter options endpoint

## API Endpoints

### GET /api/sales/all
Returns all transactions without filtering or pagination.

### GET /api/sales/transactions
Main endpoint with comprehensive filtering, sorting, and pagination support.

**Query Parameters:**
- `search` - Search term for customer name or phone number
- `customerRegions` - Array of customer regions to filter
- `genders` - Array of genders to filter
- `ageMin`, `ageMax` - Age range filter
- `productCategories` - Array of product categories
- `tags` - Array of product tags
- `paymentMethods` - Array of payment methods
- `startDate`, `endDate` - Date range filter (YYYY-MM-DD format)
- `sortBy` - Sort field: 'date', 'quantity', 'customerName' (default: 'date')
- `sortOrder` - Sort order: 'asc' or 'desc' (default: 'desc')
- `page` - Page number (default: 1)
- `pageSize` - Items per page (default: 10)

### GET /api/sales/filters
Returns available filter options including unique values for all filterable fields.

### GET /api/sales/search
Search-specific endpoint for quick searches.

**Query Parameters:**
- `query` - Search term

## Setup & Installation

```bash
# Install dependencies
npm install

# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

## Environment Variables
Create a `.env` file in the backend directory:
```
PORT=5000
```

## Architecture

### Models
- `SalesData.js` - In-memory data model with filtering and sorting logic

### Services
- `salesService.js` - Business logic for transactions, filtering, validation

### Controllers
- `salesController.js` - HTTP request handlers and response formatting

### Routes
- `salesRoutes.js` - API endpoint definitions

## Data Structure
The system handles 30+ fields across customer, product, sales, and operational categories with proper validation and error handling.
