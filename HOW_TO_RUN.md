# How to Run the Project

Since Vite dev server has issues with external browsers, here are **TWO ways** to run the project:

## Option 1: Fixed Vite Dev Server (Recommended)

Vite is now configured to bind to `0.0.0.0` so external browsers can access it.

### Steps:
```powershell
# Kill any running processes
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force

# Start both backend and frontend
cd C:\xampp\htdocs\Product_management_alx
npm run dev
```

Wait for output:
```
[WEB]   ➜  Local:   http://localhost:5173/
[WEB]   ➜  Network: http://0.0.0.0:5173/
[API] API listening on port 4000
```

**Open in Chrome**: `http://localhost:5173/` or `http://127.0.0.1:5173/`

---

## Option 2: Build + Express Server (If Vite Still Doesn't Work)

This builds the frontend and serves it with Express - **guaranteed to work in any browser**.

### Steps:

**Terminal 1 - Backend:**
```powershell
cd C:\xampp\htdocs\Product_management_alx\backend
npm run dev
```

**Terminal 2 - Frontend (Build + Serve):**
```powershell
cd C:\xampp\htdocs\Product_management_alx\frontend
npm run start
```

Or use the root command:
```powershell
cd C:\xampp\htdocs\Product_management_alx
npm run dev:build
```

This will:
1. Build the frontend to production
2. Serve it on `http://localhost:3000`
3. Backend runs on `http://localhost:4000`

**Open in Chrome**: `http://localhost:3000`

---

## Option 3: Manual Build + Serve

If you prefer to build once and serve separately:

```powershell
# Build frontend
cd frontend
npm run build

# Serve (in same terminal or new one)
npm run serve
```

Then start backend separately:
```powershell
cd backend
npm run dev
```

---

## Troubleshooting

### Still seeing blank page?

1. **Check the URL**: Make sure you're using:
   - Option 1: `http://localhost:5173/`
   - Option 2: `http://localhost:3000/`
   - **NOT**: `http://localhost/Product_management_alx/...`

2. **Check backend is running**: Open `http://localhost:4000/health` in browser
   - Should show: `{"status":"ok"}`

3. **Check browser console** (F12):
   - Look for network errors
   - Check if files are loading (should see 200 status)

4. **Clear browser cache**: Ctrl+Shift+Delete

5. **Try different browser**: Edge, Firefox, etc.

---

## Which Option to Use?

- **Option 1**: For development with hot-reload (files update automatically)
- **Option 2**: If Option 1 doesn't work - stable, reliable
- **Option 3**: For testing production builds
