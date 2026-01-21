# Product Management Dashboard

A full-stack product management dashboard built with React, Node.js, and MySQL. Features CRUD operations, server-side validation, and currency support for Rwandan Francs (RWF).

## Features

- ✅ Complete CRUD operations (Create, Read, Update, Delete)
- ✅ Server-side validation using Joi
- ✅ Client-side validation
- ✅ Currency in Rwandan Francs (RWF)
- ✅ Stock units (pcs, kgs, liters, grams, boxes, bags, bottles)
- ✅ Product status management (active/archived)
- ✅ Real-time inventory statistics
- ✅ Modern, responsive UI

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Express
- **Database**: MySQL
- **Validation**: Joi

## Prerequisites

- Node.js (v16 or higher) and npm
- MySQL server (XAMPP or standalone MySQL)
- Git (for version control)

## Setup Instructions

### 1. Database Setup

Create the database and tables by running this SQL in MySQL (phpMyAdmin or MySQL CLI):

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

**OR** use the SQL file:
```bash
# Using MySQL CLI (adjust credentials as needed)
mysql -u root -p < backend/db/init.sql
```

**If you already have the database without the `unit` field**, run:
```bash
mysql -u root -p < backend/db/migration_add_unit.sql
```

### 2. Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```bash
   # Windows PowerShell
   copy env.example .env
   
   # Or manually create .env with:
   ```

4. Edit `backend/.env` file with your MySQL credentials:
   ```env
   PORT=4000
   DB_HOST=localhost
   DB_PORT=3306
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=product_dashboard
   ```

### 3. Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```bash
   # Windows PowerShell
   copy env.example .env
   
   # Or manually create .env with:
   ```

4. Edit `frontend/.env` file:
   ```env
   VITE_API_URL=http://localhost:4000
   ```
   (Only change if your backend runs on a different port/URL)

## Starting the Application

### Option 1: Run Everything Together (Recommended)

From the project root directory:

```bash
# Install root dependencies (concurrently)
npm install

# Start both backend and frontend
npm run dev
```

This will start:
- **Backend API**: http://localhost:4000
- **Frontend**: http://localhost:5173

### Option 2: Run Separately

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## API Endpoints

- `GET /health` - Health check
- `GET /products` - Get all products
- `GET /products/:id` - Get a single product
- `POST /products` - Create a product
- `PUT /products/:id` - Update a product
- `DELETE /products/:id` - Delete a product

## Project Structure

```
Product_management_alx/
├── backend/
│   ├── src/
│   │   ├── db.js              # MySQL connection pool
│   │   ├── server.js          # Express server
│   │   ├── routes/
│   │   │   └── products.js    # Product routes
│   │   └── validation/
│   │       └── productValidation.js  # Joi schemas
│   ├── db/
│   │   ├── init.sql           # Database schema
│   │   └── migration_add_unit.sql  # Migration script
│   ├── .env                   # Backend environment variables
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.tsx            # Main React component
│   │   ├── api.ts             # API client functions
│   │   ├── types.ts           # TypeScript types
│   │   └── style.css          # Styles
│   ├── .env                   # Frontend environment variables
│   └── package.json
├── package.json               # Root package.json (for concurrently)
└── README.md
```

## Validation

- **Backend**: Uses Joi for server-side validation
  - Name: 2-100 characters (required)
  - Description: Max 255 characters (optional)
  - Price: Positive number with 2 decimals (required)
  - Stock: Non-negative integer (optional, default: 0)
  - Unit: One of: pcs, kgs, liters, grams, boxes, bags, bottles (default: pcs)
  - Status: active or archived (default: active)

- **Frontend**: Additional client-side checks for better UX

## Notes

- CORS is enabled on the backend to allow frontend requests
- The database uses timestamps for `created_at` and `updated_at`
- Stock units help track inventory in different measurement types
- Currency is formatted as Rwandan Francs (RWF)

## Troubleshooting

1. **Database connection errors**: Check your `.env` file credentials and ensure MySQL is running
2. **Port already in use**: Change the `PORT` in `backend/.env` or kill the process using that port
3. **API not found**: Verify `VITE_API_URL` in `frontend/.env` matches your backend URL
4. **Missing unit column**: Run the migration script: `mysql -u root -p < backend/db/migration_add_unit.sql`

