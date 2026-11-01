import { NextResponse } from 'next/server';
import { failure, noStore, sameOrigin } from '@/server/http';
import { completeSignOut } from '@/server/sign-out';
export async function POST(request: Request) {
  try {
    sameOrigin(request);
    const { auditRecorded, requestId } = await completeSignOut();
    // Auth revocation already succeeded. An audit outage must not falsely report a live session.
    return NextResponse.json({ data: { signedOut: true, auditRecorded }, requestId, meta: { schemaVersion: 1, warnings: auditRecorded ? [] : ['Sign-out completed, but its audit record could not be saved. Contact your administrator.'] } }, { headers: { ...noStore, 'Clear-Site-Data': '"cache", "storage"' } });
  } catch (error) { return failure(error); }
}
