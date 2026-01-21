# Quick Start Commands

## First Time Setup

### 1. Database Setup
```bash
# Using MySQL CLI (XAMPP MySQL is usually at: C:\xampp\mysql\bin\mysql.exe)
mysql -u root -p < backend/db/init.sql

# OR paste the SQL from backend/db/init.sql into phpMyAdmin SQL tab
```

### 2. Backend Configuration
```bash
cd backend
copy env.example .env
# Then edit .env and set your MySQL credentials
```

### 3. Frontend Configuration
```bash
cd frontend
copy env.example .env
# Edit .env if your API runs on different URL
```

### 4. Install All Dependencies
```bash
# From project root
npm install

# Backend dependencies
cd backend
npm install

# Frontend dependencies
cd ../frontend
npm install
```

## Starting the Application

### Start Everything (Recommended)
```bash
# From project root directory
npm run dev
```

This starts:
- Backend API: http://localhost:4000
- Frontend: http://localhost:5173

### Start Separately

**Backend only:**
```bash
cd backend
npm run dev
```

**Frontend only:**
```bash
cd frontend
npm run dev
```

## Database Migration (if you already have old database)

If you have an existing database without the `unit` column:
```bash
mysql -u root -p < backend/db/migration_add_unit.sql
```

## Verification

1. Check backend health: Open http://localhost:4000/health (should show `{"status":"ok"}`)
2. Check frontend: Open http://localhost:5173 (should show the dashboard)

## Troubleshooting

- **Port 4000 already in use**: Change `PORT` in `backend/.env`
- **Database connection error**: Verify MySQL credentials in `backend/.env`
- **Frontend can't connect**: Check `VITE_API_URL` in `frontend/.env`

