# How to Start the Project

## ⚠️ CRITICAL: Use the CORRECT URL

When you run `npm run dev`, you MUST use the URL shown in the terminal output.

### ✅ CORRECT:
- `http://localhost:5173/` (or 5174 if 5173 is busy)
- This is shown in terminal as: `➜  Local:   http://localhost:5174/`

### ❌ WRONG (These will show blank page):
- `http://localhost/Product_management_alx/frontend/` ← XAMPP Apache
- `file:///C:/xampp/htdocs/...` ← Opening HTML file directly
- `http://localhost:4000` ← That's the API backend, not frontend

## Steps to Run

### 1. Kill any running Node processes
```powershell
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force
```

### 2. Start the project
```powershell
cd C:\xampp\htdocs\Product_management_alx
npm run dev
```

### 3. Wait for output like this:
```
[WEB]   ➜  Local:   http://localhost:5174/
[API] API listening on port 4000
```

### 4. Copy the EXACT URL from [WEB] section
It will be: `http://localhost:5174/` (or similar)

### 5. Open in Chrome
- Paste that URL in Chrome address bar
- OR just click it if your terminal supports it

### 6. If you see blank page:
1. Open Chrome DevTools (F12)
2. Go to Network tab
3. Refresh the page
4. Check if files like `/src/main.tsx` load with status 200
5. If they show errors, you're accessing wrong URL

## Still Having Issues?

Try this step-by-step:

### Test Frontend Only
```powershell
cd frontend
npm run dev
```
Then open the URL shown (should be http://localhost:5173/)

### Clear Browser Cache
1. Press Ctrl+Shift+Delete
2. Select "Cached images and files"
3. Clear data
4. Restart Chrome

### Disable Browser Extensions
The errors mentioning "academia" suggest extensions might interfere:
1. Open Chrome in Incognito (Ctrl+Shift+N)
2. Try accessing the URL there

### Check Console Errors
1. Open DevTools (F12)
2. Go to Console tab
3. Look for the FIRST error (ignore "academia" and Vue errors - those are from extensions)
4. The real error will mention your app files like `api.ts` or `main.tsx`
