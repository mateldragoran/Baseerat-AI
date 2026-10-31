'use client';
import { useSyncExternalStore } from 'react';
import { Moon, Sun } from 'lucide-react';
function subscribe(listener: () => void) {
  const observer = new MutationObserver(listener);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
  return () => observer.disconnect();
}
function currentTheme() { return document.documentElement.dataset.theme === 'dark'; }
export function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, currentTheme, () => false);
  return <button className="quiet-button theme-toggle" onClick={() => {
    const next = !dark;
    document.documentElement.dataset.theme = next ? 'dark' : 'light';
  }} aria-label={dark ? 'Use light theme' : 'Use dark theme'}>{dark ? <Sun aria-hidden="true" size={18} /> : <Moon aria-hidden="true" size={18} />}<span>{dark ? 'Light theme' : 'Dark theme'}</span></button>;
}
