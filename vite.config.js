import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/bni/',
  plugins: [react()],
  server: {
    port: 3000,
    open: false
  },
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) {
              return 'vendor';
            }
            if (id.includes('lucide-react')) {
              return 'icons';
            }
          }
        }
      }
    }
  }
});
