import Link from './navigation-link';
import { LayoutDashboard, ScanSearch, ShieldCheck, ChevronRight, BookOpen, MessageSquare, ChartNoAxesCombined, FolderOpen } from 'lucide-react';
import type { Actor } from '@/shared/contracts';
import { Brand } from './brand';
import { ThemeToggle } from './theme-toggle';
import { SessionBoundary, SignOut } from './auth-controls';
import { NavigationFocus } from './navigation-focus';
const labels = { presenter_admin: 'Presenter / administrator', full_analyst: 'Full analyst', restricted_analyst: 'Restricted analyst', reviewer: 'Reviewer' };
export function Shell({ actor, active = 'Overview', contextKey, children }: { actor: Actor; active?: 'Overview' | 'Explorer'; contextKey: string; children: React.ReactNode }) {
  return <div className="app-shell">
    <SessionBoundary /><NavigationFocus contextKey={contextKey} /><a className="skip-link" href="#main">Skip to content</a>
    <aside className="sidebar" aria-label="Workspace navigation"><Link href="/" className="brand-link"><Brand /></Link>
      <div className="workspace-label">Engineering workspace</div>
      <nav aria-label="Main navigation"><Link href="/" className={active === 'Overview' ? 'nav-item active' : 'nav-item'} aria-current={active === 'Overview' ? 'page' : undefined}><LayoutDashboard size={19} strokeWidth={2} absoluteStrokeWidth aria-hidden="true" />Overview</Link><Link href="/explorer" className={active === 'Explorer' ? 'nav-item active' : 'nav-item'} aria-current={active === 'Explorer' ? 'page' : undefined}><ScanSearch size={19} strokeWidth={2} absoluteStrokeWidth aria-hidden="true" />Explorer</Link></nav>
      <div className="upcoming"><p>Coming next</p><span><MessageSquare size={17} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />Ask</span><span><ChartNoAxesCombined size={17} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />Intelligence</span><span><FolderOpen size={17} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />Investigations</span><span><BookOpen size={17} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />Knowledge</span></div>
      <div className="sidebar-footer"><ShieldCheck size={20} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" /><p>Evidence within reach<small>Access follows your signed-in account.</small></p></div>
    </aside>
    <div className="workspace"><header className="topbar"><div className="breadcrumb">Workspace<ChevronRight size={14} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" /><span>{active}</span></div><ThemeToggle /></header>
      <main id="main" tabIndex={-1} className="main-content">{children}</main>
      <footer className="account-footer"><div className="account-details"><span className="avatar" aria-hidden="true">{actor.displayName.split(' ').map(part => part[0]).slice(0,2).join('')}</span><div><strong>{actor.displayName}</strong><span>{labels[actor.role]}</span></div></div><SignOut /></footer>
    </div>
  </div>;
}
