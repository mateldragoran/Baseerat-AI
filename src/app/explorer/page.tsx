import Link from 'next/link';
import { Search, FileSearch } from 'lucide-react';
import { pageActor } from '@/components/page-access';
import { Shell } from '@/components/shell';
import { RecordList } from '@/components/records';
import { searchRecords } from '@/server/catalogue';
export const dynamic = 'force-dynamic';
export const metadata = { title: 'Explorer' };
export default async function Explorer({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const actor = await pageActor();
  const params = await searchParams;
  const q = typeof params.q === 'string' ? params.q.slice(0,100) : '';
  const { items } = await searchRecords(q);
  return <Shell actor={actor} active="Explorer"><div className="page-intro"><span className="eyebrow">Engineering catalogue</span><h1>Find the record behind the answer</h1><p>Look up a part, batch, physical unit or source record by its identifier.</p></div><form action="/explorer" className="search-form"><label htmlFor="record-search">Record identifier</label><div className="search-controls"><div className="search-input"><Search size={20} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" /><input id="record-search" name="q" type="search" placeholder="e.g. HA-204" defaultValue={q} maxLength={100} /></div><button type="submit" className="primary-button">Find records<ArrowIcon /></button></div></form><section className="panel catalogue-panel" aria-labelledby="catalogue-heading"><div className="section-header"><div><span className="section-kicker">Within your permitted sources</span><h2 id="catalogue-heading">{q ? `Matches for “${q}”` : 'Available records'}</h2></div>{q && <Link href="/explorer" className="text-link">Clear search</Link>}</div>{items.length ? <RecordList items={items} /> : <div className="empty-state"><FileSearch size={32} strokeWidth={2} absoluteStrokeWidth aria-hidden="true" /><h3>No matching records</h3><p>Try another identifier or clear your search to see available records.</p><Link href="/explorer" className="text-link">Clear search</Link></div>}<p className="catalogue-note">Initial catalogue · Showing up to 25 permitted records</p></section></Shell>;
}
function ArrowIcon() { return <span aria-hidden="true">→</span>; }
