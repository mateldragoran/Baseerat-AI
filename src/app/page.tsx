import Link from '@/components/navigation-link';
import { ArrowRight, Search, Layers, ShieldCheck, FileSearch } from 'lucide-react';
import { pageActor } from '@/components/page-access';
import { Shell } from '@/components/shell';
import { RecordList } from '@/components/records';
import { searchRecords } from '@/server/catalogue';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Overview' };
export default async function Overview() {
  const actor = await pageActor();
  const { items } = await searchRecords();
  const lead = items.find(record => record.displayId === 'HA-204');
  return <Shell actor={actor} contextKey="/"><div className="page-intro"><span className="eyebrow">{actor.personaFocus === 'review' ? 'Review workspace' : 'Quality workspace'}</span><h1>Start with the evidence</h1><p>Inspect an engineering record and understand exactly where its information comes from.</p></div>
    <section className="focus-card" aria-labelledby="focus-heading"><div><span className="section-kicker"><Layers size={17} strokeWidth={2} absoluteStrokeWidth aria-hidden="true" />A focused starting point</span><h2 id="focus-heading">One part. A clear source of truth.</h2><p>Open the HA-204 part definition to inspect its recorded fields, revision and source version.</p>{lead ? <Link href={`/records/${lead.id}`} className="primary-button">Open HA-204<ArrowRight size={18} strokeWidth={2} absoluteStrokeWidth aria-hidden="true" /></Link> : <Link href="/explorer" className="primary-button">Browse available records<ArrowRight size={18} strokeWidth={2} absoluteStrokeWidth aria-hidden="true" /></Link>}</div><div className="focus-visual" aria-hidden="true"><div className="technical-ring"><svg viewBox="0 0 180 150" fill="none"><path d="m35 87 48-28 61 35-49 29-60-36Z" /><path d="M35 87V59l48-28 61 35v28M83 31v28m12 36v28M60 72l48-28M59 101l48-28M72 66l35 21m-23-28 35 21" /><path d="m25 117 35 20m67-104 28 16" className="dimension" /></svg></div><span>HA-204 / REV C</span></div></section>
    <div className="overview-grid"><section className="panel" aria-labelledby="records-heading"><div className="section-header"><div><span className="section-kicker">Your next step</span><h2 id="records-heading">Explore source records</h2></div><Link href="/explorer" className="text-link">Browse records<ArrowRight size={16} strokeWidth={2} absoluteStrokeWidth aria-hidden="true" /></Link></div><RecordList items={items.filter(record => ['part_definition','inspection','maintenance_event','material'].includes(record.kind)).slice(0,4)} />{items.length === 0 && <div className="empty-state"><FileSearch aria-hidden="true" /><h3>No records available</h3><p>Ask your administrator to check your source access, then reload this page.</p></div>}</section>
    <aside className="access-panel" aria-labelledby="source-access-heading"><span className="panel-icon"><ShieldCheck size={22} strokeWidth={2} absoluteStrokeWidth aria-hidden="true" /></span><h2 id="source-access-heading">Your source access</h2><p>These sources are available to your account. Source records are read-only.</p><ul className="source-list">{actor.sources.map(source => <li key={source.id}><Layers size={16} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />{source.label}</li>)}</ul><div className="access-note"><Search size={17} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" /><p>Looking for a known identifier? Use Explorer to find its record.</p></div></aside></div>
  </Shell>;
}
