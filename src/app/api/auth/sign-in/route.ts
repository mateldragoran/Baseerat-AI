import { NextResponse } from 'next/server';
import { signInSchema } from '@/shared/contracts';
import { userDatabase } from '@/server/supabase';
import { failure, noStore, sameOrigin, success } from '@/server/http';
import { resolveActor } from '@/server/access';
import { auditSignIn } from '@/server/auth-audit';
export async function POST(request: Request) {
  try {
    sameOrigin(request);
    const parsed = signInSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ code: 'INVALID_INPUT', message: 'Enter your email address and password.', retryable: false, requestId: crypto.randomUUID(), fieldErrors: parsed.error.flatten().fieldErrors }, { status: 400, headers: noStore });
    const db = await userDatabase();
    const { error } = await db.auth.signInWithPassword(parsed.data);
    if (error) return NextResponse.json({ code: 'UNAUTHENTICATED', message: error.status === 429 ? 'Too many sign-in attempts. Wait a moment and try again.' : 'Unable to sign in. Check your email and password, then try again.', retryable: true, requestId: crypto.randomUUID() }, { status: error.status === 429 ? 429 : 401, headers: noStore });
    try { await resolveActor(); await auditSignIn(db, crypto.randomUUID()); }
    catch (error) { await db.auth.signOut(); throw error; }
    return success({ signedIn: true });
  } catch (error) { return failure(error); }
}
