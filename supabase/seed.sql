-- Minimal coherent BAS-001 source fixture, generated at setup and stable thereafter.
-- Internal data origin is fictional; this is not an institutional integration.
begin;
do $$
declare
  anchor date := (now() at time zone 'Asia/Karachi')::date;
  observed timestamptz := now();
  dataset uuid := '30000000-0000-4000-8000-000000000001';
begin
  if exists(select 1 from private.datasets where id = dataset) then return; end if;
  insert into private.datasets(id,date_anchor,generator_version,manifest_hash,origin)
    values(dataset,anchor,'bas001-v1','bas001-minimal-8-records-v1','synthetic');
  insert into public.sources(id,label,data_as_of,last_sync_at) values
    ('engineering','Engineering Registry',observed,observed),
    ('quality','Production & Quality',observed,observed),
    ('maintenance','Maintenance History',observed,observed),
    ('materials','Material Ledger',observed,observed);
  insert into public.records(id,kind,display_id,source_id,source_record_id) values
    ('10000000-0000-4000-8000-000000000001','part_definition','HA-204','engineering','HA-204'),
    ('10000000-0000-4000-8000-000000000002','part_family','HA-200','engineering','HA-200'),
    ('10000000-0000-4000-8000-000000000003','part_revision','HA-204 / C','engineering','HA-204-C'),
    ('10000000-0000-4000-8000-000000000004','batch','B-204-018','quality','B-204-018'),
    ('10000000-0000-4000-8000-000000000005','physical_unit','HA204-018-006','quality','HA204-018-006'),
    ('10000000-0000-4000-8000-000000000006','inspection','INS-204-006','quality','INS-204-006'),
    ('10000000-0000-4000-8000-000000000007','maintenance_event','MNT-204-006','maintenance','MNT-204-006'),
    ('10000000-0000-4000-8000-000000000008','material','HA-204-SEAL','materials','HA-204-SEAL');
  insert into public.record_versions(id,record_id,dataset_id,version_no,title,event_at,known_at,revision_label,data_as_of,payload,content_hash)
  select ('20000000-0000-4000-8000-' || lpad(n::text,12,'0'))::uuid,
    ('10000000-0000-4000-8000-' || lpad(n::text,12,'0'))::uuid,
    dataset,1,title,(anchor - 7)::timestamptz,(anchor - 6)::timestamptz,revision,observed,payload,
    encode(sha256(convert_to(payload::text,'UTF8')),'hex')
  from (values
    (1,'Hydraulic actuator','C',jsonb_build_object('family_id','10000000-0000-4000-8000-000000000002','description','Actuator assembly within the HA-200 component family.','lifecycle_status','active','canonical_unit','each')),
    (2,'Hydraulic actuator family',null,jsonb_build_object('family_code','HA-200','description','Hydraulic actuation component family.')),
    (3,'Hydraulic actuator · Revision C','C',jsonb_build_object('part_id','10000000-0000-4000-8000-000000000001','label','C','effective_from',anchor - 180,'effective_to',null)),
    (4,'Actuator production batch','C',jsonb_build_object('part_revision_id','10000000-0000-4000-8000-000000000003','started_on',anchor - 30,'completed_on',anchor - 14,'production_quantity',12)),
    (5,'Serialized hydraulic actuator','C',jsonb_build_object('part_revision_id','10000000-0000-4000-8000-000000000003','batch_id','10000000-0000-4000-8000-000000000004','serial_number','HA204-018-006')),
    (6,'Dimensional inspection','C',jsonb_build_object('unit_id','10000000-0000-4000-8000-000000000005','batch_id','10000000-0000-4000-8000-000000000004','inspected_at',anchor - 7,'status','completed','method','Dimensional check','recorded_document_version_id',null,'discrepancy_flag',false)),
    (7,'Recorded seal observation',null,jsonb_build_object('unit_id','10000000-0000-4000-8000-000000000005','event_at',anchor - 7,'category','inspection_observation','recorded_observation','Seal wear recorded during a component review.','recorded_document_version_id',null)),
    (8,'Actuator seal kit',null,jsonb_build_object('material_code','HA-204-SEAL','description','Seal kit associated with the HA-204 part definition.','canonical_unit','kit','related_part_id','10000000-0000-4000-8000-000000000001'))
  ) as fixture(n,title,revision,payload);
  update public.records set current_version_id = ('20000000-0000-4000-8000-' || right(id::text,12))::uuid;
  update private.datasets d set manifest_hash = (
    select encode(sha256(convert_to(string_agg(v.record_id::text || ':' || v.id::text || ':' || v.content_hash, E'\n' order by v.record_id,v.id),'UTF8')),'hex')
    from public.record_versions v where v.dataset_id=d.id
  ) where d.id=dataset;
end $$;
commit;
