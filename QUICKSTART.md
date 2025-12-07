# Quick Start Guide

## Installation & Running the Application

### Prerequisites
- Node.js v16 or higher
- npm or yarn

### Option 1: Run Both Backend and Frontend (Recommended)

From the root directory:
```bash
# Install all dependencies
npm install
npm --prefix backend install
npm --prefix frontend install

# Run both services concurrently
npm run dev
```

Backend will be available at: `http://localhost:5000`
Frontend will be available at: `http://localhost:3000`

### Option 2: Run Services Separately

#### Terminal 1 - Backend
```bash
cd backend
npm install
npm run dev
```

#### Terminal 2 - Frontend
```bash
cd frontend
npm install
npm run dev
```

### Option 3: Individual Service Setup

#### Backend Only
```bash
cd backend
npm install
npm start  # or npm run dev
```

#### Frontend Only
```bash
cd frontend
npm install
npm run dev
```

## Testing the Application

1. Open your browser and navigate to `http://localhost:3000`
2. You should see the TruEstate Sales Management Dashboard
3. Try the following features:
   - **Search:** Search for a customer name (e.g., "Neha", "Prerna") or phone number
   - **Filters:** Select regions, genders, categories, payment methods
   - **Sorting:** Change sort order by Date, Quantity, or Customer Name
   - **Pagination:** Navigate through pages using Next/Previous buttons

## API Endpoints

All endpoints are prefixed with `http://localhost:5000/api/sales`

- **GET /transactions** - Get paginated, filtered, sorted transactions
- **GET /all** - Get all transactions without filters
- **GET /filters** - Get available filter options
- **GET /search** - Search transactions

### Example API Call
```bash
curl "http://localhost:5000/api/sales/transactions?search=Neha&page=1&pageSize=10&sortBy=date&sortOrder=desc"
```

## Data

The application includes sample data in `/backend/src/data/sales_data.json` with 10 sample transactions covering:
- Customer information (name, phone, region, gender, age)
- Product details (name, category, brand, tags)
- Sales information (quantity, price, discount, final amount)
- Operational data (payment method, delivery type, order status)

## Troubleshooting

### Port Already in Use
If port 5000 or 3000 is already in use, the application will fail to start.

**Solution:** Kill processes using these ports or modify the port in:
- Backend: `.env` file (PORT=5001)
- Frontend: `vite.config.js` (server.port = 3001)

### Dependencies Not Installing
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and package-lock.json
rm -r node_modules package-lock.json

# Reinstall
npm install
```

### Backend Not Responding
1. Verify backend is running: `http://localhost:5000/api/health`
2. Check console for errors
3. Ensure all dependencies are installed: `npm --prefix backend install`

### Frontend Not Loading Data
1. Check browser console for CORS errors
2. Verify backend is running on port 5000
3. Check network tab in browser DevTools
4. Verify API configuration in `frontend/src/services/api.js`

## Project Structure

```
root/
├── backend/              # Node.js/Express backend
├── frontend/             # React frontend
├── docs/                 # Documentation
├── package.json         # Root monorepo setup
└── README.md            # Main documentation
```

## File Descriptions

### Backend Key Files
- `backend/src/index.js` - Express app setup and server configuration
- `backend/src/controllers/salesController.js` - HTTP request handlers
- `backend/src/services/salesService.js` - Business logic
- `backend/src/models/SalesData.js` - Data layer with filtering/sorting
- `backend/src/data/sales_data.json` - Sample transaction data

### Frontend Key Files
- `frontend/src/App.jsx` - Main component and state orchestration
- `frontend/src/components/` - UI components (Search, Filter, Table, Pagination)
- `frontend/src/hooks/useFilters.js` - Custom filter state hook
- `frontend/src/services/api.js` - Backend API client

## Production Deployment

### Backend
```bash
# Build
cd backend
npm install --production

# Start
PORT=5000 npm start
```

### Frontend
```bash
# Build
cd frontend
npm install
npm run build

# Serve static files (using any web server)
# Serve the 'dist' directory
```

## Support

For issues or questions, refer to:
- `/docs/architecture.md` - Detailed architecture documentation
- Backend `/backend/README.md` - Backend setup details
- Frontend `/frontend/README.md` - Frontend setup details
