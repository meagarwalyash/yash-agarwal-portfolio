import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'ensure-cindex-dist',
      closeBundle() {
        const cindexContent = fs.readFileSync(path.resolve(__dirname, 'cindex.html'), 'utf-8');
        const distDirPath = path.resolve(__dirname, 'dist');
        if (!fs.existsSync(distDirPath)) {
          fs.mkdirSync(distDirPath, { recursive: true });
        }
        fs.writeFileSync(path.resolve(distDirPath, 'index.html'), cindexContent, 'utf-8');
      },
    },
  ],
  publicDir: 'public',
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
