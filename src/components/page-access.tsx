import { redirect } from 'next/navigation';
import { AccessError, resolveActor } from '@/server/access';
import { publicConfig } from '@/server/config';
export async function pageActor() {
  if (!publicConfig()) redirect('/sign-in');
  try { return (await resolveActor()).actor; }
  catch (error) { if (error instanceof AccessError && error.code === 'UNAUTHENTICATED') redirect('/sign-in'); throw error; }
}
