'use client';
import { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  return <button className="quiet-button theme-toggle" onClick={() => {
    const next = !dark;
    document.documentElement.dataset.theme = next ? 'dark' : 'light';
    setDark(next);
  }} aria-label={dark ? 'Use light theme' : 'Use dark theme'}>{dark ? <Sun aria-hidden="true" size={18} /> : <Moon aria-hidden="true" size={18} />}<span>{dark ? 'Light theme' : 'Dark theme'}</span></button>;
}
