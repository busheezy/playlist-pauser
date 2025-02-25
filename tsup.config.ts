import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'dist',
  noExternal: ['@telemetrytv/sdk'],
  minify: true,
});
