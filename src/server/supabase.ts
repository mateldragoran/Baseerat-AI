import 'server-only';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { publicConfig } from './config';

// A fresh client and live verified identity for every request. Never a module singleton.
export async function userDatabase() {
  const config = publicConfig();
  if (!config) throw new Error('CONFIGURATION_UNAVAILABLE');
  const jar = await cookies();
  return createServerClient(config.url, config.key, {
    cookieOptions: { httpOnly: true, sameSite: 'lax', secure: process.env.APP_ORIGIN?.startsWith('https://') ?? false },
    global: { fetch: (input, init) => fetch(input, { ...init, cache: 'no-store' }) },
    cookies: {
      getAll: () => jar.getAll(),
      setAll: values => {
        try { values.forEach(({ name, value, options }) => jar.set(name, value, options)); }
        catch { /* Server Components cannot write; proxy refreshes cookies. */ }
      },
    },
  });
}
