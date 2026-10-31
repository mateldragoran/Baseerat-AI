'use client';
import Link from 'next/link';
export default function ErrorPage({ reset }: { reset: () => void }) {
  return <main className="standalone-state"><span className="eyebrow">Workspace unavailable</span><h1>Unable to load this view</h1><p role="alert">Your request could not be completed. Try again, or sign in again to check your account access.</p><div className="state-actions"><button className="primary-button" onClick={reset}>Try again</button><Link href="/sign-in" className="text-link">Return to sign-in</Link></div></main>;
}
