import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    isolate: true,
    environment: 'node',
    setupFiles: ['./tests/setup.ts'],
    sequence: {
      concurrent: false,
    }
  },
});
