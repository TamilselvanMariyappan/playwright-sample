import { chromium, FullConfig, Page } from '@playwright/test';

const user_email = 'balajibalaji.tirupathi@toverto.com' || '';
const user_password = "Toverto@2023" || '';

const placeholders = ['someone@example.com', 'Email, phone, or Skype', 'Email address or phone number'];

async function waitForInputField(page: Page, placeholders: string[], timeout = 60000) {
  for (const placeholder of placeholders) {
    try {
      console.log(`Trying to find input with placeholder: ${placeholder}`);
      await page.waitForSelector(`input[placeholder="${placeholder}"]`, { timeout });
      return placeholder; // Return the placeholder that was found
    } catch (error) {
      console.log(`Input with placeholder ${placeholder} not found, trying next`);
    }
  }
  throw new Error('Input field with the expected placeholders not found');
}

async function globalSetup(config: FullConfig) {
  let browser;
  let context;
  let newWindow: Page;

  try {
    // Launch browser in headless mode
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext();

    // Start tracing
    await context.tracing.start({ screenshots: true, snapshots: true });

    const page = await context.newPage();

    const baseURL = config.projects[0].use.baseURL ?? '';
  
    // Navigate to the URL
    await page.goto(baseURL);
    console.log(`Navigated to ${baseURL}`);
  
    // Wait for the login button and click it
    const [newPage] = await Promise.all([
      context.waitForEvent('page'),
      page.getByRole('button', { name: 'Login' }).click()
    ]);
    console.log('Login button clicked and new window opened');
  
    newWindow = newPage;
    await newWindow.waitForLoadState('domcontentloaded');

    // Determine the input placeholder based on the environment
    const input_placeholder = await waitForInputField(newWindow, placeholders);
    console.log(`Found input placeholder: ${input_placeholder}`);
    
    // Wait for the input field to be visible and interact with it
    await newWindow.getByPlaceholder(input_placeholder).click();
    await newWindow.getByPlaceholder(input_placeholder).fill(user_email);
    console.log('Email filled');
  
    // Wait for the "Next" button and click it
    await newWindow.getByRole('button', { name: 'Next' }).click();
  
    // Wait for the password field to be visible and interact with it
    await newWindow.getByPlaceholder('Password').click();
    await newWindow.getByPlaceholder('Password').fill(user_password);
    console.log('Password filled');
  
    // Wait for the "Sign in" button and click it
    await newWindow.getByRole('button', { name: 'Sign in' }).click();
    console.log('Sign in button clicked');
  
    // Wait for the "Yes" button and click it
    await newWindow.getByRole('button', { name: 'Yes' }).click();
    console.log('Yes button clicked');
  
    // Wait for the page to fully load
    await newWindow.waitForLoadState('load');
    console.log('New window fully loaded');
  
    // Save the authentication state
    await context.storageState({ path: 'e2e/auth.json' });
    console.log('Authentication state saved');
  
    // Stop tracing and save the trace file
    await context.tracing.stop({ path: 'e2e/trace.zip' });
  
    // Close the browser
    await browser.close();
  } catch (err) {
    console.log('Error:', err);
    if (context) {
      // Stop tracing and save the trace file in case of error
      await context.tracing.stop({ path: 'e2e/trace.zip' });
    }
    if (browser) await browser.close(); // Ensure the browser is closed on error
    throw new Error('Invalid login!');
  }
}

export default globalSetup;
