import { searchRecords } from '@/server/catalogue';
import { failure, noStore, success } from '@/server/http';
import { NextResponse } from 'next/server';
export async function GET(request: Request) {
  try {
    const q = new URL(request.url).searchParams.get('q') || '';
    if (q.length > 100) return NextResponse.json({ code: 'INVALID_INPUT', message: 'Use an identifier of 100 characters or fewer.', retryable: false, requestId: crypto.randomUUID() }, { status: 400, headers: noStore });
    const { items } = await searchRecords(q);
    return success({ items, appliedFilters: { q }, sort: 'displayId', cursor: null, limitations: ['Initial catalogue: up to 25 records.'] }, items.length ? items.map(item => item.dataAsOf).sort()[0] : null);
  } catch (error) { return failure(error); }
}
