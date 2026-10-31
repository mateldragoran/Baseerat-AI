import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const secret = process.env.SUPABASE_SECRET_KEY;
if (!url || !secret) throw new Error('Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY in the maintenance environment.');
const db = createClient(url, secret, { auth: { persistSession: false, autoRefreshToken: false } });
const profiles = [
  { name: 'presenter', role: 'presenter_admin', display: 'Ayesha Khan', focus: 'quality', sources: ['engineering','quality','maintenance','materials'], actions: ['search','analyze','create_investigation','edit_own','share_own','comment','review','export','admin','reset_workspace'] },
  { name: 'analyst', role: 'full_analyst', display: 'Omar Farooq', focus: 'quality', sources: ['engineering','quality','maintenance','materials'], actions: ['search','analyze','create_investigation','edit_own','share_own','comment','export'] },
  { name: 'restricted', role: 'restricted_analyst', display: 'Sara Ahmed', focus: 'quality', sources: ['engineering','quality'], actions: ['search','analyze','create_investigation','edit_own','share_own','comment','export'] },
  { name: 'reviewer', role: 'reviewer', display: 'Bilal Hassan', focus: 'review', sources: ['engineering','quality','maintenance','materials'], actions: ['search','comment','review','export'] },
];
const check = ({ error, data }) => { if (error) throw new Error(`Provisioning failed (${error.code || 'provider_error'}). Inspect the maintenance provider securely.`); return data; };
// Bounded account scan: never log authentication secrets or full provider errors.
const users = [];
for (let page = 1; page <= 100; page++) {
  const result = check(await db.auth.admin.listUsers({ page, perPage: 100 }));
  users.push(...result.users);
  if (result.users.length < 100) break;
  if (page === 100) throw new Error('Account lookup exceeded maintenance limit.');
}
for (const profile of profiles) {
  const email = `${profile.name}@baseerat.example`;
  const password = process.env[`BASEERAT_${profile.name.toUpperCase()}_PASSWORD`] || process.env.BASEERAT_ACCOUNT_PASSWORD;
  let user = users.find(candidate => candidate.email === email);
  if (!user) {
    if (!password || password.length < 16) throw new Error(`Set a password of at least 16 characters for ${profile.name}.`);
    user = check(await db.auth.admin.createUser({ email, password, email_confirm: true })).user;
  }
  check(await db.from('profiles').upsert({ user_id: user.id, role: profile.role, display_name: profile.display, active: true, persona_focus: profile.focus }));
  check(await db.from('source_grants').delete().eq('user_id',user.id));
  check(await db.from('action_grants').delete().eq('user_id',user.id));
  check(await db.from('source_grants').insert(profile.sources.map(source => ({ user_id: user.id, source_id: source }))));
  check(await db.from('action_grants').insert(profile.actions.map(action => ({ user_id: user.id, action }))));
  console.log(`${email}: ${profile.role} provisioned. Existing passwords and workspace epochs preserved.`);
}
