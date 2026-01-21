import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
    strictPort: false,
    host: '0.0.0.0', // Bind to all interfaces so external browsers can access
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 24678,
    },
    fs: {
      strict: false,
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
});

