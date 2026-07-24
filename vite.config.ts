import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-cindex-to-dist',
      closeBundle() {
        const cindexContent = fs.readFileSync(path.resolve(__dirname, 'cindex.html'), 'utf-8');
        const distDirPath = path.resolve(__dirname, 'dist');
        if (!fs.existsSync(distDirPath)) {
          fs.mkdirSync(distDirPath, { recursive: true });
        }
        fs.writeFileSync(path.resolve(distDirPath, 'index.html'), cindexContent, 'utf-8');
        
        // Copy assets to dist root
        ['no godfather cover.png', 'yashdp.png'].forEach((file) => {
          const srcPath = path.resolve(__dirname, file);
          if (fs.existsSync(srcPath)) {
            fs.copyFileSync(srcPath, path.resolve(distDirPath, file));
          }
        });
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    emptyOutDir: true,
  },
});
