import { spawn } from 'node:child_process';
import { setTimeout as delay } from 'node:timers/promises';
import { chromium } from 'playwright';

const BASE_URL = 'http://127.0.0.1:4173';
const OUTPUT_DIR = 'docs/wireframes';

function startDevServer() {
  return spawn('npm', ['run', 'dev', '--', '--host', '127.0.0.1', '--port', '4173'], {
    stdio: 'ignore'
  });
}

async function waitForServer(url, timeoutMs = 20000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return;
      }
    } catch (_error) {
      // Wait until dev server becomes reachable.
    }
    await delay(250);
  }
  throw new Error(`Timed out waiting for dev server at ${url}`);
}

async function capturePrototype() {
  const devServer = startDevServer();
  let browser;

  try {
    await waitForServer(BASE_URL);

    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    await context.addInitScript(() => {
      window.localStorage.clear();
    });
    const page = await context.newPage();

    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await page.screenshot({ path: `${OUTPUT_DIR}/welcome-screen.png`, fullPage: true });

    await page.getByRole('button', { name: 'Start onboarding' }).click();
    await page.waitForSelector('text=Choose your interests');
    await page.screenshot({ path: `${OUTPUT_DIR}/preferences-screen.png`, fullPage: true });

    await page.locator('text=Sci-Fi').first().click();
    await page.locator('text=Tech').first().click();
    await page.getByRole('button', { name: 'Continue' }).click();

    await page.waitForSelector('text=Import your books');
    await page.getByRole('button', { name: 'Use sample books' }).click();
    await page.waitForSelector('text=Imported: 5');
    await page.screenshot({ path: `${OUTPUT_DIR}/import-books-screen.png`, fullPage: true });

    await page.getByRole('button', { name: 'Continue' }).click();
    await page.waitForSelector('text=Preview recommendations');
    await page.waitForTimeout(500);
    await page.screenshot({ path: `${OUTPUT_DIR}/recommendations-screen.png`, fullPage: true });

    await page.getByRole('button', { name: 'Finish' }).click();
    await page.waitForSelector('text=Onboarding complete');
    await page.screenshot({ path: `${OUTPUT_DIR}/homepage-screen.png`, fullPage: true });

    await context.close();
  } finally {
    if (browser) {
      await browser.close();
    }
    devServer.kill('SIGTERM');
  }
}

capturePrototype().catch((error) => {
  console.error(error);
  process.exit(1);
});
