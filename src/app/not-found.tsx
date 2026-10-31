import Link from 'next/link';
export default function NotFound() { return <main className="standalone-state"><span className="eyebrow">Record unavailable</span><h1>This record is not available</h1><p>It may not exist or may be outside your current access. Return to Explorer to choose an available record.</p><Link className="primary-button" href="/explorer">Return to Explorer</Link></main>; }
