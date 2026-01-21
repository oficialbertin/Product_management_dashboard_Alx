# Product Management Dashboard

A modern full-stack product management system built  currency support, and flexible stock unit management.

## ✨ Features

- **Full CRUD Operations** - Create, Read, Update, and Delete products
- **Server & Client Validation** - Robust validation on both frontend and backend
- **Rwandan Francs (RWF)** - Currency formatting for Rwandan market
- **Stock Units** - Support for multiple units (pcs, kgs, liters, grams, boxes, bags, bottles)
- **Product Status** - Active/Archived status management
- **Real-time Statistics** - Live inventory value and stock totals
- **Modern UI** - Clean, responsive design

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Express
- **Database**: MongoDB (Mongoose)
- **Validation**: Joi (backend), TypeScript (frontend)

## Prerequisites

- Node.js (v16+)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## Quick Start

### 1. Database Setup

Ensure you have a MongoDB database available (local MongoDB or MongoDB Atlas).

The backend will connect using `MONGO_URI`.

### 2. Environment Setup

**Backend** (`backend/.env`):
```env
PORT=4000
MONGO_URI=mongodb://127.0.0.1:27017/product_dashboard
```

**Frontend** (`frontend/.env`):
```env
VITE_API_URL=http://localhost:4000
```

### 3. Install & Run

```bash
# Install all dependencies
npm install

# Start both backend and frontend (single command)
npm start
```

When it starts, check the terminal output and open the URL shown under **[WEB]**:
- **Frontend**: `http://localhost:5173/`
- **Backend API**: `http://localhost:4000`

## Run Options

### Option 1: Development mode (recommended)

Runs:
- Backend with `nodemon` (auto-restart on changes)
- Frontend with Vite (hot reload)

```bash
npm start
```

If `5173` is already in use, stop the old process (or use Option 2).

### Option 2: Stable mode (no Vite HMR) — works even when HMR/websocket is blocked

Builds the frontend and serves it with a simple Express static server.

```bash
npm run dev:build
```

Open:
- Frontend: `http://localhost:3000/`
- Backend: `http://localhost:4000/`

### Option 3: Run in two terminals (manual)

Terminal 1:
```bash
npm run dev --prefix backend
```

Terminal 2:
```bash
npm run dev --prefix frontend
```

## Project Structure

```
Product_management_alx/
├── backend/
│   ├── src/
│   │   ├── db.js              # Database connection
│   │   ├── server.js          # Express server
│   │   ├── routes/            # API routes
│   │   └── validation/        # Joi schemas
├── frontend/
│   ├── src/
│   │   ├── App.tsx            # Main component
│   │   ├── api.ts             # API client
│   │   ├── types.ts           # TypeScript types
│   │   └── style.css          # Styles
│   └── vite.config.ts         # Vite configuration
└── package.json               # Root scripts
```

## API Endpoints

- `GET /health` - Health check
- `GET /products` - Get all products
- `GET /products/:id` - Get single product
- `POST /products` - Create product
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product

## Validation Rules

**Backend (Joi)**:
- Name: 2-100 characters (required)
- Price: Positive number with 2 decimals (required)
- Stock: Non-negative integer (optional)
- Unit: pcs, kgs, liters, grams, boxes, bags, or bottles
- Status: active or archived

**Frontend**: Additional client-side validation for better UX

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Database connection error | Check `MONGO_URI` in `backend/.env` (local) or your deployment environment variables |
| Port already in use | Change `PORT` in `backend/.env` |
| Blank page / MIME error | Ensure you're accessing via Vite dev server URL, not XAMPP Apache URL |
| API not found | Verify `VITE_API_URL` in `frontend/.env` |

### Blank page / MIME type error (most common)

If you see errors like:
- `Failed to load module script ... MIME type of ""`

It usually means you are **not** opening the Vite dev server.

Use:
- ✅ `http://localhost:5173/` (or whatever port Vite prints)

Avoid:
- ❌ `http://localhost/Product_management_alx/...` (this is XAMPP Apache)
- ❌ `file:///C:/.../frontend/index.html` (opening file directly)

### Ports / old Node processes

If ports keep being “already in use”, stop old Node processes and start again:

```powershell
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
```

Then:
```powershell
npm start
```

### Quick health check

Open this in your browser:
- `http://localhost:4000/health`

Expected response:
- `{"status":"ok"}`

## 📄 License

MIT

## 👨‍💻 Author

Bertin - Product Management Dashboard ALX Project
