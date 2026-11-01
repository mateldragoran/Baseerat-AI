'use client';

import NextLink, { useLinkStatus } from 'next/link';
import type { ComponentProps } from 'react';

function NavigationPending() {
  const { pending } = useLinkStatus();
  return <span className="navigation-pending" role="status">{pending ? 'Loading your workspace…' : ''}</span>;
}

// Full documents wait for ready HTML; enhanced links keep a truthful pending
// signal without a streamed shell that requires JavaScript to reveal its result.
export default function NavigationLink({ children, ...props }: ComponentProps<typeof NextLink>) {
  return <NextLink {...props}>{children}<NavigationPending /></NextLink>;
}
