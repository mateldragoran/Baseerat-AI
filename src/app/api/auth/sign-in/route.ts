import { NextResponse } from 'next/server';
import { failure, noStore, sameOrigin, success } from '@/server/http';
import { passwordSignIn } from '@/server/sign-in';
export async function POST(request: Request) {
  try {
    sameOrigin(request);
    const result = await passwordSignIn(await request.json());
    if (!result.ok) return NextResponse.json(result.error, { status: result.status, headers: noStore });
    return success({ signedIn: true });
  } catch (error) { return failure(error); }
}
