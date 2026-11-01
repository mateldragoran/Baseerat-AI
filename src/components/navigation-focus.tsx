'use client';
import { createContext, useCallback, useContext, useEffect, useRef } from 'react';

const NavigationContext = createContext<((contextKey: string) => void) | null>(null);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const currentView = useRef<string | null>(null);
  const traversedUrl = useRef<string | null>(null);
  useEffect(() => {
    const onHistoryTraversal = () => { traversedUrl.current = window.location.href; };
    window.addEventListener('popstate', onHistoryTraversal);
    return () => window.removeEventListener('popstate', onHistoryTraversal);
  }, []);
  const enterView = useCallback((contextKey: string) => {
    const previousView = currentView.current;
    currentView.current = contextKey;
    const restoringHistory = traversedUrl.current === window.location.href;
    traversedUrl.current = null;
    // Initial documents and Back/Forward retain browser/Next restoration behavior.
    if (previousView === null || previousView === contextKey || restoringHistory) return;
    document.getElementById('main')?.focus({ preventScroll: true });
  }, []);
  return <NavigationContext.Provider value={enterView}>{children}</NavigationContext.Provider>;
}

// Render with the completed view, not the loading shell. Server-provided keys change only
// when that view's real route/search content has committed, so pending routes are not focused.
export function NavigationFocus({ contextKey }: { contextKey: string }) {
  const enterView = useContext(NavigationContext);
  useEffect(() => { enterView?.(contextKey); }, [contextKey, enterView]);
  return null;
}
