import { defineConfig } from 'vitest/config';

const config = defineConfig({
  test: {
    setupFiles: ['./setupVitest.ts'],
    environment: 'jsdom',
  },
});

export default config;
