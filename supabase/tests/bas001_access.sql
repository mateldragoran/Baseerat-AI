-- Real PostgreSQL RLS/grant tests on isolated test/dev only. Entire fixture rolls back.
-- These do not establish real Auth sign-in or browser acceptance.
begin;
insert into auth.users(id,email) values
  ('90000000-0000-4000-8000-000000000001','policy-presenter@baseerat.example'),
  ('90000000-0000-4000-8000-000000000002','policy-analyst@baseerat.example'),
  ('90000000-0000-4000-8000-000000000003','policy-restricted@baseerat.example'),
  ('90000000-0000-4000-8000-000000000004','policy-reviewer@baseerat.example'),
  ('90000000-0000-4000-8000-000000000005','policy-inactive@baseerat.example');
insert into public.profiles(user_id,role,display_name,active) values
  ('90000000-0000-4000-8000-000000000001','presenter_admin','Policy presenter',true),
  ('90000000-0000-4000-8000-000000000002','full_analyst','Policy analyst',true),
  ('90000000-0000-4000-8000-000000000003','restricted_analyst','Policy restricted',true),
  ('90000000-0000-4000-8000-000000000004','reviewer','Policy reviewer',true),
  ('90000000-0000-4000-8000-000000000005','full_analyst','Policy inactive',false);
insert into public.source_grants(user_id,source_id)
select p.user_id,s.id from public.profiles p cross join public.sources s
where p.user_id::text like '90000000-%' and (p.role <> 'restricted_analyst' or s.id in ('engineering','quality'));
insert into public.action_grants(user_id,action)
select user_id,unnest(case role
 when 'presenter_admin' then array['search','analyze','create_investigation','edit_own','share_own','comment','review','export','admin','reset_workspace']
 when 'reviewer' then array['search','comment','review','export']
 else array['search','analyze','create_investigation','edit_own','share_own','comment','export'] end)
from public.profiles where user_id::text like '90000000-%';
insert into private.query_sessions(id,owner_id,workspace_epoch,title) values
  ('91000000-0000-4000-8000-000000000001','90000000-0000-4000-8000-000000000001',1,'Presenter private session'),
  ('91000000-0000-4000-8000-000000000002','90000000-0000-4000-8000-000000000002',1,'Analyst private session');

set local role authenticated;
select set_config('request.jwt.claims','{"sub":"90000000-0000-4000-8000-000000000001","role":"authenticated"}',true);
do $$ begin
 if (select count(*) from public.records) <> 8 or (select count(*) from public.sources) <> 4 then raise exception 'Presenter source matrix'; end if;
 if (select count(*) from public.action_grants) <> 10 then raise exception 'Presenter action matrix'; end if;
 if (select count(*) from public.profiles) <> 1 then raise exception 'Profile self visibility'; end if;
 if (select count(*) from private.query_sessions) <> 1 then raise exception 'Presenter cannot read another owner session'; end if;
 if exists(select 1 from private.query_sessions where id='91000000-0000-4000-8000-000000000002') then raise exception 'Presenter private session override'; end if;
 begin update public.profiles set role='presenter_admin'; raise exception 'Profile write allowed'; exception when insufficient_privilege then null; end;
 begin update public.records set display_id='forged'; raise exception 'Source write allowed'; exception when insufficient_privilege then null; end;
 begin insert into public.source_grants values ('90000000-0000-4000-8000-000000000001','engineering',now()); raise exception 'Grant write allowed'; exception when insufficient_privilege then null; end;
end $$;
select set_config('request.jwt.claims','{"sub":"90000000-0000-4000-8000-000000000002","role":"authenticated"}',true);
do $$ begin
 if (select count(*) from public.records) <> 8 or (select count(*) from public.sources) <> 4 then raise exception 'Full analyst source matrix'; end if;
 if (select count(*) from public.action_grants) <> 7 or exists(select 1 from public.action_grants where action in ('admin','review','reset_workspace')) then raise exception 'Full analyst action matrix'; end if;
 if (select count(*) from private.query_sessions) <> 1 or exists(select 1 from private.query_sessions where owner_id <> (select auth.uid())) then raise exception 'Analyst private session ownership'; end if;
end $$;
select set_config('request.jwt.claims','{"sub":"90000000-0000-4000-8000-000000000003","role":"authenticated","user_metadata":{"role":"presenter_admin"}}',true);
do $$ begin
 if (select count(*) from public.records) <> 6 or (select count(*) from public.sources) <> 2 then raise exception 'Restricted source matrix'; end if;
 if (select count(*) from public.record_versions) <> 6 then raise exception 'Restricted version matrix'; end if;
 if exists(select 1 from public.records where id='10000000-0000-4000-8000-000000000007') then raise exception 'Restricted direct record denial'; end if;
 if (select count(*) from public.action_grants) <> 7 then raise exception 'Restricted action matrix'; end if;
 if (select count(*) from private.query_sessions) <> 0 then raise exception 'Restricted private session denial'; end if;
end $$;
select set_config('request.jwt.claims','{"sub":"90000000-0000-4000-8000-000000000004","role":"authenticated"}',true);
do $$ begin
 if (select count(*) from public.records) <> 8 or (select count(*) from public.sources) <> 4 then raise exception 'Reviewer source matrix'; end if;
 if (select count(*) from public.action_grants) <> 4 or exists(select 1 from public.action_grants where action in ('analyze','create_investigation','edit_own','admin','share_own')) then raise exception 'Reviewer action matrix'; end if;
 if (select count(*) from private.query_sessions) <> 0 then raise exception 'Reviewer private session denial'; end if;
end $$;
select set_config('request.jwt.claims','{"sub":"90000000-0000-4000-8000-000000000005","role":"authenticated"}',true);
do $$ begin
 if (select count(*) from public.records) <> 0 or (select count(*) from public.source_grants) <> 0 or (select count(*) from public.action_grants) <> 0 then raise exception 'Inactive account source/action denial'; end if;
end $$;
reset role;
-- Live grant revocation applies to the very next statement; JWT claims do not grant access.
delete from public.source_grants where user_id='90000000-0000-4000-8000-000000000002' and source_id='maintenance';
set local role authenticated;
select set_config('request.jwt.claims','{"sub":"90000000-0000-4000-8000-000000000002","role":"authenticated"}',true);
do $$ begin if exists(select 1 from public.records where source_id='maintenance') then raise exception 'Live grant revocation failed'; end if; end $$;
reset role;
set local role anon;
do $$ begin
 begin perform * from public.records; raise exception 'Anonymous source access allowed'; exception when insufficient_privilege then null; end;
 begin perform * from private.query_sessions; raise exception 'Anonymous private access allowed'; exception when insufficient_privilege then null; end;
end $$;
reset role;
select 'PASS: four-profile source/action matrices, forged claims, live revocation, private session owner/cross-owner, inactive/anonymous/write denials; rolled back.' as result;
rollback;
