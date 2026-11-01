'use client';

import { useFormStatus } from 'react-dom';

export function SearchSubmit() {
  const { pending } = useFormStatus();
  return <><button type="submit" className="primary-button" disabled={pending}>{pending ? 'Find records · Searching…' : 'Find records'}<span aria-hidden="true">→</span></button><span role="status" className="sr-only">{pending ? 'Finding records. Wait for the results.' : ''}</span></>;
}
