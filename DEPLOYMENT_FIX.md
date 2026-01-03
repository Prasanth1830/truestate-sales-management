# Deployment Fix for TruEstate Sales Management System

## Problem
The application was returning 404 errors in production because:
1. Frontend API calls were hardcoded to `http://localhost:5000/api`
2. In production, the backend won't be at localhost
3. No environment configuration system was in place

## Solution Applied

### 1. Updated API Service (`frontend/src/services/api.js`)
- Changed from hardcoded localhost URL to dynamic URL detection
- Uses environment variables (`VITE_API_URL`) for production
- Falls back to same-origin API calls in production
- Maintains localhost:5000 for local development

### 2. Updated Vite Config (`frontend/vite.config.js`)
- Added build configuration for production
- Proper output directory setup

### 3. Added Environment Configuration
- Created `.env.example` file
- Developers can create `.env.local` for custom URLs

## How to Use

### Local Development (No changes needed)
```bash
cd frontend && npm run dev
cd backend && npm run dev
# Frontend will proxy to http://localhost:5000/api
```

### Production Deployment

#### Option A: Backend on Same Domain (Recommended)
1. Build frontend: `npm run build`
2. Deploy frontend files from `dist/` folder
3. Serve backend on same domain under `/api` path
4. Frontend will automatically use `/api` endpoint

#### Option B: Backend on Different Domain
1. Create `.env.local` in frontend folder:
   ```
   VITE_API_URL=https://api.yourdomain.com/api
   ```
2. Build: `npm run build`
3. Deploy frontend
4. Frontend will use the specified API URL

#### Option C: Docker Deployment
```dockerfile
# Build stage
FROM node:16-alpine as build
WORKDIR /app
COPY frontend . 
RUN npm install && npm run build

# Server stage
FROM node:16-alpine
WORKDIR /app
COPY backend .
RUN npm install --production

# Copy built frontend to serve from backend
COPY --from=build /app/dist ./public

EXPOSE 5000
CMD ["npm", "start"]
```

## Testing the Fix

1. **Local**: Start both backend and frontend, verify data loads
2. **Production**: Check browser console (F12) for any 404 errors in Network tab
3. **API Calls**: Verify API endpoint in Network tab matches your deployment URL

## Key Changes Summary
| File | Change |
|------|--------|
| `frontend/src/services/api.js` | Dynamic API URL detection |
| `frontend/vite.config.js` | Added build configuration |
| `.env.example` | Environment variable template |

## Environment Variable Reference
- `VITE_API_URL`: Override API base URL in production (optional)
  - Not set: Uses same domain as frontend
  - Set: Uses the provided URL
