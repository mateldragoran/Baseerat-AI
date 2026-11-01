import { redirect } from 'next/navigation';
import { ShieldCheck, Layers, FileCheck2, ArrowUpRight } from 'lucide-react';
import { Brand } from '@/components/brand';
import { SignInForm } from '@/components/auth-controls';
import { ThemeToggle } from '@/components/theme-toggle';
import { publicConfig } from '@/server/config';
import { resolveActor } from '@/server/access';
export const metadata = { title: 'Sign in' };
export const dynamic = 'force-dynamic';
export default async function SignInPage({ searchParams }: { searchParams: Promise<{ notice?: string }> }) {
  const notice = (await searchParams).notice;
  let signedIn = false;
  if (publicConfig()) { try { await resolveActor(); signedIn = true; } catch { /* Form remains available for recovery. */ } }
  if (signedIn) redirect('/');
  return <main className="sign-in-page" id="main"><section className="sign-in-story"><Brand /><div className="story-content"><span className="eyebrow">From records to understanding</span><p className="story-headline">Clearer decisions.<br />Stronger evidence.</p><p>Bring engineering records into focus. Inspect the source, follow its revision, and build your understanding on evidence.</p><div className="evidence-illustration" aria-hidden="true"><div className="illustration-top"><span className="tiny-label">Engineering record</span><Layers size={20} strokeWidth={2} absoluteStrokeWidth /></div><div className="illustration-part">HA-204 <span>Rev C</span></div><strong>Hydraulic actuator</strong><div className="illustration-line" /><div className="illustration-link"><FileCheck2 size={20} strokeWidth={1.5} absoluteStrokeWidth /><span>Versioned source evidence<small>Traceable. Read-only. Permission-scoped.</small></span><ArrowUpRight size={18} strokeWidth={1.5} absoluteStrokeWidth /></div></div></div><p className="story-footer"><ShieldCheck size={17} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />An accountable view of engineering information</p></section>
    <section className="sign-in-panel" aria-labelledby="sign-in-heading"><div className="sign-in-tools"><ThemeToggle /></div><div className="sign-in-card"><span className="eyebrow">Welcome to Baseerat AI</span><h1 id="sign-in-heading">Sign in to your workspace</h1><p>Use the account provided by your administrator to access your permitted engineering sources.</p>{notice === 'audit-unavailable' && <p role="status" className="warning-message">Sign-out completed, but its audit record could not be saved. Contact your administrator.</p>}{publicConfig() ? <SignInForm /> : <div role="alert" className="error-message">Sign-in is not configured. Contact your administrator to connect the workspace, then reload this page.</div>}<div className="account-help"><ShieldCheck size={18} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" /><p>Need access or a password reset?<br /><strong>Contact your workspace administrator.</strong></p></div></div><p className="sign-in-footnote">Engineering intelligence, grounded in evidence.</p></section>
  </main>;
}
