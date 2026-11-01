import { expect, test } from '@playwright/test';

test('sign-in without JavaScript posts credentials and returns a recoverable error without a credential URL', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  try {
    await page.goto('/sign-in');
    await page.getByLabel('Email address').fill('invalid@example.com');
    await page.getByLabel('Password', { exact: true }).fill('invalid-password');
    const submitted = page.waitForRequest(request => request.isNavigationRequest() && request.frame() === page.mainFrame());
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();
    const request = await submitted;
    expect(request.method()).toBe('POST');
    expect(new URL(request.url()).search).toBe('');
    await expect(page.getByRole('region', { name: 'Sign in to your workspace' }).getByRole('alert')).toContainText('Check your email and password');
    expect(new URL(page.url()).search).toBe('');
    await expect(page.getByLabel('Email address')).toHaveValue('invalid@example.com');
    await expect(page.getByLabel('Password', { exact: true })).toHaveValue('');
    expect((await page.request.get('/api/records')).status()).toBe(401);
  } finally {
    await context.close();
  }
});

test('enhanced link and identifier search keep truthful feedback until real results arrive', async ({ browser }) => {
  test.skip(!process.env.BASEERAT_ACCOUNT_PASSWORD, 'Requires real provisioned acceptance accounts.');
  const context = await browser.newContext();
  const page = await context.newPage();
  let releaseLink: () => void = () => {};
  let releaseSearch: () => void = () => {};
  const linkHeld = new Promise<void>(resolve => { releaseLink = resolve; });
  const searchHeld = new Promise<void>(resolve => { releaseSearch = resolve; });
  try {
    await page.goto('/sign-in');
    expect((await page.locator('form.sign-in-form').getAttribute('method'))?.toLowerCase()).toBe('post');
    await page.getByLabel('Email address').fill('analyst@baseerat.example');
    await page.getByLabel('Password', { exact: true }).fill(process.env.BASEERAT_ACCOUNT_PASSWORD!);
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Start with the evidence' })).toBeVisible();
    // Hold actual requests; responses are never fabricated. This makes the
    // observable pending state deterministic without changing source/provider data.
    await page.route('**/explorer*', async route => {
      const query = new URL(route.request().url()).searchParams.get('q');
      await (query === 'HA-204' ? searchHeld : linkHeld);
      await route.continue();
    });
    await page.getByRole('link', { name: 'Explorer', exact: true }).click();
    await expect(page.locator('.navigation-pending').filter({ hasText: 'Loading your workspace…' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Start with the evidence' })).toBeVisible();
    releaseLink();
    await expect(page.getByRole('heading', { name: 'Find the record behind the answer' })).toBeVisible();
    await page.getByLabel('Record identifier').fill('HA-204');
    await page.getByRole('button', { name: 'Find records', exact: true }).click();
    await expect(page.getByRole('button', { name: 'Find records · Searching…', exact: true })).toBeDisabled();
    releaseSearch();
    await expect(page.getByRole('heading', { name: 'Matches for “HA-204”' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Find records', exact: true })).toBeEnabled();
  } finally {
    releaseLink(); releaseSearch();
    await page.request.post('/api/auth/sign-out', { headers: { Origin: new URL(page.url()).origin }, data: { requestKey: crypto.randomUUID() } }).catch(() => {});
    await context.close();
  }
});

test('sign-in before application JavaScript arrives still posts and renders its error', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  let releaseScripts: () => void = () => {};
  const scriptsHeld = new Promise<void>(resolve => { releaseScripts = resolve; });
  let held = 0;
  await page.route('**/_next/static/**/*.js', async route => {
    held += 1;
    await scriptsHeld;
    await route.abort();
  });
  try {
    await page.goto('/sign-in', { waitUntil: 'commit' });
    await page.getByLabel('Email address').fill('invalid@example.com');
    await page.getByLabel('Password', { exact: true }).fill('invalid-password');
    expect(held).toBeGreaterThan(0);
    const submitted = page.waitForRequest(request => request.isNavigationRequest() && request.frame() === page.mainFrame());
    await page.getByRole('button', { name: 'Sign in', exact: true }).click({ noWaitAfter: true });
    const request = await submitted;
    expect(request.method()).toBe('POST');
    expect(new URL(request.url()).search).toBe('');
    await expect(page.getByRole('region', { name: 'Sign in to your workspace' }).getByRole('alert')).toContainText('Check your email and password');
    expect(new URL(page.url()).search).toBe('');
    await expect(page.getByLabel('Email address')).toHaveValue('invalid@example.com');
  } finally {
    releaseScripts();
    await context.close();
  }
});

test('a native failed sign-in can recover with a real account after safe POST is proven', async ({ browser }) => {
  test.skip(!process.env.BASEERAT_ACCOUNT_PASSWORD, 'Requires real provisioned acceptance accounts.');
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  try {
    await page.goto('/sign-in');
    // Prove this actual native transport with invalid fixtures before introducing
    // a real password. A missing POST method fails here without a real credential.
    expect((await page.locator('form.sign-in-form').getAttribute('method'))?.toLowerCase()).toBe('post');
    await page.getByLabel('Email address').fill('invalid@example.com');
    await page.getByLabel('Password', { exact: true }).fill('invalid-password');
    const submitted = page.waitForRequest(request => request.isNavigationRequest() && request.frame() === page.mainFrame());
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();
    expect((await submitted).method()).toBe('POST');
    await expect(page.getByRole('region', { name: 'Sign in to your workspace' }).getByRole('alert')).toContainText('Check your email and password');
    expect(new URL(page.url()).search).toBe('');
    expect((await page.locator('form.sign-in-form').getAttribute('method'))?.toLowerCase()).toBe('post');
    await page.getByLabel('Email address').fill('reviewer@baseerat.example');
    await page.getByLabel('Password', { exact: true }).fill(process.env.BASEERAT_ACCOUNT_PASSWORD!);
    await page.getByRole('button', { name: 'Sign in', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Start with the evidence' })).toBeVisible();
    expect(new URL(page.url()).pathname).toBe('/');
    expect(new URL(page.url()).search).toBe('');
    expect((await page.request.get('/api/auth/context')).status()).toBe(200);
    await page.getByRole('link', { name: 'Open HA-204', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Hydraulic actuator' })).toBeVisible();
    await page.getByRole('link', { name: 'Explorer', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Find the record behind the answer' })).toBeVisible();
    await page.getByLabel('Record identifier').fill('HA-204');
    await page.getByRole('button', { name: 'Find records', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Matches for “HA-204”' })).toBeVisible();
    let nativeLogoutPosts = 0;
    let clearSiteData = '';
    page.on('request', request => { if (request.isNavigationRequest() && request.method() === 'POST') nativeLogoutPosts += 1; });
    page.on('response', response => { if (new URL(response.url()).pathname === '/api/auth/sign-out/completed') clearSiteData = response.headers()['clear-site-data'] || ''; });
    await page.getByRole('button', { name: 'Sign out', exact: true }).click();
    await expect(page.getByRole('heading', { name: 'Sign in to your workspace' })).toBeVisible();
    expect(nativeLogoutPosts).toBe(1);
    expect(clearSiteData).toContain('"cache"');
    expect(clearSiteData).toContain('"storage"');
    expect((await page.request.get('/api/records')).status()).toBe(401);
    await page.goBack();
    await expect(page.getByRole('heading', { name: 'Sign in to your workspace' })).toBeVisible();
    expect((await page.request.get('/api/records')).status()).toBe(401);
  } finally {
    await page.request.post('/api/auth/sign-out', { headers: { Origin: new URL(page.url()).origin }, data: { requestKey: crypto.randomUUID() } }).catch(() => {});
    await context.close();
  }
});
