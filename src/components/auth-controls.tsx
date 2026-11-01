'use client';
import { useActionState, useEffect, useRef, useState } from 'react';
import { ArrowRight, Eye, EyeOff, LogOut } from 'lucide-react';
import { nativeSignIn } from '@/app/sign-in/actions';
import { nativeSignOut } from '@/app/sign-in/sign-out-action';

export function SignInForm() {
  const [nativeState, nativeAction, nativePending] = useActionState(nativeSignIn, { email: '', message: '' }, '/sign-in');
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [show, setShow] = useState(false);
  const busy = useRef(false);
  const feedback = message ?? nativeState.message;
  const waiting = pending || nativePending;
  return <form className="sign-in-form" action={nativeAction} onSubmit={async event => {
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
    <div className="field"><label htmlFor="email">Email address</label><input id="email" name="email" type="email" autoComplete="username" spellCheck={false} placeholder="name@example.com" required maxLength={254} defaultValue={nativeState.email} /></div>
    <div className="field"><label htmlFor="password">Password</label><div className="password-field"><input id="password" name="password" type={show ? 'text' : 'password'} autoComplete="current-password" required maxLength={1024} /><button type="button" className="password-toggle" aria-label={show ? 'Hide password' : 'Show password'} onClick={() => setShow(!show)}>{show ? <EyeOff size={18} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" /> : <Eye size={18} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />}</button></div></div>
    <div role="alert" className={feedback ? 'error-message' : ''}>{feedback}</div>
    <button className="primary-button" type="submit" aria-disabled={waiting} disabled={waiting}>{waiting ? 'Sign in · Connecting…' : 'Sign in'}<ArrowRight size={18} strokeWidth={2} absoluteStrokeWidth aria-hidden="true" /></button>
    <p role="status" className="sr-only">{waiting ? 'Signing in. Wait for your workspace.' : ''}</p>
  </form>;
}

export function SignOut() {
  const [nativeState, nativeAction, nativePending] = useActionState(nativeSignOut, { message: '' });
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const busy = useRef(false);
  const waiting = pending || nativePending;
  return <form className="sign-out" action={nativeAction} onSubmit={async event => {
    event.preventDefault();
    if (busy.current) return;
    busy.current = true; setPending(true); setMessage('');
    try {
      const response = await fetch('/api/auth/sign-out', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ requestKey: crypto.randomUUID() }) });
      if (!response.ok) throw new Error();
      // Full navigation discards all rendered protected state and any future query cache.
      const result = await response.json();
      window.location.replace(result.data.auditRecorded === false ? '/sign-in?notice=audit-unavailable' : '/sign-in');
    } catch { setMessage('Unable to sign out. Check your connection and try again.'); busy.current = false; setPending(false); }
  }}><button type="submit" className="quiet-button" aria-disabled={waiting} disabled={waiting}><LogOut size={17} strokeWidth={1.5} absoluteStrokeWidth aria-hidden="true" />{waiting ? 'Sign out · Waiting…' : 'Sign out'}</button><div role="alert">{message ?? nativeState.message}</div></form>;
}

export function SessionBoundary() {
  useEffect(() => {
    const handler = (event: PageTransitionEvent) => { if (event.persisted) window.location.reload(); };
    window.addEventListener('pageshow', handler);
    return () => window.removeEventListener('pageshow', handler);
  }, []);
  return null;
}
