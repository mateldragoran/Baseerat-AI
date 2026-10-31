import { expect, test } from '@playwright/test';

test('signed-out visitors cannot retrieve record data and can recover from invalid sign-in', async ({ page, request }) => {
  const response = await request.get('/api/records');
  expect(response.status()).toBe(401);
  expect(response.headers()['cache-control']).toContain('no-store');
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Sign in to your workspace' })).toBeVisible();
  await page.getByLabel('Email address').fill('invalid@example.com');
  await page.getByLabel('Password', { exact: true }).fill('invalid-password');
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  await expect(page.getByRole('alert')).toContainText('Check your email and password');
  await expect(page.getByLabel('Email address')).toHaveValue('invalid@example.com');
});

test('presenter and restricted accounts use separate sessions and source rights', async ({ browser }) => {
  test.skip(!process.env.BASEERAT_ACCOUNT_PASSWORD, 'Requires real provisioned acceptance accounts.');
  for (const profile of ['presenter', 'restricted']) {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('/sign-in');
    await page.getByLabel('Email address').fill(`${profile}@baseerat.example`);
    await page.getByLabel('Password', { exact: true }).fill(process.env.BASEERAT_ACCOUNT_PASSWORD!);
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Start with the evidence' })).toBeVisible();
    await page.getByRole('link', { name: /Open HA-204/ }).click();
    await expect(page.getByRole('heading', { name: 'Hydraulic actuator' })).toBeVisible();
    const denied = await page.request.get('/api/records/10000000-0000-4000-8000-000000000007?role=presenter_admin');
    expect(denied.status()).toBe(profile === 'restricted' ? 404 : 200);
    await page.getByRole('button', { name: 'Sign out' }).click();
    await expect(page.getByRole('heading', { name: 'Sign in to your workspace' })).toBeVisible();
    await page.goBack();
    await expect(page.getByRole('heading', { name: 'Sign in to your workspace' })).toBeVisible();
    await context.close();
  }
});
