import { resolveActor } from '@/server/access';
import { failure, success } from '@/server/http';
export async function GET() {
  try { return success((await resolveActor()).actor); }
  catch (error) { return failure(error); }
}
