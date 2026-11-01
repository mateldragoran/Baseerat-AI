import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests/acceptance', fullyParallel: false,
  // Authentication journeys contain real passwords; keep credential-bearing traces off.
  use: { baseURL: process.env.BASEERAT_ACCEPTANCE_URL || 'http://localhost:3000', trace: 'off', screenshot: 'off', video: 'off' },
  reporter: 'list',
});
