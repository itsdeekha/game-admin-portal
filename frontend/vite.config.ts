import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],

      exclude: [
        'node_modules/',
        'src/**/*.test.{ts,tsx}',
        'src/**/*.spec.{ts,tsx}',
        'src/**/index.{ts,tsx}', // ← Exclude all index files
        'src/index.{ts,tsx}', // ← Exclude root index
        '**/index.ts', // ← Alternative pattern
        '**/index.tsx', // ← Alternative pattern
      ],

      include: ['src/**/*.{ts,tsx}'],
    },
  },
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: true,
    cssMinify: true,
    reportCompressedSize: true,
    rollupOptions: {
      external: [
        '**/__tests__/**/*',
        '**/*.test.ts',
        '**/*.test.tsx',
        '**/*.spec.ts',
        '**/*.spec.tsx',
        '**/*.fixture.ts',
        '**/*.fixtures.json',
        '**/test/**/*',
        '**/tests/**/*',
        'src/test/**/*',
      ],
    },
  },
  resolve: {
    alias: {
      '~': resolve(__dirname, './src'),
    },
  },
});
