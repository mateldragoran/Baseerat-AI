import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: { default: 'Baseerat AI', template: '%s · Baseerat AI' }, description: 'Engineering intelligence, grounded in evidence.' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" dir="ltr"><body>{children}</body></html>;
}
