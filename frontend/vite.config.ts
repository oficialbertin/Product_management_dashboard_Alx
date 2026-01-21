import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Ensure base path is correct for production
  server: {
    port: 5173,
    open: false,
    strictPort: true,
    host: '0.0.0.0', // Bind to all interfaces so external browsers can access
    fs: {
      strict: false,
    },
  },
  build: {
    assetsDir: 'assets',
    cssCodeSplit: false, // Ensure CSS is included in build
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
});

