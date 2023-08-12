import { test , expect  } from '@playwright/test';

test.setTimeout(35e3);

test.beforeEach(async ({ page }) => {
  await page.goto('/');
  await page.waitForURL('**/');
});

test('shape post', async ({ page }) => {

  await page.goto('/shapeit');

  await page.waitForURL('**/shapeit');

  await page.locator('button:has-text("Shape it")').click();
  expect(page.locator('div#toast-error').isVisible());
  expect(page.locator('div#toast-error').isHidden());

  await page.locator('button:has-text("Add Shape")').click();
  expect(page.locator('div#toast-error').isVisible());
  expect(page.locator('div#toast-error').isHidden());

  await page.locator('input[name="red"]').check();
  await page.locator('button:has-text("Shape it")').click();
  expect(page.locator('div#toast-error').isVisible());
  expect(page.locator('div#toast-error').isHidden());

  await page.locator('input[name="small"]').check();
  await page.locator('button:has-text("Shape it")').click();
  expect(page.locator('div#toast-error').isVisible());
  expect(page.locator('div#toast-error').isHidden());

  await page.locator('input[name="circle"]').check();

  await page.locator('button:has-text("Shape it")').click();
  expect(page.locator('div#toast-error').isVisible());
  expect(page.locator('div#toast-error').isHidden());

  await page.locator('button:has-text("Add Shape")').click();
  expect(page.locator('div#toast-success').isVisible());
  expect(page.locator('div#toast-error').isHidden());

  await page.locator('button:has-text("Shape it")').click();
  expect(page.locator('div#toast-success').isVisible());
  expect(page.locator('div#toast-success').isHidden());
  await page.goto('/');
  await page.waitForURL('**/');
});
