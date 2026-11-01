import { NextResponse } from 'next/server';
import { stagedLogoutDatabase, userDatabase } from '@/server/supabase';
import { failure, noStore, sameOrigin } from '@/server/http';
import { auditCompletedSignOut } from '@/server/auth-audit';
export async function POST(request: Request) {
  try {
    sameOrigin(request);
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
    // Auth revocation already succeeded. An audit outage must not falsely report a live session.
    return NextResponse.json({ data: { signedOut: true, auditRecorded }, requestId, meta: { schemaVersion: 1, warnings: auditRecorded ? [] : ['Sign-out completed, but its audit record could not be saved. Contact your administrator.'] } }, { headers: { ...noStore, 'Clear-Site-Data': '"cache", "storage"' } });
  } catch (error) { return failure(error); }
}
