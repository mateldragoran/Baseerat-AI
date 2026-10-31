begin;
create index records_current_version_covering on public.records(id,current_version_id);
-- Fingerprint UTF-8 lines record_id:version_id:content_hash, sorted by both UUIDs.
update private.datasets d set manifest_hash = (
 select encode(sha256(convert_to(string_agg(v.record_id::text || ':' || v.id::text || ':' || v.content_hash, E'\n' order by v.record_id,v.id),'UTF8')),'hex')
 from public.record_versions v where v.dataset_id=d.id
);

-- Runtime contracts and database checks cover the same eight implemented record kinds.
-- Later catalogue tickets extend both together with canonical relation constraints.
create function private.validate_source_version() returns trigger language plpgsql set search_path = '' as $$
declare
  record_kind text;
  record_source text;
  expected_source text;
  required_keys text[];
  key text;
  target_kind text;
begin
  select kind,source_id into record_kind,record_source from public.records where id = new.record_id;
  case record_kind
    when 'part_family' then required_keys := array['family_code','description']; expected_source := 'engineering';
    when 'part_definition' then required_keys := array['family_id','description','lifecycle_status','canonical_unit']; expected_source := 'engineering';
    when 'part_revision' then required_keys := array['part_id','label','effective_from','effective_to']; expected_source := 'engineering';
    when 'batch' then required_keys := array['part_revision_id','started_on','completed_on','production_quantity']; expected_source := 'quality';
    when 'physical_unit' then required_keys := array['part_revision_id','batch_id','serial_number']; expected_source := 'quality';
    when 'inspection' then required_keys := array['unit_id','batch_id','inspected_at','status','method','recorded_document_version_id','discrepancy_flag']; expected_source := 'quality';
    when 'maintenance_event' then required_keys := array['unit_id','event_at','category','recorded_observation','recorded_document_version_id']; expected_source := 'maintenance';
    when 'material' then required_keys := array['material_code','description','canonical_unit','related_part_id']; expected_source := 'materials';
    else raise exception 'Unsupported record kind: extend validated source contract first';
  end case;
  if record_source <> expected_source or not(new.payload ?& required_keys)
    or exists(select 1 from jsonb_object_keys(new.payload) field where not(field = any(required_keys))) then
    raise exception 'Source payload does not match its kind';
  end if;
  foreach key in array required_keys loop
    if key in ('effective_to','completed_on','recorded_document_version_id') and new.payload->key = 'null'::jsonb then continue; end if;
    if key = 'production_quantity' then
      if jsonb_typeof(new.payload->key) <> 'number' or (new.payload->>key)::numeric <= 0 or (new.payload->>key)::numeric <> trunc((new.payload->>key)::numeric) then raise exception 'Invalid production quantity'; end if;
    elsif key = 'discrepancy_flag' then
      if jsonb_typeof(new.payload->key) <> 'boolean' then raise exception 'Invalid discrepancy flag'; end if;
    else
      if jsonb_typeof(new.payload->key) <> 'string' then raise exception 'Expected source text field'; end if;
      if key in ('effective_from','effective_to','started_on','completed_on','inspected_at','event_at') then perform (new.payload->>key)::date; end if;
      if key in ('family_id','part_id','part_revision_id','batch_id','unit_id','related_part_id') then
        target_kind := case key when 'family_id' then 'part_family' when 'part_id' then 'part_definition' when 'related_part_id' then 'part_definition' when 'part_revision_id' then 'part_revision' when 'batch_id' then 'batch' when 'unit_id' then 'physical_unit' end;
        if not exists(select 1 from public.records r where r.id = (new.payload->>key)::uuid and r.kind = target_kind) then raise exception 'Invalid typed source reference'; end if;
      end if;
      if key = 'recorded_document_version_id' and not exists(select 1 from public.record_versions v join public.records r on r.id = v.record_id where v.id = (new.payload->>key)::uuid and r.kind = 'document') then raise exception 'Invalid document version reference'; end if;
    end if;
  end loop;
  if record_kind = 'part_definition' and new.payload->>'lifecycle_status' not in ('active','retired') then raise exception 'Invalid lifecycle status'; end if;
  if record_kind = 'inspection' and new.payload->>'status' not in ('scheduled','in_progress','completed','cancelled') then raise exception 'Invalid inspection status'; end if;
  if record_kind = 'inspection' and not exists(select 1 from public.record_versions v join public.records r on r.current_version_id=v.id where r.id=(new.payload->>'unit_id')::uuid and v.payload->>'batch_id'=new.payload->>'batch_id') then raise exception 'Inspection and physical unit batch disagree'; end if;
  if record_kind = 'physical_unit' and not exists(select 1 from public.record_versions v join public.records r on r.current_version_id=v.id where r.id=(new.payload->>'batch_id')::uuid and v.payload->>'part_revision_id'=new.payload->>'part_revision_id') then raise exception 'Physical unit and batch part revision disagree'; end if;
  return new;
end;
$$;
revoke all on function private.validate_source_version() from public,anon,authenticated;
create constraint trigger validate_source_version after insert on public.record_versions
  deferrable initially deferred for each row execute function private.validate_source_version();

create function private.require_record_version() returns trigger language plpgsql set search_path = '' as $$
begin
  if exists(select 1 from public.records where id=new.id and current_version_id is null) then raise exception 'A source record requires a current version'; end if;
  return new;
end;
$$;
revoke all on function private.require_record_version() from public,anon,authenticated;
create constraint trigger require_record_version after insert or update on public.records
  deferrable initially deferred for each row execute function private.require_record_version();
commit;
