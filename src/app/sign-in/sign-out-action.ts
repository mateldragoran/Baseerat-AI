'use server';

import { redirect } from 'next/navigation';
import { completeSignOut } from '@/server/sign-out';

export type SignOutState = { message: string };

export async function nativeSignOut(): Promise<SignOutState> {
  let auditRecorded: boolean;
  try { ({ auditRecorded } = await completeSignOut()); }
  catch { return { message: 'Unable to sign out. Check your connection and try again.' }; }
  // This GET performs no authentication mutation; it delivers the same browser
  // cache/storage-clearing headers as the JSON transport before the clean page.
  redirect(auditRecorded ? '/api/auth/sign-out/completed' : '/api/auth/sign-out/completed?notice=audit-unavailable');
}
