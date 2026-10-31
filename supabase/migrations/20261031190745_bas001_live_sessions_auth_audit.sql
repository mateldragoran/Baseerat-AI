begin;
-- The only privileged lookup: signed JWT identity -> that same user's session state.
-- No caller-supplied actor/session IDs and no source/prose access are accepted here.
create function private.own_session_state() returns text
language plpgsql stable security definer set search_path = '' as $$
declare
  actor uuid := (select auth.uid());
  session uuid := nullif((select auth.jwt())->>'session_id','')::uuid;
  expires_at timestamptz;
begin
  if actor is null or session is null then return 'invalid'; end if;
  select s.not_after into expires_at from auth.sessions s where s.id=session and s.user_id=actor;
  if not found then return 'revoked'; end if;
  if expires_at is not null and expires_at <= now() then return 'expired'; end if;
  return 'active';
end;
$$;
revoke all on function private.own_session_state() from public,anon,authenticated;
grant execute on function private.own_session_state() to authenticated;
comment on function private.own_session_state() is 'Narrow own-session revocation check. Authenticated JWT sub/session_id only; no arbitrary lookup.';

alter policy source_grants_self on public.source_grants using (
  user_id=(select auth.uid()) and (select private.own_session_state())='active'
  and exists(select 1 from public.profiles p where p.user_id=(select auth.uid()) and p.active)
);
alter policy action_grants_self on public.action_grants using (
  user_id=(select auth.uid()) and (select private.own_session_state())='active'
  and exists(select 1 from public.profiles p where p.user_id=(select auth.uid()) and p.active)
);
alter policy sessions_owner on private.query_sessions using (
  owner_id=(select auth.uid()) and (select private.own_session_state())='active'
  and exists(select 1 from public.profiles p where p.user_id=(select auth.uid()) and p.active)
);

create table private.audit_events (
  id uuid primary key default gen_random_uuid(),
  actor_id uuid not null references public.profiles(user_id),
  action text not null check(action in ('auth.sign_in','auth.sign_out')),
  target_kind text not null default 'auth_session' check(target_kind='auth_session'),
  target_id uuid not null,
  outcome text not null default 'succeeded' check(outcome='succeeded'),
  request_id uuid not null,
  safe_metadata jsonb not null default '{}'::jsonb check(safe_metadata='{}'::jsonb),
  created_at timestamptz not null default now(),
  unique(action,target_id)
);
create index audit_events_actor_created on private.audit_events(actor_id,created_at desc);
alter table private.audit_events enable row level security;
revoke all on private.audit_events from public,anon,authenticated;
grant insert on private.audit_events to authenticated;
grant select,insert on private.audit_events to service_role;
create policy append_own_auth_event on private.audit_events for insert to authenticated with check (
  actor_id=(select auth.uid())
  and target_id=nullif((select auth.jwt())->>'session_id','')::uuid
  and target_kind='auth_session' and outcome='succeeded'
  and safe_metadata='{}'::jsonb and created_at=now()
  and (
    (action='auth.sign_in' and (select private.own_session_state())='active'
      and exists(select 1 from public.profiles p where p.user_id=(select auth.uid()) and p.active))
    or (action='auth.sign_out' and (select private.own_session_state())='revoked'
      and exists(select 1 from public.profiles p where p.user_id=(select auth.uid())))
  )
);
create function public.append_auth_event(p_action text,p_request_id uuid) returns void
language plpgsql security invoker set search_path = '' as $$
begin
  insert into private.audit_events(actor_id,action,target_id,request_id)
  values((select auth.uid()),p_action,nullif((select auth.jwt())->>'session_id','')::uuid,p_request_id)
  on conflict(action,target_id) do nothing;
end;
$$;
revoke all on function public.append_auth_event(text,uuid) from public,anon,authenticated;
grant execute on function public.append_auth_event(text,uuid) to authenticated;
commit;
