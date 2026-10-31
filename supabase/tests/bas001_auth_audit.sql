-- Isolated hosted/local DB policy seam; signed claims are deterministic SQL fixtures,
-- distinct from real Auth/browser acceptance. All fixture and event effects roll back.
begin;
insert into auth.users(id,email) values
 ('93000000-0000-4000-8000-000000000001','audit-presenter@baseerat.example'),
 ('93000000-0000-4000-8000-000000000002','audit-analyst@baseerat.example');
insert into public.profiles(user_id,role,display_name) values
 ('93000000-0000-4000-8000-000000000001','presenter_admin','Audit presenter'),
 ('93000000-0000-4000-8000-000000000002','full_analyst','Audit analyst');
insert into auth.sessions(id,user_id,created_at,updated_at) values
 ('94000000-0000-4000-8000-000000000001','93000000-0000-4000-8000-000000000001',now(),now()),
 ('94000000-0000-4000-8000-000000000002','93000000-0000-4000-8000-000000000002',now(),now());
set local role authenticated;
select set_config('request.jwt.claims','{"sub":"93000000-0000-4000-8000-000000000001","session_id":"94000000-0000-4000-8000-000000000001","role":"authenticated"}',true);
select public.append_auth_event('auth.sign_in','95000000-0000-4000-8000-000000000001');
-- Retrying cannot create a second sign-in event for the same real session.
select public.append_auth_event('auth.sign_in','95000000-0000-4000-8000-000000000002');
do $$ begin
 begin perform public.append_auth_event('auth.sign_out','95000000-0000-4000-8000-000000000003'); raise exception 'Premature logout audit accepted'; exception when insufficient_privilege then null; end;
 begin insert into private.audit_events(actor_id,action,target_id,request_id) values('93000000-0000-4000-8000-000000000002','auth.sign_in','94000000-0000-4000-8000-000000000002',gen_random_uuid()); raise exception 'Cross-actor audit accepted'; exception when insufficient_privilege then null; end;
 begin perform * from private.audit_events; raise exception 'Presenter raw audit read accepted'; exception when insufficient_privilege then null; end;
 begin update private.audit_events set outcome='succeeded'; raise exception 'Audit update accepted'; exception when insufficient_privilege then null; end;
 begin delete from private.audit_events; raise exception 'Audit delete accepted'; exception when insufficient_privilege then null; end;
end $$;
reset role;
delete from auth.sessions where id='94000000-0000-4000-8000-000000000001';
set local role authenticated;
select set_config('request.jwt.claims','{"sub":"93000000-0000-4000-8000-000000000001","session_id":"94000000-0000-4000-8000-000000000001","role":"authenticated"}',true);
select public.append_auth_event('auth.sign_out','95000000-0000-4000-8000-000000000004');
select public.append_auth_event('auth.sign_out','95000000-0000-4000-8000-000000000005');
-- Expired/deleted sign-in cannot be recorded as successful.
do $$ begin
 begin perform public.append_auth_event('auth.sign_in',gen_random_uuid()); raise exception 'Revoked session sign-in audit accepted'; exception when insufficient_privilege then null; end;
end $$;
reset role;
do $$ begin
 if (select count(*) from private.audit_events where actor_id='93000000-0000-4000-8000-000000000001') <> 2 then raise exception 'Auth lifecycle retry duplicated events'; end if;
 if exists(select 1 from private.audit_events where actor_id='93000000-0000-4000-8000-000000000002') then raise exception 'Cross-actor event persisted'; end if;
 if exists(select 1 from private.audit_events where actor_id='93000000-0000-4000-8000-000000000001' and safe_metadata<>'{}'::jsonb) then raise exception 'Unsafe audit metadata'; end if;
end $$;
set local role anon;
do $$ begin
 begin perform public.append_auth_event('auth.sign_in',gen_random_uuid()); raise exception 'Anonymous audit append accepted'; exception when insufficient_privilege then null; end;
end $$;
reset role;
select 'PASS: truthful own lifecycle audit, duplicate suppression, cross-actor/admin read/update/delete/anonymous denials; rolled back.' as result;
rollback;
