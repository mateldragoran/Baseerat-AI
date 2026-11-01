import { NextResponse } from 'next/server';
import { noStore } from '@/server/http';

// A header-only completion bridge after the native POST has revoked the session.
// It never signs out an account, changes grants, or accepts a redirect target.
export function GET(request: Request) {
  const notice = new URL(request.url).searchParams.get('notice');
  const destination = notice === 'audit-unavailable' ? '/sign-in?notice=audit-unavailable' : '/sign-in';
  return new NextResponse(null, { status: 303, headers: { ...noStore, Location: destination, 'Clear-Site-Data': '"cache", "storage"' } });
}
