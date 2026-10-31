-- Orchestrator verification against isolated exlhtyyxlytrlpsnrwvo only.
-- Run after bas001_integrity; every attempted change rolls back.
begin;
set constraints all immediate;
do $$
declare rejected boolean;
begin
  rejected := false;
  begin
    update public.record_versions set title='Changed' where id='20000000-0000-4000-8000-000000000001';
  exception when raise_exception then
    if sqlerrm <> 'Record versions are immutable' then raise; end if;
    rejected := true;
  end;
  if not rejected then raise exception 'FAIL: version update accepted'; end if;

  rejected := false;
  begin
    update public.records set current_version_id=null where id='10000000-0000-4000-8000-000000000001';
  exception when raise_exception then
    if sqlerrm <> 'A source record requires a current version' then raise; end if;
    rejected := true;
  end;
  if not rejected then raise exception 'FAIL: committed version pointer may be null'; end if;

  rejected := false;
  begin
    update public.records set current_version_id='20000000-0000-4000-8000-000000000002' where id='10000000-0000-4000-8000-000000000001';
  exception when foreign_key_violation then rejected := true;
  end;
  if not rejected then raise exception 'FAIL: cross-record version pointer accepted'; end if;

  rejected := false;
  begin
    insert into public.record_versions(id,record_id,dataset_id,version_no,title,event_at,known_at,revision_label,data_as_of,payload,content_hash)
    select gen_random_uuid(),record_id,dataset_id,2,title,event_at,known_at,revision_label,data_as_of,payload-'family_id',content_hash
    from public.record_versions where id='20000000-0000-4000-8000-000000000001';
  exception when raise_exception then
    if sqlerrm <> 'Source payload does not match its kind' then raise; end if;
    rejected := true;
  end;
  if not rejected then raise exception 'FAIL: incomplete payload accepted'; end if;

  rejected := false;
  begin
    insert into public.record_versions(id,record_id,dataset_id,version_no,title,event_at,known_at,revision_label,data_as_of,payload,content_hash)
    select gen_random_uuid(),record_id,dataset_id,2,title,event_at,known_at,revision_label,data_as_of,
      jsonb_set(payload,'{family_id}','"10000000-0000-4000-8000-000000000008"'::jsonb),content_hash
    from public.record_versions where id='20000000-0000-4000-8000-000000000001';
  exception when raise_exception then
    if sqlerrm <> 'Invalid typed source reference' then raise; end if;
    rejected := true;
  end;
  if not rejected then raise exception 'FAIL: wrong-kind source reference accepted'; end if;

  if exists(
    select 1 from private.datasets d where d.manifest_hash <> (
      select encode(sha256(convert_to(string_agg(v.record_id::text||':'||v.id::text||':'||v.content_hash,E'\n' order by v.record_id,v.id),'UTF8')),'hex')
      from public.record_versions v where v.dataset_id=d.id
    )
  ) then raise exception 'FAIL: dataset manifest fingerprint differs'; end if;
end $$;
rollback;
select 'PASS: immutable versions, required/same-record current pointer, typed payload/reference rejection and manifest fingerprint; all attempted changes rolled back' as result;
