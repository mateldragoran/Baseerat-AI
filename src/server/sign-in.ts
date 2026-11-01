import 'server-only';
import { signInSchema } from '@/shared/contracts';
import { userDatabase } from './supabase';
import { resolveActor } from './access';
import { auditSignIn } from './auth-audit';

// Shared by the JSON API and the progressively enhanced native form. Neither
// transport can skip active-profile verification or the successful sign-in audit.
export async function passwordSignIn(input: unknown) {
  const parsed = signInSchema.safeParse(input);
  if (!parsed.success) return { ok: false as const, status: 400, error: { code: 'INVALID_INPUT', message: 'Enter your email address and password.', retryable: false, requestId: crypto.randomUUID(), fieldErrors: parsed.error.flatten().fieldErrors } };
  const db = await userDatabase();
  const { error } = await db.auth.signInWithPassword(parsed.data);
  if (error) return { ok: false as const, status: error.status === 429 ? 429 : 401, error: { code: 'UNAUTHENTICATED', message: error.status === 429 ? 'Too many sign-in attempts. Wait a moment and try again.' : 'Unable to sign in. Check your email and password, then try again.', retryable: true, requestId: crypto.randomUUID() } };
  try { await resolveActor(); await auditSignIn(db, crypto.randomUUID()); }
  catch (error) { await db.auth.signOut({ scope: 'local' }); throw error; }
  return { ok: true as const };
}
