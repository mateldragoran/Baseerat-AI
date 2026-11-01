'use server';

import { redirect } from 'next/navigation';
import { passwordSignIn } from '@/server/sign-in';

export type SignInState = { email: string; message: string };

// Next validates the Server Action's Origin against its host and accepts POST
// only. The permalink keeps pre-hydration/no-JavaScript submissions on this page.
export async function nativeSignIn(_previous: SignInState, form: FormData): Promise<SignInState> {
  const email = typeof form.get('email') === 'string' ? String(form.get('email')).trim().slice(0, 254) : '';
  try {
    const result = await passwordSignIn({ email, password: form.get('password') });
    if (!result.ok) return { email, message: result.error.message };
  } catch {
    return { email, message: 'Unable to sign in. Try again, or contact your administrator.' };
  }
  // Outside the catch: redirect throws a framework control signal. The password
  // is never returned in action state, HTML, cookies, a redirect, or a URL.
  redirect('/');
}
