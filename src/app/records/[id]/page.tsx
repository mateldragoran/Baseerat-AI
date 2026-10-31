import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Fingerprint, Layers, LockKeyhole, Clock3, FileCheck2 } from 'lucide-react';
import { z } from 'zod';
import { pageActor } from '@/components/page-access';
import { Shell } from '@/components/shell';
import { formatDate, kindLabel } from '@/components/records';
import { getRecord } from '@/server/catalogue';
import { AccessError } from '@/server/access';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Source record' };
const fieldLabels: Record<string,string> = { description: 'Description', lifecycle_status: 'Lifecycle status', canonical_unit: 'Unit of measure', family_id: 'Part family', part_id: 'Part definition', part_revision_id: 'Part revision', batch_id: 'Production batch', unit_id: 'Physical unit', related_part_id: 'Related part definition', serial_number: 'Serial number', material_code: 'Material code', family_code: 'Family code', recorded_document_version_id: 'Recorded document revision', production_quantity: 'Production quantity', inspected_at: 'Inspection date', event_at: 'Event date', started_on: 'Started on', completed_on: 'Completed on', effective_from: 'Effective from', effective_to: 'Effective to', discrepancy_flag: 'Discrepancy recorded', recorded_observation: 'Recorded observation' };
function valueText(value: unknown) { if (value === null) return 'Not recorded'; if (value === true) return 'Yes'; if (value === false) return 'No'; return String(value).replaceAll('_',' '); }
export default async function RecordPage({ params, searchParams }: { params: Promise<{id:string}>; searchParams: Promise<{versionId?:string}> }) {
  const actor = await pageActor();
  const { id } = await params;
  const { versionId } = await searchParams;
  if (!z.uuid().safeParse(id).success || (versionId && !z.uuid().safeParse(versionId).success)) notFound();
  let record;
  try { record = await getRecord(id,versionId); }
  catch (error) { if (error instanceof AccessError && error.code === 'NOT_FOUND') notFound(); throw error; }
  return <Shell actor={actor} active="Explorer"><Link href="/explorer" className="back-link"><ArrowLeft size={17} aria-hidden="true" />Back to Explorer</Link><div className="page-intro record-intro"><span className="eyebrow">{kindLabel(record.kind)}<span className="dot-separator">·</span><bdi>{record.displayId}</bdi></span><h1>{record.title}</h1><p>{record.fields.description ? String(record.fields.description) : `Inspect this ${kindLabel(record.kind)} and its recorded source version.`}</p><div className="record-badges"><span className="badge"><LockKeyhole size={14} aria-hidden="true" />Read-only source</span><span className="badge">{record.revision ? `Revision ${record.revision}` : `Version ${record.provenance.versionNo}`}</span></div></div>
    {record.source.availability === 'unavailable' && <div className="warning-message" role="status">Source unavailable. Showing stored evidence from {formatDate(record.dataAsOf,true)} Asia/Karachi. Try again later for updated source status.</div>}
    <div className="record-layout"><section className="panel record-fields" aria-labelledby="details-heading"><div className="section-header"><div><span className="section-kicker">Recorded information</span><h2 id="details-heading">Record details</h2></div><FileCheck2 size={22} aria-hidden="true" /></div><dl className="field-list">{Object.entries(record.fields).map(([key,value]) => <div key={key}><dt>{fieldLabels[key] || key.replaceAll('_',' ')}</dt><dd>{typeof value === 'string' && z.uuid().safeParse(value).success ? <bdi className="record-reference">{value}</bdi> : <bdi>{valueText(value)}</bdi>}</dd></div>)}</dl><p className="record-readonly">Source information cannot be changed in Baseerat AI.</p></section><aside className="evidence-panel"><span className="panel-icon"><Fingerprint size={23} aria-hidden="true" /></span><h2>Evidence summary</h2><p>This view resolves to one persisted source version.</p><dl className="evidence-list"><div><dt><Layers size={15} aria-hidden="true" />Source</dt><dd>{record.source.label}</dd></div><div><dt><FileCheck2 size={15} aria-hidden="true" />Source version</dt><dd>{record.provenance.versionNo}{record.revision ? ` · Revision ${record.revision}` : ''}</dd></div><div><dt><Clock3 size={15} aria-hidden="true" />Data as of</dt><dd>{formatDate(record.dataAsOf,true)}<small>Asia/Karachi</small></dd></div></dl><details className="provenance"><summary>Inspect evidence identifiers</summary><dl><div><dt>Record ID</dt><dd><bdi>{record.id}</bdi></dd></div><div><dt>Version ID</dt><dd><bdi>{record.versionId}</bdi></dd></div><div><dt>Content hash</dt><dd><bdi>{record.provenance.contentHash}</bdi></dd></div></dl><Link href={`/records/${record.id}?versionId=${record.versionId}`} className="text-link">Open this exact version</Link></details></aside></div>
  </Shell>;
}
