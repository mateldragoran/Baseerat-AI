begin;
-- ON CONFLICT inference requires SELECT privileges; audit append intentionally has none.
-- Plain INSERT checks RLS first; swallow only this actor-bound lifecycle duplicate.
create or replace function public.append_auth_event(p_action text,p_request_id uuid) returns void
language plpgsql security invoker set search_path = '' as $$
declare
  conflict_constraint text;
  conflict_table text;
  conflict_schema text;
begin
  begin
    insert into private.audit_events(actor_id,action,target_id,request_id)
    values((select auth.uid()),p_action,nullif((select auth.jwt())->>'session_id','')::uuid,p_request_id);
  exception when unique_violation then
    get stacked diagnostics conflict_constraint=constraint_name, conflict_table=table_name, conflict_schema=schema_name;
    if conflict_constraint <> 'audit_events_action_target_id_key'
      or conflict_table <> 'audit_events' or conflict_schema <> 'private' then raise; end if;
  end;
end;
$$;
revoke all on function public.append_auth_event(text,uuid) from public,anon,authenticated;
grant execute on function public.append_auth_event(text,uuid) to authenticated;
commit;
