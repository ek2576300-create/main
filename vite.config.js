import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Mirrors the nginx location the production server proxies to
// server/mail-server.js, so `npm run dev` and `npm start` both talk to the
// lead backend the same way as the deployed site.
const mailApiProxy = {
  '/mail-api': {
    target: 'http://localhost:3020',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/mail-api/, '/api'),
  },
};

export default defineConfig({
  base: '/',
  server: {
    port: 5173,
    proxy: mailApiProxy,
  },
  preview: {
    proxy: mailApiProxy,
  },
  build: {
    outDir: '.output/public',
    emptyOutDir: true,
  },
  plugins: [react()],
});
