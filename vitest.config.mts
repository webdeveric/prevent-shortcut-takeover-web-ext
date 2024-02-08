import { defineConfig } from 'vitest/config';

const config = defineConfig({
  test: {
    setupFiles: ['./setupVitest.ts'],
    coverage: {
      all: false,
      provider: 'v8',
    },
    environment: 'jsdom',
  },
});

export default config;
