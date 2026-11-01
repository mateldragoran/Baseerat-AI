import { expect, test } from '@playwright/test';

test('signed-out visitors cannot retrieve record data and can recover from invalid sign-in', async ({ page, request }) => {
  const response = await request.get('/api/records');
  expect(response.status()).toBe(401);
  expect(response.headers()['cache-control']).toContain('no-store');
  const csrf = await request.post('/api/auth/sign-out', { headers: { Origin: 'https://unrelated.example' }, data: { role: 'presenter_admin' } });
  expect(csrf.status()).toBe(403);
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Sign in to your workspace' })).toBeVisible();
  await page.getByLabel('Email address').fill('invalid@example.com');
  await page.getByLabel('Password', { exact: true }).fill('invalid-password');
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  await expect(page.getByRole('region', { name: 'Sign in to your workspace' }).getByRole('alert')).toContainText('Check your email and password');
  await expect(page.getByLabel('Email address')).toHaveValue('invalid@example.com');
});

test('lookup keeps visible link names and keyboard context while Back restores the prior view', async ({ browser }) => {
  test.skip(!process.env.BASEERAT_ACCOUNT_PASSWORD, 'Requires real provisioned acceptance accounts.');
  const context = await browser.newContext({ viewport: { width: 1024, height: 640 } });
  const page = await context.newPage();
  try {
    await page.goto('/sign-in');
    await page.getByLabel('Email address').fill('presenter@baseerat.example');
    await page.getByLabel('Password', { exact: true }).fill(process.env.BASEERAT_ACCOUNT_PASSWORD!);
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Start with the evidence' })).toBeVisible();
    await page.getByRole('link', { name: 'Explorer', exact: true }).focus();
    await page.keyboard.press('Enter');
    await expect(page.getByRole('heading', { name: 'Find the record behind the answer' })).toBeVisible();
    await expect.soft(page.getByRole('main')).toBeFocused({ timeout: 1000 });
    await expect.soft(page.locator('.brand-link')).toHaveAccessibleName(/Baseerat\s*AI\s*Engineering intelligence/, { timeout: 1000 });
    const record = page.locator('a[href="/records/10000000-0000-4000-8000-000000000001"]');
    await expect.soft(record).toHaveAccessibleName(/HA-204.*part definition.*Hydraulic actuator.*Engineering Registry.*Rev C/, { timeout: 1000 });
    await page.getByLabel('Record identifier').fill('HA-204');
    await page.getByLabel('Record identifier').press('Enter');
    await expect(page.getByRole('heading', { name: 'Matches for “HA-204”' })).toBeVisible();
    await expect.soft(page.getByRole('main')).toBeFocused({ timeout: 1000 });
    await record.focus();
    await page.evaluate(() => window.scrollTo(0, 200));
    const priorScroll = await page.evaluate(() => window.scrollY);
    expect(priorScroll).toBeGreaterThan(0);
    await page.keyboard.press('Enter');
    await expect(page.getByRole('heading', { name: 'Hydraulic actuator' })).toBeVisible();
    await expect.soft(page.getByRole('main')).toBeFocused({ timeout: 1000 });
    await page.goBack();
    await expect(page.getByRole('heading', { name: 'Matches for “HA-204”' })).toBeVisible();
    await expect(page.getByLabel('Record identifier')).toHaveValue('HA-204');
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(priorScroll);
    await expect.soft(page.getByRole('main')).not.toBeFocused();
  } finally {
    await page.request.post('/api/auth/sign-out', { headers: { Origin: new URL(page.url()).origin }, data: { requestKey: crypto.randomUUID() } }).catch(() => {});
    await context.close();
  }
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
    const authCookies = (await context.cookies()).filter(cookie => cookie.name.startsWith('sb-'));
    expect(authCookies.length).toBeGreaterThan(0);
    expect(authCookies.every(cookie => cookie.httpOnly && cookie.sameSite === 'Lax')).toBe(true);
    await page.getByRole('link', { name: 'Open HA-204', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Hydraulic actuator' })).toBeVisible();
    const denied = await page.request.get('/api/records/10000000-0000-4000-8000-000000000007?role=presenter_admin');
    expect(denied.status()).toBe(profile === 'restricted' ? 404 : 200);
    let logoutResult: unknown;
    // Observe the real upstream response before full navigation disposes its browser body.
    // Forward it unchanged; no fabricated authentication or logout result is supplied.
    await page.route('**/api/auth/sign-out', async route => {
      const upstream = await route.fetch();
      logoutResult = { status: upstream.status(), data: (await upstream.json()).data };
      await route.fulfill({ response: upstream });
    });
    await page.getByRole('button', { name: 'Sign out' }).click();
    await expect.poll(() => logoutResult).toEqual({ status: 200, data: { signedOut: true, auditRecorded: true } });
    await expect(page.getByRole('heading', { name: 'Sign in to your workspace' })).toBeVisible();
    expect((await page.request.get('/api/records')).status()).toBe(401);
    await page.goBack();
    await expect(page.getByRole('heading', { name: 'Sign in to your workspace' })).toBeVisible();
    await context.close();
  }
});
