import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page, context }) => {
  // Go to the home page
  await page.goto('http://localhost:4200/home');

  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForTimeout(2000); // Wait for 2 seconds to ensure the login process completes
});

test('home page logout test', async ({ page }) => {
  // Verify that the <p> element with the specified text is visible
  await expect(page.locator('p')).toHaveText('home page works to logout the page please click logout button');
  
  // Click the logout button
  await page.getByRole('button', { name: 'Logout' }).click();
  
  // Verify redirection to the login page
  await expect(page).toHaveURL('http://localhost:4200/login');
  
  // Optionally, you can add checks to verify that the login page elements are visible
  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
});
