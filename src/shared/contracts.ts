import { z } from 'zod';

export const sourceIdSchema = z.enum(['engineering', 'quality', 'maintenance', 'materials']);
export const roleSchema = z.enum(['presenter_admin', 'full_analyst', 'restricted_analyst', 'reviewer']);
export const actionSchema = z.enum(['search', 'analyze', 'create_investigation', 'edit_own', 'share_own', 'comment', 'review', 'export', 'admin', 'reset_workspace']);
export const actorSchema = z.object({
  id: z.uuid(), displayName: z.string(), role: roleSchema,
  personaFocus: z.enum(['quality', 'materials', 'leadership', 'governance', 'review']),
  workspaceEpoch: z.number().int().positive(),
  sources: z.array(z.object({ id: sourceIdSchema, label: z.string() })),
  actions: z.array(actionSchema),
}).strict();
export type Actor = z.infer<typeof actorSchema>;

export const recordKindSchema = z.enum(['part_family', 'part_definition', 'part_revision', 'assembly', 'batch', 'physical_unit', 'inspection', 'nonconformance', 'maintenance_event', 'document', 'material', 'material_transaction', 'material_coverage', 'stock_snapshot']);
const id = z.uuid();
const date = z.iso.date();
export const recordPayloadSchemas = {
  part_family: z.object({ family_code: z.string(), description: z.string() }).strict(),
  part_definition: z.object({ family_id: id, description: z.string(), lifecycle_status: z.enum(['active','retired']), canonical_unit: z.string() }).strict(),
  part_revision: z.object({ part_id: id, label: z.string(), effective_from: date, effective_to: date.nullable() }).strict(),
  batch: z.object({ part_revision_id: id, started_on: date, completed_on: date.nullable(), production_quantity: z.number().int().positive() }).strict(),
  physical_unit: z.object({ part_revision_id: id, batch_id: id, serial_number: z.string() }).strict(),
  inspection: z.object({ unit_id: id, batch_id: id, inspected_at: date, status: z.enum(['scheduled','in_progress','completed','cancelled']), method: z.string(), recorded_document_version_id: id.nullable(), discrepancy_flag: z.boolean() }).strict(),
  maintenance_event: z.object({ unit_id: id, event_at: date, category: z.string(), recorded_observation: z.string(), recorded_document_version_id: id.nullable() }).strict(),
  material: z.object({ material_code: z.string(), description: z.string(), canonical_unit: z.string(), related_part_id: id }).strict(),
} as const;
export const recordResponseSchema = z.object({
  id: z.uuid(), displayId: z.string(), kind: recordKindSchema, title: z.string(),
  source: z.object({ id: sourceIdSchema, label: z.string(), availability: z.enum(['available', 'unavailable']), cachedAvailable: z.boolean() }),
  versionId: z.uuid(), revision: z.string().nullable(), eventAt: z.iso.datetime({ offset: true }).nullable(),
  dataAsOf: z.iso.datetime({ offset: true }), fields: z.record(z.string(), z.unknown()),
  access: z.literal('read_only'),
  provenance: z.object({ datasetId: z.uuid(), contentHash: z.string(), versionNo: z.number().int().positive() }),
}).strict().superRefine((record, context) => {
  const payloadSchema = recordPayloadSchemas[record.kind as keyof typeof recordPayloadSchemas];
  if (!payloadSchema || !payloadSchema.safeParse(record.fields).success) context.addIssue({ code: 'custom', path: ['fields'], message: 'Source payload does not match its supported record kind.' });
});
export type EngineeringRecord = z.infer<typeof recordResponseSchema>;

export const toolInvocationSchema = z.object({
  tool: z.literal('get_record'), schemaVersion: z.literal(1),
  arguments: z.object({ recordId: z.uuid(), versionId: z.uuid().optional() }).strict(),
  runId: z.uuid(), invocationId: z.uuid(),
}).strict();
export const toolResultSchema = z.object({
  operationId: z.uuid(), status: z.enum(['complete', 'unavailable']),
  appliedScope: z.array(sourceIdSchema), data: recordResponseSchema.nullable(),
  dependencyIds: z.array(z.uuid()), dataAsOf: z.iso.datetime({ offset: true }),
  limitations: z.array(z.string()),
}).strict();
export const errorSchema = z.object({
  code: z.enum(['INVALID_INPUT', 'UNAUTHENTICATED', 'NOT_FOUND', 'UNAVAILABLE', 'FORBIDDEN']),
  message: z.string(), retryable: z.boolean(), requestId: z.uuid(),
  fieldErrors: z.record(z.string(), z.array(z.string())).optional(),
});
export const signInSchema = z.object({ email: z.email().max(254), password: z.string().min(1).max(1024) }).strict();
