import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/',
  server: {
    port: 5173,
    proxy: {
      // Mirrors the nginx location the production server proxies to
      // server/mail-server.js, so `npm run dev` + `npm run mail-server`
      // work the same way as the deployed site.
      '/mail-api': {
        target: 'http://localhost:3020',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/mail-api/, '/api'),
      },
    },
  },
  build: {
    outDir: '.output/public',
    emptyOutDir: true,
  },
  plugins: [react()],
});
