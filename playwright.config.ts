import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/acceptance', fullyParallel: false,
  use: { baseURL: process.env.BASEERAT_ACCEPTANCE_URL || 'http://localhost:3000', trace: 'retain-on-failure' },
  reporter: 'list',
});
