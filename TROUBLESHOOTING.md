# Troubleshooting Blank Page Issue

## The Problem
You see a blank page with this error:
```
Failed to load module script: Expected a JavaScript-or-Wasm module script but the server responded with a MIME type of ""
```

## Root Cause
You're **NOT accessing the Vite dev server**. You're either:
1. Opening the HTML file directly (file://)
2. Accessing through XAMPP Apache (http://localhost/Product_management_alx/...)
3. Using wrong URL

## Solution

### Step 1: Kill All Node Processes
```powershell
# Stop all node processes
Get-Process node | Stop-Process -Force
```

### Step 2: Start Fresh
```powershell
cd C:\xampp\htdocs\Product_management_alx
npm run dev
```

### Step 3: Copy the EXACT URL from Terminal
When you see:
```
➜  Local:   http://localhost:5174/
```

**Copy that EXACT URL** and paste it in Chrome:
- ✅ http://localhost:5174/
- ❌ http://localhost/Product_management_alx/frontend/
- ❌ file:///C:/xampp/htdocs/...
- ❌ http://localhost:4000 (that's the API, not frontend)

### Step 4: Clear Browser Cache
1. Open Chrome DevTools (F12)
2. Right-click the refresh button
3. Select "Empty Cache and Hard Reload"

### Step 5: Disable Browser Extensions Temporarily
The errors mentioning "academia" and Vue suggest extensions might be interfering. Try:
- Open Chrome in Incognito mode (Ctrl+Shift+N)
- Or disable all extensions temporarily

## Verify It's Working

1. Open http://localhost:5174/ (or whatever port Vite shows)
2. Open DevTools (F12) → Network tab
3. Refresh the page
4. Look for files like:
   - `/src/main.tsx` - should have status 200, type `application/javascript`
   - `/src/api.ts` - should have status 200, type `application/javascript`

If these show status 200 and correct MIME types, Vite is working!

## Still Not Working?

### Check Vite is Actually Running
```powershell
# Check if port 5173 or 5174 is in use
netstat -ano | findstr :5173
netstat -ano | findstr :5174
```

### Test Vite Directly
```powershell
cd frontend
npm run dev
# Should show: ➜  Local:   http://localhost:5173/ (or 5174)
# Open that EXACT URL
```

### Alternative: Use Production Build
```powershell
cd frontend
npm run build
npm run preview
# Then open the URL shown (usually http://localhost:4173/)
```
