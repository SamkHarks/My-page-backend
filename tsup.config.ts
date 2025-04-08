import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: true,
  outDir: 'dist',
  clean: true,
  sourcemap: true,
  treeshake: true,
  minify: process.env.NODE_ENV === 'production',
  target: 'esnext',
  esbuildOptions(options) {
    options.alias = {
      '@': './src',
    };
  },
});