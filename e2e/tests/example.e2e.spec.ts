import { test, expect, Page, BrowserContext } from '@playwright/test';

const user_email = 'landrystest@serverless-solutions.com';
const user_password = 'Z*893493286616ak';

async function waitForInputFieldByType(page: Page, type: string, timeout = 60000) {
  try {
    console.log(`Trying to find input with type: ${type}`);
    await page.waitForSelector(`input[type="${type}"]`, { timeout });
    return type; // Return the type that was found
  } catch (error) {
    throw new Error(`Input field with type ${type} not found`);
  }
}

test('home page logout and login test', async ({ page, context }) => {
  // Start tracing
  await context.tracing.start({ screenshots: true, snapshots: true });

  // Step 1: Launch the browser and navigate to the base URL
  await page.goto('http://localhost:4200');

  // Step 2: Check if the page is on the home page or login page
  const isHomePage = await page.locator('text=home page works to logout the page please click logout button').isVisible();
  const isLoginPage = await page.locator('text=Login').isVisible();

  if (isHomePage) {
    // If on the home page, click the logout button
    await page.getByRole('button', { name: 'Logout' }).click();
    
    // Wait for a few seconds to ensure the page gets logged out
    await page.waitForTimeout(5000);
    
    // Verify redirection to the login page
    await expect(page).toHaveURL('http://localhost:4200/login');
    
    // Check if the login page elements are visible
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();

    // Click the login button
    await page.getByRole('button', { name: 'Login' }).click();

    // Wait for the login popup to appear
    const [newPage] = await Promise.all([
      context.waitForEvent('page'), // Listen for the new popup window
      page.getByRole('button', { name: 'Login' }).click()
    ]);

    // Handle Microsoft login in the new window
    const emailInputType = await waitForInputFieldByType(newPage, 'email');
    console.log(`Found email input type: ${emailInputType}`);

    // Enter email
    await newPage.locator(`input[type="${emailInputType}"]`).click();
    await newPage.locator(`input[type="${emailInputType}"]`).fill(user_email);
    console.log('Email filled');

    // Click "Next" and enter password
    await newPage.getByRole('button', { name: 'Next' }).click();
    
    const passwordInputType = await waitForInputFieldByType(newPage, 'password');
    console.log(`Found password input type: ${passwordInputType}`);

    await newPage.locator(`input[type="${passwordInputType}"]`).click();
    await newPage.locator(`input[type="${passwordInputType}"]`).fill(user_password);
    console.log('Password filled');

    // Click "Sign in"
    await newPage.getByRole('button', { name: 'Sign in' }).click();
    console.log('Sign in button clicked');

    // Click "Yes" to stay signed in
    await newPage.getByRole('button', { name: 'Yes' }).click();
    console.log('Yes button clicked');

    // Wait for navigation to complete back to the home page
    await page.waitForLoadState('load');
    console.log('Login completed, page loaded.');

    // Stop tracing and save the trace file
    await context.tracing.stop({ path: 'trace.zip' });

    console.log('Test completed after login.');
    return;
  }

  if (isLoginPage) {
    // If already on the login page, click the login button
    console.log('Already on the login page, clicking login button.');
    await page.getByRole('button', { name: 'Login' }).click();

    // Wait for the login popup to appear
    const [newPage] = await Promise.all([
      context.waitForEvent('page'), // Listen for the new popup window
      page.getByRole('button', { name: 'Login' }).click()
    ]);

    // Handle Microsoft login in the new window
    const emailInputType = await waitForInputFieldByType(newPage, 'email');
    console.log(`Found email input type: ${emailInputType}`);

    // Enter email
    await newPage.locator(`input[type="${emailInputType}"]`).click();
    await newPage.locator(`input[type="${emailInputType}"]`).fill(user_email);
    console.log('Email filled');

    // Click "Next" and enter password
    await newPage.getByRole('button', { name: 'Next' }).click();
    
    const passwordInputType = await waitForInputFieldByType(newPage, 'password');
    console.log(`Found password input type: ${passwordInputType}`);

    await newPage.locator(`input[type="${passwordInputType}"]`).click();
    await newPage.locator(`input[type="${passwordInputType}"]`).fill(user_password);
    console.log('Password filled');

    // Click "Sign in"
    await newPage.getByRole('button', { name: 'Sign in' }).click();
    console.log('Sign in button clicked');

    // Click "Yes" to stay signed in
    await newPage.getByRole('button', { name: 'Yes' }).click();
    console.log('Yes button clicked');

    // Wait for navigation to complete back to the home page
    await page.waitForLoadState('load');
    console.log('Login completed, page loaded.');

    // Stop tracing and save the trace file
    await context.tracing.stop({ path: 'e2e/trace.zip' });

    console.log('Test completed after login.');
    return;
  }

  console.log('The page is neither on the home page nor the login page. Test cannot proceed.');
});
