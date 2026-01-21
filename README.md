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
- **Database**: MySQL
- **Validation**: Joi (backend), TypeScript (frontend)

## 📋 Prerequisites

- Node.js (v16+)
- MySQL (XAMPP or standalone)
- npm or yarn

## 🚀 Quick Start

### 1. Database Setup

Run this SQL in MySQL (phpMyAdmin or CLI):

```sql
CREATE DATABASE IF NOT EXISTS product_dashboard;
USE product_dashboard;

CREATE TABLE IF NOT EXISTS products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(255) DEFAULT '',
  price DECIMAL(10, 2) NOT NULL,
  stock INT NOT NULL DEFAULT 0,
  unit VARCHAR(20) NOT NULL DEFAULT 'pcs',
  status VARCHAR(20) NOT NULL DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

Or use the SQL file:
```bash
mysql -u root -p < backend/db/init.sql
```

### 2. Environment Setup

**Backend** (`backend/.env`):
```env
PORT=4000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=""
DB_NAME=product_dashboard
```

**Frontend** (`frontend/.env`):
```env
VITE_API_URL=http://localhost:4000
```

### 3. Install & Run

```bash
# Install all dependencies
npm install

# Start both backend and frontend
npm run dev
```

The app will automatically open at:
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:4000

## 📁 Project Structure

```
Product_management_alx/
├── backend/
│   ├── src/
│   │   ├── db.js              # Database connection
│   │   ├── server.js          # Express server
│   │   ├── routes/            # API routes
│   │   └── validation/        # Joi schemas
│   └── db/                    # SQL scripts
├── frontend/
│   ├── src/
│   │   ├── App.tsx            # Main component
│   │   ├── api.ts             # API client
│   │   ├── types.ts           # TypeScript types
│   │   └── style.css          # Styles
│   └── vite.config.ts         # Vite configuration
└── package.json               # Root scripts
```

## 🔌 API Endpoints

- `GET /health` - Health check
- `GET /products` - Get all products
- `GET /products/:id` - Get single product
- `POST /products` - Create product
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product

## 📝 Validation Rules

**Backend (Joi)**:
- Name: 2-100 characters (required)
- Price: Positive number with 2 decimals (required)
- Stock: Non-negative integer (optional)
- Unit: pcs, kgs, liters, grams, boxes, bags, or bottles
- Status: active or archived

**Frontend**: Additional client-side validation for better UX

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Database connection error | Check MySQL credentials in `backend/.env` |
| Port already in use | Change `PORT` in `backend/.env` |
| Blank page / MIME error | Ensure you're accessing via dev server, not opening HTML directly |
| API not found | Verify `VITE_API_URL` in `frontend/.env` |

## 📄 License

MIT

## 👨‍💻 Author

Bertin - Product Management Dashboard ALX Project
