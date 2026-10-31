-- BAS-001 foundations. Ordinary requests use authenticated JWTs, never maintenance keys.
begin;
create schema if not exists private;
revoke all on schema private from public, anon, authenticated;
alter default privileges in schema public revoke all on tables from anon, authenticated;
alter default privileges in schema private revoke all on tables from public, anon, authenticated;
alter default privileges in schema public revoke execute on functions from public, anon, authenticated;
alter default privileges in schema private revoke execute on functions from public, anon, authenticated;

create table public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('presenter_admin','full_analyst','restricted_analyst','reviewer')),
  display_name text not null check (length(display_name) between 1 and 120),
  active boolean not null default true,
  persona_focus text not null default 'quality' check (persona_focus in ('quality','materials','leadership','governance','review')),
  workspace_epoch integer not null default 1 check (workspace_epoch > 0),
  created_at timestamptz not null default now()
);
create table private.datasets (
  id uuid primary key default gen_random_uuid(), generated_at timestamptz not null default now(),
  date_anchor date not null, generator_version text not null, manifest_hash text not null,
  origin text not null check (origin = 'synthetic'), active boolean not null default true
);
create unique index datasets_one_active on private.datasets (active) where active;
create table public.sources (
  id text primary key check (id in ('engineering','quality','maintenance','materials')),
  label text not null, availability text not null default 'available' check (availability in ('available','unavailable')),
  cached_available boolean not null default true, data_as_of timestamptz not null,
  last_sync_at timestamptz not null, last_error_code text
);
create table public.source_grants (
  user_id uuid not null references public.profiles(user_id) on delete cascade,
  source_id text not null references public.sources(id), granted_at timestamptz not null default now(),
  primary key(user_id,source_id)
);
create table public.action_grants (
  user_id uuid not null references public.profiles(user_id) on delete cascade,
  action text not null check (action in ('search','analyze','create_investigation','edit_own','share_own','comment','review','export','admin','reset_workspace')),
  primary key(user_id,action)
);
create table public.records (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('part_family','part_definition','part_revision','assembly','batch','physical_unit','inspection','nonconformance','maintenance_event','document','material','material_transaction','material_coverage','stock_snapshot')),
  display_id text not null, source_id text not null references public.sources(id),
  source_record_id text not null, current_version_id uuid,
  created_at timestamptz not null default now(), unique(source_id,kind,source_record_id)
);
create table public.record_versions (
  id uuid primary key default gen_random_uuid(), record_id uuid not null references public.records(id),
  dataset_id uuid not null references private.datasets(id), version_no integer not null check (version_no > 0),
  title text not null, event_at timestamptz, known_at timestamptz not null,
  revision_label text, data_as_of timestamptz not null,
  payload jsonb not null check (jsonb_typeof(payload) = 'object'), content_hash text not null,
  created_at timestamptz not null default now(), unique(record_id,version_no), unique(record_id,id)
);
alter table public.records add constraint records_current_version_fk
  foreign key (id,current_version_id) references public.record_versions(record_id,id) deferrable initially deferred;
create index records_source_kind_display on public.records(source_id,kind,display_id,id);
create index record_versions_dataset on public.record_versions(dataset_id);
create index record_versions_event on public.record_versions(event_at);
create index source_grants_source on public.source_grants(source_id,user_id);

-- Minimal owner-only session base moved into this foundation by orchestrator resolution.
-- Raw session prose is intentionally absent from the exposed public schema.
create table private.query_sessions (
  id uuid primary key default gen_random_uuid(), owner_id uuid not null references public.profiles(user_id),
  workspace_epoch integer not null check(workspace_epoch > 0), title text,
  explicit_context jsonb not null default '{}'::jsonb,
  reply_language text not null default 'auto' check(reply_language in ('auto','en','ur')),
  dependency_refs uuid[] not null default '{}',
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create index query_sessions_owner_epoch on private.query_sessions(owner_id,workspace_epoch,updated_at desc);

alter table public.profiles enable row level security;
alter table private.datasets enable row level security;
alter table public.sources enable row level security;
alter table public.source_grants enable row level security;
alter table public.action_grants enable row level security;
alter table public.records enable row level security;
alter table public.record_versions enable row level security;
alter table private.query_sessions enable row level security;

create policy profiles_self on public.profiles for select to authenticated using (user_id = (select auth.uid()));
create policy source_grants_self on public.source_grants for select to authenticated using (
  user_id = (select auth.uid()) and exists(select 1 from public.profiles p where p.user_id = (select auth.uid()) and p.active)
);
create policy action_grants_self on public.action_grants for select to authenticated using (
  user_id = (select auth.uid()) and exists(select 1 from public.profiles p where p.user_id = (select auth.uid()) and p.active)
);
create policy sources_granted on public.sources for select to authenticated using (
  exists(select 1 from public.source_grants g where g.user_id = (select auth.uid()) and g.source_id = sources.id)
);
create policy records_granted on public.records for select to authenticated using (
  exists(select 1 from public.source_grants g where g.user_id = (select auth.uid()) and g.source_id = records.source_id)
);
create policy versions_granted on public.record_versions for select to authenticated using (
  exists(select 1 from public.records r where r.id = record_versions.record_id)
);
create policy sessions_owner on private.query_sessions for select to authenticated using (
  owner_id = (select auth.uid()) and exists(select 1 from public.profiles p where p.user_id = (select auth.uid()) and p.active)
);
-- No ordinary writes in BAS-001; BAS-002 adds guarded session mutations.
revoke all on public.profiles, public.sources, public.source_grants, public.action_grants,
  public.records, public.record_versions from public, anon, authenticated;
grant select on public.profiles, public.sources, public.source_grants, public.action_grants,
  public.records, public.record_versions to authenticated;
revoke all on private.datasets, private.query_sessions from public, anon, authenticated;
grant usage on schema private to authenticated, service_role;
grant select on private.query_sessions to authenticated;
grant all on public.profiles, public.sources, public.source_grants, public.action_grants,
  public.records, public.record_versions, private.datasets, private.query_sessions to service_role;

create function private.reject_version_mutation() returns trigger language plpgsql set search_path = '' as $$
begin raise exception 'Record versions are immutable'; end;
$$;
revoke all on function private.reject_version_mutation() from public, anon, authenticated;
create trigger record_versions_immutable before update or delete on public.record_versions
  for each row execute function private.reject_version_mutation();

-- Private-by-default file buckets; later document/report tickets add narrow access paths.
insert into storage.buckets(id,name,public) values ('source-documents','source-documents',false),('reports','reports',false)
  on conflict(id) do nothing;
commit;
