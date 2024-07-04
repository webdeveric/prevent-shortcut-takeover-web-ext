import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: ['./setupVitest.ts'],
    coverage: {
      all: false,
      provider: 'v8',
    },
    environment: 'happy-dom',
  },
});
