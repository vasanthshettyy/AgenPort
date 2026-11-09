import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function inlineCssPlugin() {
  return {
    name: 'inline-css-plugin',
    apply: 'build',
    enforce: 'post',
    generateBundle(options, bundle) {
      let cssCode = '';
      const cssFiles = [];
      for (const [fileName, asset] of Object.entries(bundle)) {
        if (fileName.endsWith('.css') && asset.type === 'asset') {
          cssCode += asset.source;
          cssFiles.push(fileName);
        }
      }
      
      const htmlAsset = bundle['index.html'];
      if (htmlAsset && cssCode) {
        let html = typeof htmlAsset.source === 'string' ? htmlAsset.source : htmlAsset.source.toString();
        for (const cssFile of cssFiles) {
          const linkRegex = new RegExp(`<link[^>]*href="[^"]*${cssFile}"[^>]*>`, 'g');
          html = html.replace(linkRegex, '');
          delete bundle[cssFile];
        }
        html = html.replace('</head>', `<style>${cssCode}</style></head>`);
        htmlAsset.source = html;
      }
    }
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), inlineCssPlugin()],
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
