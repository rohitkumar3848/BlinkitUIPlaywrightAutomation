import { Page, TestInfo } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const SCREENSHOT_DIR = path.resolve(process.cwd(), 'Screenshots');

// clean folder once
if (fs.existsSync(SCREENSHOT_DIR)) {
  fs.rmSync(SCREENSHOT_DIR, { recursive: true, force: true });
}
fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

export async function takeScreenshot(
  page: Page,
  testInfo: TestInfo,
  stepName: string
) {
  const filePath = path.join(
    SCREENSHOT_DIR,
    `${Date.now()}-${stepName}.png`
  );

  await page.screenshot({ path: filePath, fullPage: true });

  //attach to Playwright report
  await testInfo.attach(stepName, {
    path: filePath,
    contentType: 'image/png',
  });
}
