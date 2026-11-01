import 'server-only';
import { stagedLogoutDatabase, userDatabase } from './supabase';
import { auditCompletedSignOut } from './auth-audit';

// Both transports verify this request's live identity and revoke only its own
// session. Provider failure leaves staged cookie writes unapplied for retry.
export async function completeSignOut() {
  const db = await userDatabase();
  const { data: { user }, error: userError } = await db.auth.getUser();
  const { data: { session } } = await db.auth.getSession();
  if (userError || !user || !session) throw new Error('SESSION_UNAVAILABLE');
  const accessToken = session.access_token;
  const logout = await stagedLogoutDatabase();
  const { error } = await logout.db.auth.signOut({ scope: 'local' });
  if (error) throw error;
  logout.commitCookies();
  const requestId = crypto.randomUUID();
  let auditRecorded = true;
  try { await auditCompletedSignOut(accessToken, requestId); }
  catch { auditRecorded = false; }
  return { signedOut: true as const, auditRecorded, requestId };
}
