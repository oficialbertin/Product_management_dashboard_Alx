# Deployment Guide

## MongoDB Setup on Render

1. **Create MongoDB Database**:
   - Go to https://render.com
   - Create a new **MongoDB** database
   - Copy the **Internal Database URL** or **Connection String**

2. **Add Environment Variables to Backend Service**:
   - Go to your backend service settings on Render
   - Add Environment Variable:
     - Key: `MONGODB_URI`
     - Value: Your MongoDB connection string (e.g., `mongodb+srv://user:pass@cluster.mongodb.net/product_dashboard`)

## Frontend Environment Variables

1. **Add to Frontend Service** (if using environment variables):
   - Key: `VITE_API_URL`
   - Value: `https://product-dashboard-api-4492.onrender.com`

   **OR** update `frontend/.env` before building:
   ```env
   VITE_API_URL=https://product-dashboard-api-4492.onrender.com
   ```

## Backend Environment Variables

Required environment variables for backend:

```
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/product_dashboard
PORT=4000
```

## Render Configuration

### Backend Service:
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Root Directory**: `backend`

### Frontend Service (Static Site):
- **Build Command**: `cd frontend && npm install && npm run build`
- **Publish Directory**: `frontend/dist`
- **Root Directory**: `frontend`

## Notes

- MongoDB connection string format:
  - Atlas: `mongodb+srv://username:password@cluster.mongodb.net/dbname`
  - Local: `mongodb://localhost:27017/product_dashboard`

- The backend will automatically create collections in MongoDB when you first create a product.

- Health check endpoint: `/healthz` (for Render health checks)
