import 'server-only';
import { recordResponseSchema, type EngineeringRecord } from '@/shared/contracts';
import { AccessError, resolveActor } from './access';

const projection = 'id,kind,display_id,source_id,current_version_id,sources!inner(id,label,availability,cached_available),record_versions!records_current_version_fk(id,title,version_no,event_at,revision_label,data_as_of,payload,dataset_id,content_hash)';

function project(row: Record<string, unknown>): EngineeringRecord {
  const source = row.sources as Record<string, unknown>;
  const version = row.record_versions as Record<string, unknown>;
  if (!version || !source) throw new AccessError('NOT_FOUND', 404);
  if (source.availability === 'unavailable' && !source.cached_available) throw new AccessError('UNAVAILABLE', 503);
  return recordResponseSchema.parse({
    id: row.id, displayId: row.display_id, kind: row.kind, title: version.title,
    source: { id: source.id, label: source.label, availability: source.availability, cachedAvailable: source.cached_available },
    versionId: version.id, revision: version.revision_label, eventAt: version.event_at,
    dataAsOf: version.data_as_of, fields: version.payload, access: 'read_only',
    provenance: { datasetId: version.dataset_id, contentHash: version.content_hash, versionNo: version.version_no },
  });
}

export async function searchRecords(query = '') {
  const { db, actor } = await resolveActor();
  let request = db.from('records').select(projection).order('display_id').order('id').limit(25);
  // BAS-001 supports a bounded identifier lookup; richer filters/pages belong to BAS-003.
  if (query) request = request.ilike('display_id', `%${query.replace(/[%_,()\\]/g, '')}%`);
  const { data, error } = await request;
  if (error) throw new AccessError('UNAVAILABLE', 503);
  const items = (data ?? []).map(row => project(row as unknown as Record<string, unknown>));
  return { actor, items };
}

export async function getRecord(id: string, versionId?: string) {
  const { db } = await resolveActor();
  const { data, error } = await db.from('records').select(projection).eq('id', id).maybeSingle();
  if (error) throw new AccessError('UNAVAILABLE', 503);
  if (!data) throw new AccessError('NOT_FOUND', 404);
  const row = data as unknown as Record<string, unknown>;
  if (versionId) {
    const { data: version, error: versionError } = await db.from('record_versions').select('*').eq('id', versionId).eq('record_id', id).maybeSingle();
    if (versionError) throw new AccessError('UNAVAILABLE', 503);
    if (!version) throw new AccessError('NOT_FOUND', 404);
    row.record_versions = version;
  }
  return project(row);
}
