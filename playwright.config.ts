import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  globalSetup: require.resolve('./src/app/e2e/utils/global-setup.ts'),
  testDir: './src/app/e2e/tests',
  timeout: 30000,
  retries: 0,
  use: {
    trace: 'on-first-retry',
    baseURL: 'http://localhost:4200',
    storageState: 'src/appe2e/auth.json',

  },
  projects: [
    {
      name: 'Chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'Firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'WebKit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
  testMatch: '**/*.e2e.spec.ts',
  testIgnore: [
    '**/node_modules/**', // Ignore node_modules directory
    // '**/*.spec.ts' // Ignore any .spec.ts files outside the e2e directory
  ],
});
