import 'server-only';
import { NextResponse } from 'next/server';
import { AccessError } from './access';

export const noStore = { 'Cache-Control': 'private, no-store, max-age=0', Vary: 'Cookie' };
export function success(data: unknown) {
  return NextResponse.json({ data, requestId: crypto.randomUUID(), meta: { schemaVersion: 1, dataAsOf: new Date().toISOString(), warnings: [], nextCursor: null } }, { headers: noStore });
}
export function failure(error: unknown) {
  const known = error instanceof AccessError;
  const code = known ? error.code : 'UNAVAILABLE';
  const messages = { UNAUTHENTICATED: 'Sign in to continue.', NOT_FOUND: 'Record unavailable. Return to Explorer to choose an available record.', UNAVAILABLE: 'Unable to load workspace data. Try again, or contact your administrator.', FORBIDDEN: 'This action is unavailable for your account. Return to your workspace.' };
  return NextResponse.json({ code, message: messages[code], retryable: code === 'UNAVAILABLE', requestId: crypto.randomUUID() }, { status: known ? error.status : 503, headers: noStore });
}
export function sameOrigin(request: Request) {
  const origin = request.headers.get('origin');
  const expected = process.env.APP_ORIGIN || new URL(request.url).origin;
  if (!origin || origin !== expected) throw new AccessError('FORBIDDEN', 403);
}
