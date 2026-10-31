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
export const recordResponseSchema = z.object({
  id: z.uuid(), displayId: z.string(), kind: recordKindSchema, title: z.string(),
  source: z.object({ id: sourceIdSchema, label: z.string(), availability: z.enum(['available', 'unavailable']), cachedAvailable: z.boolean() }),
  versionId: z.uuid(), revision: z.string().nullable(), eventAt: z.iso.datetime({ offset: true }).nullable(),
  dataAsOf: z.iso.datetime({ offset: true }), fields: z.record(z.string(), z.unknown()),
  access: z.literal('read_only'),
  provenance: z.object({ datasetId: z.uuid(), contentHash: z.string(), versionNo: z.number().int().positive() }),
}).strict();
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
