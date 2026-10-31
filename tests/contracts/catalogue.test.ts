import { expect, test } from 'vitest';
import { recordResponseSchema, toolInvocationSchema } from '../../src/shared/contracts';

test('record detail requires exact version identity and evidence freshness', () => {
  expect(recordResponseSchema.safeParse({ id: 'HA-204', title: 'Hydraulic actuator' }).success).toBe(false);
});

test('record tool rejects forged actor fields and arbitrary database expressions', () => {
  expect(toolInvocationSchema.safeParse({
    tool: 'get_record', schemaVersion: 1,
    arguments: { recordId: '10000000-0000-4000-8000-000000000001', role: 'presenter_admin', sql: 'select *' },
    runId: '10000000-0000-4000-8000-000000000002',
    invocationId: '10000000-0000-4000-8000-000000000003',
  }).success).toBe(false);
});
