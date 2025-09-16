import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, type PluginOption } from 'vite';
import checker from 'vite-plugin-checker';
import viteCompression from 'vite-plugin-compression';
import Inspect from 'vite-plugin-inspect';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    checker({
      typescript: true,
      biome: {
        command: 'check',
      },
    }),
    viteCompression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
    Inspect(),
  ],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      format: {
        comments: false,
      },
    },
    rollupOptions: {
      plugins: [
        visualizer({
          filename: 'dist/stats.html',
          open: true,
        }) as PluginOption,
      ],
    },
  },
});
