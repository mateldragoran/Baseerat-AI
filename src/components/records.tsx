import Link from 'next/link';
import { ArrowUpRight, FileCheck2, Layers, Wrench, Package } from 'lucide-react';
import type { EngineeringRecord } from '@/shared/contracts';
export function formatDate(value: string, includeTime = false) {
  return new Intl.DateTimeFormat('en-GB', { dateStyle: 'medium', ...(includeTime ? { timeStyle: 'short' } : {}), timeZone: 'Asia/Karachi' }).format(new Date(value));
}
export function kindLabel(kind: string) { return kind.replaceAll('_',' '); }
const icons = { engineering: Layers, quality: FileCheck2, maintenance: Wrench, materials: Package };
export function RecordList({ items }: { items: EngineeringRecord[] }) {
  return <ul className="record-list">{items.map(record => {
    const Icon = icons[record.source.id];
    return <li key={record.id}><Link href={`/records/${record.id}`} className="record-row" aria-label={`Open ${record.displayId}: ${record.title}`}><span className="record-icon"><Icon size={21} strokeWidth={2} absoluteStrokeWidth aria-hidden="true" /></span><div className="record-identity"><span className="record-id"><bdi>{record.displayId}</bdi><span className="kind-label">{kindLabel(record.kind)}</span></span><strong>{record.title}</strong><span className="record-source">{record.source.label}</span></div><span className="record-revision">{record.revision ? `Rev ${record.revision}` : `Version ${record.provenance.versionNo}`}</span><ArrowUpRight className="row-arrow" size={18} strokeWidth={2} absoluteStrokeWidth aria-hidden="true" /></Link></li>;
  })}</ul>;
}
