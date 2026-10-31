import 'server-only';
import { createClient } from '@supabase/supabase-js';
import { publicConfig } from './config';
import type { userDatabase } from './supabase';

export async function auditSignIn(db: Awaited<ReturnType<typeof userDatabase>>, requestId: string) {
  const { error } = await db.rpc('append_auth_event', { p_action: 'auth.sign_in', p_request_id: requestId });
  if (error) throw new Error('AUTH_AUDIT_UNAVAILABLE');
}

// Capture only a server-verified user's access JWT before logout clears the cookie client.
// This client has exactly one operation: append the now-revoked session's logout audit event.
// Live-session RLS prevents it from reading source/action/session data after logout.
export async function auditCompletedSignOut(accessToken: string, requestId: string) {
  const config = publicConfig();
  if (!config) throw new Error('AUTH_AUDIT_UNAVAILABLE');
  const auditOnly = createClient(config.url, config.key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    global: { headers: { Authorization: `Bearer ${accessToken}` } },
  });
  const { error } = await auditOnly.rpc('append_auth_event', { p_action: 'auth.sign_out', p_request_id: requestId });
  if (error) throw new Error('AUTH_AUDIT_UNAVAILABLE');
}
