import type { Metadata } from 'next';
import './globals.css';
import { NavigationProvider } from '@/components/navigation-focus';
export const metadata: Metadata = { title: { default: 'Baseerat AI', template: '%s · Baseerat AI' }, description: 'Engineering intelligence, grounded in evidence.' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" dir="ltr"><body><NavigationProvider>{children}</NavigationProvider></body></html>;
}
