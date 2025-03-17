import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'public',
  noExternal: ['@telemetrytv/sdk'],
  minify: false,
});
