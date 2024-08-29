import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'e2e/tests',  // Points to your test folder
  timeout: 30000,
  retries: 0,
  use: {
    trace: 'on-first-retry',
    baseURL: 'http://localhost:4200',
    headless: false,  // Enable headless mode
  },
  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  testIgnore: [
    '**/node_modules/**', // Ignore node_modules directory
  ],
});
