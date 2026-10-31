import 'server-only';
import { actorSchema, type Actor } from '@/shared/contracts';
import { userDatabase } from './supabase';

export class AccessError extends Error {
  constructor(public code: 'UNAUTHENTICATED' | 'NOT_FOUND' | 'UNAVAILABLE' | 'FORBIDDEN', public status: number) { super(code); }
}

export async function resolveActor(): Promise<{ actor: Actor; db: Awaited<ReturnType<typeof userDatabase>> }> {
  const db = await userDatabase();
  // getUser consults Auth, including server-side session revocation.
  const { data: { user }, error } = await db.auth.getUser();
  if (error || !user) throw new AccessError('UNAUTHENTICATED', 401);
  const [profileResult, sourceResult, actionsResult] = await Promise.all([
    db.from('profiles').select('display_name,role,active,persona_focus,workspace_epoch').eq('user_id', user.id).single(),
    db.from('source_grants').select('source_id,sources(id,label)').eq('user_id', user.id),
    db.from('action_grants').select('action').eq('user_id', user.id),
  ]);
  if (profileResult.error || sourceResult.error || actionsResult.error) throw new AccessError('UNAVAILABLE', 503);
  const profile = profileResult.data;
  if (!profile?.active) throw new AccessError('UNAUTHENTICATED', 401);
  const sources = sourceResult.data.map(row => row.sources).flat().filter(Boolean);
  const actor = actorSchema.parse({ id: user.id, displayName: profile.display_name, role: profile.role,
    personaFocus: profile.persona_focus, workspaceEpoch: profile.workspace_epoch,
    sources, actions: actionsResult.data.map(row => row.action),
  });
  return { actor, db };
}

export function authorizeAction(actor: Actor, action: Actor['actions'][number]) {
  if (!actor.actions.includes(action)) throw new AccessError('FORBIDDEN', 403);
}
