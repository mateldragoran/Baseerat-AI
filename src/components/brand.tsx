export function Brand({ compact = false }: { compact?: boolean }) {
  return <div className="brand"><span className="brand-mark" aria-hidden="true"><svg viewBox="0 0 32 32" fill="none"><path d="M5 24V13l11-7 11 7v11M11 24V16l5-3 5 3v8M5 24h22" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" /><path d="M16 4v5" stroke="currentColor" strokeWidth="2.2" /></svg></span><span>Baseerat<span className="brand-ai"> AI</span>{!compact && <small>Engineering intelligence</small>}</span></div>;
}
