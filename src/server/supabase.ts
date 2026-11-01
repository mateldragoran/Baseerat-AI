import 'server-only';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { publicConfig } from './config';

// A fresh client and live verified identity for every request. Never a module singleton.
async function createUserDatabase(stageCookies: boolean) {
  const config = publicConfig();
  if (!config) throw new Error('CONFIGURATION_UNAVAILABLE');
  const jar = await cookies();
  const pendingCookies: Array<() => void> = [];
  const db = createServerClient(config.url, config.key, {
    cookieOptions: { httpOnly: true, sameSite: 'lax', secure: process.env.APP_ORIGIN?.startsWith('https://') ?? false },
    global: { fetch: (input, init) => fetch(input, { ...init, cache: 'no-store' }) },
    cookies: {
      getAll: () => jar.getAll(),
      setAll: values => {
        const apply = () => values.forEach(({ name, value, options }) => jar.set(name, value, options));
        if (stageCookies) { pendingCookies.push(apply); return; }
        try { apply(); }
        catch { /* Server Components cannot write; proxy refreshes cookies. */ }
      },
    },
  });
  return { db, commitCookies: () => pendingCookies.splice(0).forEach(apply => apply()) };
}

export async function userDatabase() { return (await createUserDatabase(false)).db; }

// Auth SDK clears local storage even on a provider logout error. Stage only that operation's
// cookie writes so a failed logout retains the verified session for a real, explicit retry.
export async function stagedLogoutDatabase() { return createUserDatabase(true); }
