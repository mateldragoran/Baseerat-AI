'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Eye, EyeOff, LogOut } from 'lucide-react';

export function SignInForm() {
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState('');
  const [show, setShow] = useState(false);
  const busy = useRef(false);
  return <form className="sign-in-form" onSubmit={async event => {
    event.preventDefault();
    if (busy.current) return;
    busy.current = true; setPending(true); setMessage('');
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch('/api/auth/sign-in', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: String(form.get('email')).trim(), password: form.get('password') }) });
      const result = await response.json();
      if (!response.ok) { setMessage(result.message); return; }
      window.location.replace('/');
    } catch { setMessage('Unable to connect. Check your connection and try again.'); }
    finally { busy.current = false; setPending(false); }
  }}>
    <p className="field-note">Both fields are required.</p>
    <div className="field"><label htmlFor="email">Email address</label><input id="email" name="email" type="email" autoComplete="username" spellCheck={false} placeholder="name@example.com" required maxLength={254} /></div>
    <div className="field"><label htmlFor="password">Password</label><div className="password-field"><input id="password" name="password" type={show ? 'text' : 'password'} autoComplete="current-password" required maxLength={1024} /><button type="button" className="password-toggle" aria-label={show ? 'Hide password' : 'Show password'} onClick={() => setShow(!show)}>{show ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}</button></div></div>
    <div role="alert" className={message ? 'error-message' : ''}>{message}</div>
    <button className="primary-button" type="submit" aria-disabled={pending}>{pending ? 'Sign in · Connecting…' : 'Sign in'}<ArrowRight size={18} aria-hidden="true" /></button>
    <p role="status" className="sr-only">{pending ? 'Signing in. Wait for your workspace.' : ''}</p>
  </form>;
}

export function SignOut() {
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState('');
  const busy = useRef(false);
  return <div className="sign-out"><button className="quiet-button" aria-disabled={pending} onClick={async () => {
    if (busy.current) return;
    busy.current = true; setPending(true); setMessage('');
    try {
      const response = await fetch('/api/auth/sign-out', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ requestKey: crypto.randomUUID() }) });
      if (!response.ok) throw new Error();
      // Full navigation discards all rendered protected state and any future query cache.
      const result = await response.json();
      window.location.replace(result.data.auditRecorded === false ? '/sign-in?notice=audit-unavailable' : '/sign-in');
    } catch { setMessage('Unable to sign out. Check your connection and try again.'); busy.current = false; setPending(false); }
  }}><LogOut size={17} aria-hidden="true" />{pending ? 'Sign out · Waiting…' : 'Sign out'}</button><div role="alert">{message}</div></div>;
}

export function SessionBoundary() {
  useEffect(() => {
    const handler = (event: PageTransitionEvent) => { if (event.persisted) window.location.reload(); };
    window.addEventListener('pageshow', handler);
    return () => window.removeEventListener('pageshow', handler);
  }, []);
  return null;
}
