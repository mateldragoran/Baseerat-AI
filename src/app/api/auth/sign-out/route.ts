import { NextResponse } from 'next/server';
import { userDatabase } from '@/server/supabase';
import { failure, noStore, sameOrigin } from '@/server/http';
export async function POST(request: Request) {
  try {
    sameOrigin(request);
    const db = await userDatabase();
    const { error } = await db.auth.signOut({ scope: 'local' });
    if (error) throw error;
    return NextResponse.json({ data: { signedOut: true }, requestId: crypto.randomUUID(), meta: { schemaVersion: 1 } }, { headers: { ...noStore, 'Clear-Site-Data': '"cache", "storage"' } });
  } catch (error) { return failure(error); }
}
