import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['gsap', '@gsap/react', '@studio-freight/lenis'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-helmet-async')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/gsap') || id.includes('node_modules/@gsap') || id.includes('node_modules/@studio-freight/lenis')) {
            return 'vendor-animation';
          }
        },
      },
    },
  },
})
