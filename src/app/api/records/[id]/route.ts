import { z } from 'zod';
import { getRecord } from '@/server/catalogue';
import { AccessError } from '@/server/access';
import { failure, success } from '@/server/http';
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const versionId = new URL(request.url).searchParams.get('versionId') || undefined;
    if (!z.uuid().safeParse(id).success || (versionId && !z.uuid().safeParse(versionId).success)) throw new AccessError('NOT_FOUND', 404);
    const record = await getRecord(id, versionId);
    return success(record, record.dataAsOf);
  } catch (error) { return failure(error); }
}
