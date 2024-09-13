import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    include: ['./src/**/*.test.js'],
    testTimeout: 40_000
    // hookTimeout: 140_000
  }
});
