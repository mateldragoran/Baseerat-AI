# Baseerat AI architecture and implementation contracts

Version 1.0, 31 October 2026. Technical design approved by the user for implementation.
No application code, database objects, resources, deployment, or inference tests
have been created. Product scope, verification seams and the engineering
defaults below are the approved implementation contract. Compatibility and
actual behavior must still be verified during the build.

## A-01. Architecture and compatibility baseline

~~~mermaid
flowchart LR
  U[Authenticated browser] --> N[Next application on Vercel]
  N --> S[Supabase Auth / PostgreSQL / private Storage]
  N --> T[OpenAI Responses]
  U <-->|WebRTC audio| V[OpenAI Realtime]
  U <-->|authenticated control channel| N
  N <-->|server sideband| V
  N --> X[Shared application tools and evidence validation]
  X --> S
~~~

Use one Next.js/TypeScript application with internal modules, not microservices.
The researched baseline is Next.js 16.4.3, React 19.3, Node 24.x, Supabase JS/SSR,
Responses model gpt-6.1-sol, and Realtime model gpt-realtime-2.1. These model IDs
and dependency lines are proposals, configurable on the server. Freeze exact
compatible package patches in the first implementation lockfile and record them.

Use Node routes, Tailwind/semantic CSS tokens, owned shadcn/Radix primitives,
Lucide, TanStack Query/Table, React Hook Form/Zod, ECharts, a PDF.js viewer, and
PDFKit for bounded English report generation. Zustand is optional for the shared
inspector, not the primary owner of application data.

Current primary-source facts and links are preserved in
[implementation compatibility](research/implementation-compatibility.md),
[voice options](research/openai-voice-options.md), and
[hosted deployment research](research/hosted-demo-options.md).
The researched APIs may change: the compatibility ticket must verify them in
the actual accounts before dependent work. Model entitlement, Urdu quality,
hosting limits, and package compatibility have not been tested.

## A-02. Module interfaces and ownership

| Module | Small external interface | Responsibilities hidden behind it |
| --- | --- | --- |
| Identity and Access | resolveActor; authorizeAction; canReadDependencySet | Server identity verification, live account/source grants, owner/share membership, active account and epoch. |
| Engineering Catalogue | searchRecords; getRecord; relatedRecords; getPassage | Typed filters, allowed joins, pagination, versions, historical applicability, freshness, current permission filtering. |
| Analysis | executeAnalysis | Record sets, groupings, discrepancy metrics, maintenance summaries, baseline forecasts, shared data for charts/tables and evidence. |
| Investigation | saveFinding; createVersion; comment; share; review; resetWorkspace | Ownership, immutable versions, confirmation, conflict handling, reset boundaries, audit and idempotency. |
| AI Orchestration | startRun; cancelRun; attachVoice | Bounded provider loops, intent/action proposals, structured results, tool validation, provider events and durable checkpoints. |
| Knowledge and Reports | resolveDocument; createReport; downloadReport | Private file access, revision passages, English narrative, one canonical PDF preview/export, byte delivery authorization. |
| Governance | getStatus; listAudit; setSourceAvailability; provisionAccount | Actual configuration/status, granted-source catalogue, safe audit metadata, narrow administrator operations. |

Both text and voice call the same tool registry. The browser never executes a
database query or a model-provided program. There is no SQL-string or code
parameter in any public tool. Normal application tools use user-scoped data
access. Provisioning and source-seed maintenance alone use privileged keys.

## A-03. Domain and seed specification

One organization per deployment; no tenant-selection or project-management
module. A persona is a presentation preference, not a clearance or account.
Use four logical source IDs:

| Key | Label | Records |
| --- | --- | --- |
| engineering | Engineering Registry | Families, part definitions/revisions, assemblies, documents/passages |
| quality | Production & Quality | Batches, units, inspections, NCRs |
| maintenance | Maintenance History | Unit-specific historical service events |
| materials | Material Ledger | Materials, usage/stock events, coverage, stock snapshots |

Use HA-200 as a family, HA-204 as the primary part/design, and HA-204-SEAL as a
related material. All are generated records. Keep origin in seed manifests and
technical provenance, without mandatory normal-screen or export watermarks.
Use ordinary identifiers and realistic descriptive copy, not fictional-data
badges or unverified claims of live institutional integration.

Proposed initial fixture size: 8 part definitions, 3 revisions for HA-204,
12 batches, 120 serialized units, 600 inspections, 90 NCRs, 180 maintenance
events, 12 materials, 24 document revisions with selectable English text, and
48 complete historical months for ordinary forecast materials. Seed a partial
current month separately. Keep the complete fixture below 10,000 records; exact
counts are generated manifest facts, not hardcoded Overview counts.

The seeded date anchor is the actual setup date in Asia/Karachi; historical
events and revision applicability are generated relative to it. They remain
stable across reads and redeploys. Deliberate privileged regeneration creates
a new dataset/version rather than silently redating historical evidence.
User-relative date queries always use the real server clock.

Required exceptional fixtures: two permitted records sharing an ambiguous
display identifier; an exact missing passage; missing document revision; recorded
revision outside its applicability period; inspection with multiple NCRs;
incomplete/zero-use material histories; stale cached source; unavailable source
without usable cache; and Maintenance/Materials records denied to the restricted
analyst. Normal records must support multiple legitimate joins and questions,
not one scripted prompt/answer pair.

Do not populate maintenance instructions, airworthiness judgments, operational
approvals, actual PAC names/data, or unsupported causal findings.

## A-04. Database schema

All internal IDs are UUIDs unless stated. Instant timestamps are timestamptz
stored in UTC; business dates/month starts are date values in the declared
reporting calendar. Quantities are numeric, never binary floating-point ledger
amounts. Use CHECK constraints, foreign keys, and transaction boundaries.
Payload JSON is versioned and validated by the same runtime schemas used in
contracts; it is not untyped arbitrary record content.

### Identity, sources, and records

| Table | Required fields and relationships | Constraints |
| --- | --- | --- |
| profiles | user_id PK/FK Auth user; role; display_name; active; persona_focus; workspace_epoch; created_at | role = presenter_admin/full_analyst/restricted_analyst/reviewer; persona cannot grant actions; epoch starts at 1. |
| datasets | id PK; generated_at; date_anchor; generator_version; manifest_hash; origin; active | Internal origin=synthetic; one active generation; old generations retained for evidence. |
| sources | id text PK; label; availability; cached_available; data_as_of; last_sync_at; last_error_code | availability = available/unavailable; safe error codes only; freshness is real stored metadata. |
| source_grants | user_id FK profiles; source_id FK sources; granted_at | Composite PK; changes checked on each data operation, not merely cached JWT roles. |
| records | id PK; kind; display_id; source_id FK; source_record_id; current_version_id; created_at | display_id need not be globally unique; unique(source_id, kind, source_record_id). |
| record_versions | id PK; record_id FK; dataset_id FK; version_no; title; event_at nullable; known_at; revision_label nullable; data_as_of; payload; content_hash; created_at | Unique(record_id, version_no); append-only; current_version must belong to the same record. known_at is source business availability time, distinct from actual seed-ingestion created_at. |
| record_relations | id PK; from_version_id FK; to_version_id FK; relation_type; effective_from/to nullable | Typed endpoint-kind validation; both endpoints must be accessible; no inferred hidden relation counts. |
| document_passages | id PK; document_version_id FK; page_no; section_key nullable; text; locator; text_hash | Unique document/page/locator; exact PDF text locator; no guessed equivalent passage on failure. |
| material_transactions | id PK; record_version_id FK; material_id FK records; event_at; known_at; type; quantity; unit; reverses_id nullable | quantity > 0; type = consumption/consumption_reversal/receipt/return/transfer/adjustment; reversal links consumption of same material/unit and total reversed cannot exceed original. known_at records source knowledge time, not actual seed time. |
| material_months | id PK; material_id FK records; month date; version_no; known_at; complete; source_version_id FK record_versions.id; reason nullable | Referenced version has kind material_coverage. Unique(material_id,month,version_no); append-only assertions. Select latest known_at at/before knowledge origin; complete/no-events permits zero, absent/incomplete is unknown. |

Record kinds and mandatory payload fields:

| Kind | Payload fields |
| --- | --- |
| part_family | family_code, description |
| part_definition | family_id, description, lifecycle_status, canonical_unit |
| part_revision | part_id, label, effective_from, effective_to nullable |
| assembly | part_id, description; membership uses typed relations and effectivity |
| batch | part_revision_id, started_on, completed_on nullable, production_quantity |
| physical_unit | part_revision_id, batch_id, serial_number; serial uniqueness within source |
| inspection | unit_id, batch_id, inspected_at, status, method, recorded_document_version_id nullable, discrepancy_flag |
| nonconformance | inspection_id, category, observed_at, description, review_state |
| maintenance_event | unit_id, event_at, category, recorded_observation, recorded_document_version_id nullable |
| document | document_id, revision_label, status, effective_from/to, private_object_key, page_count, content_hash |
| material | material_code, description, canonical_unit, related_part_id |
| material_transaction | material_id, type, quantity, unit, event_at, known_at, reverses_record_id nullable; typed transaction row references this exact version |
| material_coverage | material_id, month, complete, known_at, reason nullable; typed month assertion references this exact version |
| stock_snapshot | material_id, observed_at, on_hand, canonical_unit |

Inspection status = scheduled/in_progress/completed/cancelled. NCR detail is
read-only recorded information, not an operational approval control. Validate
inspection.unit's batch/part identity and recorded document applicability.
Preserve a bad/missing historical reference as a flagged limitation; do not
repair it by silently attaching the current document.

Record IDs embedded in typed payloads must match canonical record_relations
rows with real version foreign keys. Catalogue seed/maintenance transactions
validate referenced kinds and payload/relation agreement; a constraint trigger
rejects dangling or mismatched references. Do not treat JSON validation alone
as referential integrity. Normal product requests cannot edit these sources.

### Sessions, tools, evidence, and investigations

| Table | Required fields and relationships | Constraints |
| --- | --- | --- |
| query_sessions | id; owner_id FK; workspace_epoch; title; explicit_context; reply_language; created_at; updated_at | Private to owner; optional investigation association does not share entire chat. |
| turns | id; session_id FK; sequence_no; role; reply_to_id nullable; run_id nullable; channel; text; transcript_quality; delivery_state; delivered_audio_ms nullable; artifact_refs; created_at | Unique(session_id, sequence_no); role=user/assistant; channel=text/voice; quality=typed/provider_approximate/corrected; delivery=complete/interrupted. Store questions and answer transcripts, not audio or reasoning. Assistant text inherits artifact dependency restrictions. |
| analysis_runs | id; session_id FK; turn_id FK; owner_id; state; scope; dataset_id FK; supersedes_id nullable; deadline_at; error_code; created_at | One active run/user; states defined in A-07; completed result immutable. |
| run_events | run_id FK; sequence_no; type; payload; created_at | Composite PK; durable replay; no secret/provider reasoning payloads. |
| tool_operations | id; actor_id; run_id nullable; tool_name; request_key; args_hash; state; result_ref; created_at | Unique(actor_id, request_key); same key+different payload conflicts; stores effect result for retry. |
| artifacts | id; run_id FK; block_kind; payload; record_set_ref nullable; created_at | Immutable validated blocks; every record-backed claim has dependencies. |
| artifact_dependencies | artifact_id FK; record_version_id FK; passage_id nullable | Unique dependency tuple; aggregates depend on the full used record set, not just sample citation IDs. |
| record_sets | id; created_by FK; run_id nullable; dataset_id FK; query_definition; query_hash; scope; data_as_of; created_at | Immutable reproducible query/membership; read by creator or through a permitted saved artifact container, with all current dependency checks. |
| record_set_members | set_id FK; record_version_id FK; ordinal | Composite PK(set_id,record_version_id); immutable membership/order; drill-down IDs are not in-memory-only. |
| investigations | id; owner_id FK; workspace_epoch; title; primary_record_id nullable; current_version_id; created_at; updated_at | Private by default; no global admin read override. |
| investigation_versions | id; investigation_id FK; version_no; state; scope; finding_refs; note_content; evidence_refs; created_by; created_at; reviewed_by/at nullable | Unique(investigation_id, version_no); snapshot content immutable; state transition metadata audited; state=Draft/Ready for review/Reviewed. |
| investigation_members | investigation_id FK; owner_id; user_id FK; created_at | Composite PK; owner_id matches real owner; membership grants view/comment, not underlying sources or finding edits. |
| comments | id; investigation_id FK; version_id FK; author_id; text; created_at | Append-only for the demo; comment authorship preserved across reset and version changes. |
| reports | id; investigation_version_id FK; requested_by; state; snapshot; dependency_refs; object_key nullable; sha256 nullable; byte_count; created_at | Immutable content/version; state=preparing/ready/failed; English; ready PDF immutable. |
| voice_sessions | id; owner_id; query_session_id FK; provider_call_id; state; generation; lease_owner; lease_expires_at; created_at; ended_at | Server-bound call ID; one active generation/session; durable sideband lease. |
| action_requests | id; actor_id FK; run_id nullable; human_turn_id nullable; action; payload; payload_hash; expected_version nullable; origin; state; expires_at; authorized_at nullable | This ID is proposedActionId/explicitIntentId. origin=assistant_proposal/ui_command/human_text/human_voice_confirmed; state=proposed/authorized/committed/cancelled. Model proposals alone cannot become authorized. |
| confirmations | id; action_request_id FK; actor_id; action; payload_hash; expected_version; expires_at; consumed_operation_id nullable | Five-minute expiry; exact payload/action/actor/version binding; consume atomically with effect. |
| audit_events | id; actor_id nullable; action; target_kind/id nullable; outcome; request_id; safe_metadata; created_at | Append-only; no raw audio, keys, private question text, or unrestricted extracts. |

Investigation/session titles, entity/scope labels, note_content, comments, and
assistant transcripts also carry dependency_refs. Derived text inherits the
union of the source facts in its authored context; new user notes/comments
inherit the permitted source context displayed to their author. A manually
entered string is not certified as source-independent by model inference.
Store those references with the text; user-authored content is not an automated
data-loss-prevention guarantee.

Content immutability does not prohibit a guarded Draft→Ready→Reviewed status
transition on the same content version. Editing content creates a new version.
Foreign keys must reject cross-investigation report/comment/version references.
Create circular record/current-version and turn/run associations using nullable
initial pointers and deferred FK validation in a transaction; never commit a
dangling pointer. Add final constraints only after both tables exist.

Required indexes: records(source_id,kind,display_id), full-text GIN on searchable
authorized title/passage text, versions(record_id,version_no), event timestamps,
relations(from_version_id,to_version_id), usage(material_id,event_at,type),
grants(user_id,source_id), investigations(owner_id,updated/current version),
members(user_id,investigation_id), runs(owner_id,state), events(run_id,sequence),
dependencies(artifact_id,record_version_id), and audit(created_at,actor_id).
Use investigation updated_at for list sorting; update only metadata, never
historical version content. Index record-set membership and business known_at;
persist record sets and dataset manifests across redeploys.

### RLS and access predicates

- Every exposed table has explicit least-privilege grants and RLS; do not rely
  on new-table defaults. No anonymous engineering/session/report reads.
- Raw session/event/artifact/investigation-version/prose/report tables live in
  an unexposed private schema. Expose only explicitly granted, user-scoped
  security-invoker views/RPCs with safe projections; private-schema USAGE/SELECT
  needed by invoker code does not expose that schema through the Data API.
  Browser JWTs cannot select raw protected prose by guessing a table endpoint.
  No public RPC accepts arbitrary SQL or a relation name.
- profiles reads expose self; administrator management is a checked server action.
  User-editable metadata is not a role/source authority.
- Source records/versions/passages/usage are readable only through current source
  grants. Ordinary authenticated users cannot insert/update/delete source data.
- Source-aware functions/views run as invoker. Views use security_invoker where
  supported; privileged helper code is private, narrowly granted, and explicitly
  checks actor identity. Avoid blanket service-role catalogue queries.
- Session/turn/run/voice data is owner-only. An investigation may reference a
  saved artifact without sharing the owner's entire conversation.
- Investigation read = owner or membership; finding edit/share = owner and
  action capability; review = membership/owner plus reviewer capability.
  Presenter feature access does not override private ownership.
- Membership rows carry checked owner_id so their visibility policy can use
  user_id=actor or owner_id=actor without recursively reading investigations.
  Writes verify the actual investigation owner in one guarded transaction.
- Artifact read = accessible saved container/run plus access to **every**
  dependency. The metadata helper must not recurse through mutually dependent
  policies; test the actual migration with every account.
- Apply dependency checks to titles, list/search/filter labels, notes, comments,
  and transcripts before counting/ranking or returning them. A shared container
  with denied title/scope dependencies uses a generic Investigation label and
  omits protected entity references. Conservatively withhold an entire mixed
  saved content version when its dependency union is denied; offer creation
  of a permitted-scope version rather than returning raw prose. Independent
  authorized artifacts may be displayed only through their own checked access.
- Private Storage download requires current source/dependency access. Keep
  buckets private and proxy sensitive downloads through the authenticated app.
  Do not issue long-lived bearer links that outlive a permission change.

## A-05. API conventions

Base prefix /api. JSON requests use Content-Type application/json; cookie-backed
mutations verify same Origin and CSRF protection. All endpoints resolve the
actor from the server session and live profile/grants. GET responses with user
data are private/no-store. Use UUID identifiers; never trust owner_id, role,
source grants, or provider call IDs submitted by a client.

Success envelope fields: data; requestId; meta with dataAsOf, warnings,
nextCursor nullable, and schemaVersion. Error envelope fields: code; message;
retryable; requestId; fieldErrors optional. No stack traces or secret payloads.

Common statuses: 400 invalid input; 401 unauthenticated/inactive; 404 neutral
not-found for absent or inaccessible object; 409 stale version/conflicting key;
422 clarification/unsupported operation/insufficient data where not a normal
run outcome; 429 run/rate limit; 503 provider/source unavailable; 504 deadline.
Source-scope refusals do not disclose inaccessible source names/counts.

Date range contract: from/to ISO local dates inclusive in the visible UI;
server normalizes to [from 00:00, day after to 00:00) Asia/Karachi, represented
as UTC instants. Event-time filtering is explicit per record type. An omitted
range is unbounded within authorized available data; a relative range resolves
against a server-provided now. Show the resulting absolute dates.

RecordList fields: items, matchedCount, cursor, appliedFilters, sort, dataAsOf,
limitations. Default page 25, maximum 100; stable sort appends id as tie-breaker.
matchedCount includes only permitted and selected records. Cursor includes
filter/sort hash and is rejected if reused with a different query.

RecordResponse fields: id, displayId, kind, title, source label/id, versionId,
revision, eventAt, dataAsOf, fields, access, relationships summary, provenance.
Effective access is informational; the server rechecks it on later requests.
Aggregate/chart record sets are server-created opaque IDs bound to actor, scope,
dataset version, and full query definition. Reauthorize when paginating them.

### Endpoint register

| Method and route | Request fields | Result / rule |
| --- | --- | --- |
| GET /auth/context | none | Actor display, role, allowed actions/source labels, persona, epoch; no secrets. |
| POST /auth/sign-out | requestKey | Invalidate app session, close voice, clear user caches, return success. Supabase handles actual sign-in/session issuance. |
| GET /records | q, kind, filters, sort, cursor, limit | RecordList; typed filter allowlist; no SQL/expression string. |
| GET /records/{id} | versionId optional | Authorized exact or current record. |
| GET /records/{id}/relations | type, cursor | Accessible endpoints/counts only. |
| GET /record-sets/{id} | cursor, limit | Reproducible drill-down from the same analysis. |
| GET /documents/{id}/versions | none | Permitted revisions only. |
| GET /documents/{id}/content | versionId, passageId optional | Authenticated PDF bytes/locator; exact missing locator is unavailable. |
| POST /sessions | title nullable, context, replyLanguage | New private query session. |
| GET /sessions | cursor, limit | Owner-only session list with dependency-safe titles and current workspace epoch; historical archive is explicit. |
| GET /sessions/{id} | none | Owner-only ordered turns/completed results; current dependency redaction. |
| POST /query-runs | requestKey, sessionId, question, scope, previousRunId nullable, investigationId nullable, expectedEpoch | 202 runId/state/events URL, or clarification payload. |
| GET /query-runs/{id}/events | Last-Event-ID optional | SSE ordered durable events; replay never repeats tool effects. |
| POST /query-runs/{id}/cancel | requestKey | Fence generation, cancel provider/read work best-effort, return durable cancelled state. |
| POST /voice/sessions | sessionId, scope, SDP offer, requestKey | Server-created SDP answer, appVoiceSessionId, control URL, lease/rotation times; standard API key never returned. |
| GET /voice/sessions/{id}/control | authenticated upgrade, same Origin | App control WebSocket; server attaches to its stored provider call; cannot choose another callId. |
| POST /voice/sessions/{id}/end | requestKey | Fence generation, close sideband/peer association, persist final safe state. |
| POST /confirmations | proposedActionId, expectedVersion | Exact human-readable consequence plus nonce for an authorized actor's proposed action; creation alone does not authorize or execute it. |
| POST /actions/{id}/authorize | requestKey, expectedPayloadHash, confirmationId when required | Record explicit human UI/text/voice confirmation of a pending action and its target. The model cannot call this endpoint as a tool. |
| POST /investigations | requestKey, title, scope, findingIds, explicitIntentId, expectedEpoch | Private owner investigation/version 1; dependencies copied by reference, not trusted client values. |
| POST /investigations/{id}/versions | requestKey, expectedVersion, findingRefs, notes, confirmationId when replacing | New immutable content version; only owner. |
| POST /investigations/{id}/comments | requestKey, versionId, text | Shared authorized comment, max 4,000 chars. |
| POST /investigations/{id}/share | requestKey, recipientId, confirmationId | Owner-only membership grant, no source grant. |
| POST /investigations/{id}/review-state | requestKey, versionId, expectedState, targetState | Owner may submit Draft→Ready; reviewer/presenter marks Ready→Reviewed; explicit human origin. |
| GET /investigations | owner/status/entity filters, cursor | Permitted list; default owner's current epoch plus shared work; archive view explicit. |
| GET /investigations/{id} | versionId optional | Owner/shared snapshot with whole-block dependency redaction. |
| POST /reports | requestKey, investigationVersionId, explicitIntentId, allowIncomplete default false | Create permitted report snapshot/PDF; 202 preparing or 200 existing result. Broken-evidence preview needs explicit incomplete-draft intent before allowIncomplete is accepted. |
| GET /reports/{id} | none | Authorized status/version/preview metadata, not public object URL. |
| GET /reports/{id}/content | none | Recheck dependency access and stream canonical PDF bytes. |
| GET /governance/{sources,access,ai,audit} | audit cursor/filters when appropriate | Administrator only; metadata reflects real state; audit excludes private content. |
| POST /governance/sources/{id}/availability | requestKey, available/cached flags, confirmationId | Administrator's controlled failure scenario; no source-content edits. |
| POST /workspace/reset | requestKey, expectedEpoch, confirmationId | Presenter only; atomically advance own epoch/restore starter work; no source/global wipe. |

Question limit 4,000 characters; source scope max four; entity refs max 20;
comparison max 12 groups; response max 20 blocks/200 returned table rows, with
record-set drill-down for larger sets. Tool scope expansions must be explicit
and permitted. These are configurable technical demo limits; exceeding them
returns a clear refinement instruction, not silently truncated conclusions.

## A-06. Application tools and result contracts

Every invocation contains tool, schemaVersion, validated arguments, runId,
invocationId, and actor resolved server-side. Result contains operationId,
status, appliedScope, data, dependency IDs, recordSetId where applicable,
dataAsOf, limitations, and allowed action proposals. Tool IDs are stable:

| Tool | Accepted inputs | Output |
| --- | --- | --- |
| search_records | q, kinds, explicit filters, limit | Permitted matches/ambiguity, no hidden count. |
| get_record / get_related | recordId/version, relation kinds | Versioned fields/links and provenance. |
| search_documents / get_passage | text, permitted document/version constraints | Exact passages, locator and source version. |
| aggregate_records | kind, allowed filters/groupBy, metric enum | Group counts/metric definitions/full record-set lineage. |
| compare_batches | partId, batchIds, date range | Inspections, affected count, NCR count, rate and comparison records. |
| summarize_maintenance | unit/part refs, category/date range | Recorded recurrence and event timeline only. |
| forecast_consumption | materialId, horizon enum 1/3/6 | Forecast contract in A-08. |
| propose_view | approved internal destination plus validated filter object | Non-executable UI action descriptor; resolve only internal routes. |
| save_findings / draft_report | existing permitted run/artifact/version IDs and explicitIntentId | Proposed or committed private artifact/report; follows A-09. |

aggregate_records accepts a typed query plan, never SQL, JSONPath supplied by
the model, or arbitrary formulas. Allow fields per kind, comparisons eq/in/
between, groupBy from named fields, and metrics count/distinct_count/
inspection_discrepancy_rate/sum_consumption. Compile validated plans to
parameterized user-scoped queries. Related joins use named relationship types
and bounded depth two. New methods need an implementation tool, not a code runner.

Structured block payloads:

| Kind | Required fields |
| --- | --- |
| summary | text, origin=record_backed/general_explanation, evidenceIds |
| finding | title, text, origin=source_observation/computed_analysis/AI_interpretation, evidenceIds |
| metric | name, value nullable, unit, definition, numerator/denominator when rate, scope, period, recordSetId |
| table | approved columns with typed cells, rows capped, recordSetId, scope |
| chart | chartKind enum line/bar/distribution, series of numeric/time values, units, labels, recordSetId, scope |
| timeline | event refs with times/labels and evidenceIds |
| comparison | groups, metrics, recordSetIds, scope |
| entity_list | authorized record refs |
| forecast | exact A-08 result, not model-invented numeric arrays |
| limitation | code, understandable explanation, valid refinement/actions |

Evidence fields: id, recordId, recordVersionId, sourceId, displayId, revision,
eventAt, dataAsOf, passageId/page/section nullable, locatorStatus. Resolve evidence
server-side before showing a claim. Backend tool facts and numerical arrays
remain authoritative; model narrative cannot replace them.

Response fields: runId/sessionId, status complete/partial/clarification/
unanswerable/unauthorized/failed/cancelled, generatedAt, appliedScope, blocks,
evidence, limitations, availableActions. Each record-backed block inherits its
full tool dependency set; AI summary inherits the union of the facts it uses.
If lineage is ambiguous, conservatively assign the whole run dependency set.
General explanations have no fabricated citations and a visible origin label.

availableActions entries contain actionId, kind, label, typed target, expected
version, requiresConfirmation, and proposal ID. No arbitrary URL/script/markup
field. Chart specifications are fixed component schemas, not ECharts functions
or raw provider configuration.

Assistant transcripts are separate from validated factual artifacts. Persist
both roles, mark interrupted delivery, and apply the artifact dependency union
before redisplaying/reusing assistant text. An approximate transcript is not
proof that every generated word was heard.

## A-07. Text and voice orchestration

Text run states: validating → clarification OR retrieving → analyzing →
streaming → complete/partial/unanswerable/failed/cancelled. Unauthorized is a
neutral outcome without protected facts. Store transitions before publishing.
Stream types: run.state, transcript.updated, clarification, artifact.ready, action.proposed,
limitation, run.completed, run.failed, run.cancelled. Each has sequence/run ID
and schemaVersion. Stream narrative only after validating its evidence; partial
provider tokens are not persisted as completed findings.

Durable events contain artifact/turn/action IDs and safe state metadata, not
copied factual prose or unrestricted tool output. SSE replay/live delivery
reauthorizes and resolves those IDs against current dependencies. Suppress
revoked facts in historical events/transcripts as well as ordinary result GETs.

Use Responses function calling plus strict schema final artifacts. Retain the
provider continuation items needed by the current documented API, but persist
only safe application outcomes. Send only the current authorized context and
retrieved facts required for the task. Use store=false where supported and
document actual provider data controls; do not claim zero provider retention.

Voice uses Realtime WebRTC with unified server SDP setup. Server exchanges SDP
at the documented calls endpoint, binds returned provider call ID to owner,
session, scope, and generation, then returns only SDP and application identifiers.
The browser's authenticated same-origin control WebSocket keeps a Vercel Node
invocation alive; that invocation attaches the upstream server sideband using
the private key and server-stored call ID. Audio travels browser↔OpenAI.

Proposed Node control duration 300 seconds, lease 240 seconds, warning/rotation
preparation at 210 seconds. Confirm actual deployment support first. Persist
call state, operation IDs, scope, transcript events, and lease outside memory.
Use a single active lease; duplicate control connections cannot execute a tool
twice. Reconnects may reach another instance.

If same-call reattachment is proved safe, recover using the durable operation
log. Otherwise close and recreate the call with the last authorized completed
context and a visible reconnect state. Do not promise seamless rollover before
the compatibility test. Suspend new tool work without a valid control lease.
End/clear the voice session on logout or account change.

Check live source-grant version at each new human turn, before response
generation/tool execution, and on a 15-second control heartbeat. The trusted
flow disables automatic response creation and lets the server authorize each
new response. On access/scope change, stop speech and close/recreate the call
using reauthorized context; never reuse denied assistant text. Browser/provider
channel settings are not an authorization boundary: data already delivered
cannot be recalled, but no new application evidence is released without checks.

Realtime does not supply strict Structured Outputs on the researched model.
Use authoritative tool results for visual blocks and, when needed, the text
Responses adapter for validated final saved artifacts. Realtime speaks short
summaries of these results. Do not save Realtime-generated prose as a factual
artifact without the same evidence validation.

Enable approximate input transcription and output transcript events. Mark
provider transcripts as approximate; show interpreted identifiers/scope and
permit corrections. On ambiguity, obtain clarification before analysis/actions.
No raw audio enters application Storage or logs. Disclose AI-generated voice
in voice controls/help as required by the provider; this is distinct from
synthetic-data presentation.

Default language follows the latest question, with English/Urdu override.
Roman Urdu normally receives Urdu explanations, unless English is selected;
preserve original input. Mixed-language default uses the explicit override or
the latest clearly selected conversation language; expose the current choice.
Identifiers/units remain unchanged and bidi-isolated. Documents/reports remain English.

Interruption stops playback immediately, truncates unheard speech through the
provider's supported mechanism, and fences the superseded response generation.
Cancel pending read-only work best-effort; committed saves/exports remain
committed and are shown as such. Never dispatch an action from an interrupted
or incomplete function-arguments event. New turns use monotonically increasing
generation IDs. Late events from old generations cannot commit actions.

## A-08. Deterministic analytics

### Quality

Eligible set E = completed inspections satisfying current source access,
part/batch/date filters. A = distinct members of E whose recorded discrepancy
flag is true or that have a qualifying linked NCR. NCR count separately counts
linked NCRs under the stated category/date semantics. With a category filter,
affected inspection membership requires an NCR in that category; denominator
remains all eligible inspections in the selected production/date scope.

Default quality NCR count includes qualifying NCRs linked to inspections in E
that are known at analysis time, regardless of the NCR's separate observed_at.
Label this as NCRs on inspections in the selected inspection period. Chart
buckets also use inspection event time. Explorer may separately filter NCR
observed_at, but that is a different explicitly named query/record set.

Rate = 100 × |A| / |E|; denominator zero → null with reason no_completed_inspections.
Keep numerator/denominator exact; display rate to one decimal. Three NCRs in
two of ten inspections produce count 3 and rate 20.0%. Batch quantity is not
silently substituted as an inspection denominator.

### Material consumption and forecast

Series key = material ID and its canonical unit in this single deployment.
No location aggregation or unit conversion feature is needed. Sum consumption
quantities by event month, less valid linked consumption reversals attributed
to the original usage month as known at knowledge_as_of. Receipts, transfers,
stock adjustments, and unused inventory returns are excluded.
Reject over-reversal or mixed units as inconsistent history rather than
clipping a negative value. Historical replays use only events known by that
origin; do not use later reversals in earlier backtests.

Only explicit complete month coverage allows a missing transaction sum to be
zero. Missing/incomplete coverage is unknown. Exclude the current partial month.
Require the latest 24 consecutive completed months before the current calendar
month; otherwise return insufficient_history with coverage detail. Normal
fixtures provide 48 months; no model training service is required.

The training window is all consecutive complete months ending at the cutoff,
up to the latest 48, with a minimum of 24. Stop at the most recent coverage gap;
never skip a gap to join non-contiguous history. Use this identical window
rule at each historical evaluation origin. Filter training event/reversal and
coverage versions by business known_at <= knowledge_as_of, not by actual seed
ingestion time. The event cutoff (end of the prior complete month) is distinct
from live knowledge_as_of (the run's captured server now) and historical
knowledge_as_of (the fixed origin below).

Default output starts at the first day of the next full calendar month after
server now. Cutoff is the end of the preceding completed month. The current
partial month is a gap, not a zero. For each target month, seasonal-naive point
forecast equals that calendar month's observed usage one year earlier.
Return source month/version IDs. Support only 1/3/6 target months.

For T training months, seasonal residual e[t] = y[t] − y[t−12], t=13..T.
Estimate sigma² = sum(e[t]²)/(T−12). For forecast lead h measured from the last
training month, standard error = sigma × sqrt(floor((h−1)/12)+1).
Here displayed leads are 2 through H+1, at most 7. Approximate central 80% bounds
are point ± 1.2815515655 × standard error. Floor the lower bound at zero and
declare that adjustment; label the band approximate/model-based, with its
uncorrelated stable-error assumptions. No cumulative-total interval is shown.
If all residuals are zero, show the degenerate historical-error estimate with
an explicit no-observed-variation limitation, not a certainty claim.

Show point/lower/upper at one decimal for expected units; retain unrounded
values for calculations. A total, if displayed, sums unrounded points and
rounds once; do not sum rounded points or monthly interval endpoints.

Evaluation is chronological rolling origin using earlier complete history only,
the same excluded-current-month gap, and the same target leads. For each eligible
historical context month m, use the 15th at 12:00 Asia/Karachi as the knowledge
origin, select versions/coverage known by then, train through m−1 and evaluate target months m+1
through m+H. Use contexts with at least 24 preceding complete months and all
required target observations. Fit only origin-known training/coverage versions.
Score target actuals from the run's separate later evaluation snapshot:
current dataset and captured server now, with completed target months known
by that snapshot. Future targets need not have been known at the training
origin. Record both clocks and the target actual version IDs.
Report origin count, per-target-lead MAE and RMSE,
and observed band coverage. With fewer than six eligible origins, report
evaluation unavailable rather than a percentage accuracy score. No MAPE.

Forecast result: materialId/unit, asOf, trainingStart/end, forecastStart,
horizon, observedMonths with completeness/provenance, points with target month,
sourceMonth, point/lower/upper, method=seasonal_naive_v1, parameters including
period=12 and band level, evaluation metrics/sample counts, limitations, and
dependency IDs. Expose detail on demand; no named scenario model/table/UI.

Method basis and limitations: [forecast research](research/material-forecast-options.md).
This is a deliberately simple explainable demonstration baseline. It forecasts
observed usage, not unconstrained demand during stockouts or real fleet needs.

## A-09. Mutations, versions, reports, and reset

All effects require authenticated action grants, requestKey, and payload hash.
The same actor/key/hash returns the existing result; a changed payload returns
409. Database constraints and transactions, not process memory, enforce this.
Persist action outcome before acknowledging success.

Bind explicit save/export intent to the current human turn or direct UI action,
target IDs, and epoch. Retrieved text/model tool calls cannot themselves grant
intent. Voice proposals display the interpreted action/target; request user
clarification/confirmation when intent or a critical identifier is uncertain.
Replacement/share always consume a confirmation nonce for the exact payload.

Persist proposals in action_requests as proposed. Only a server-recorded human
command/confirmation can authorize them; assistant function output cannot set
that state. A direct UI command creates its own bound human-origin request.
An unambiguous explicit text command may authorize its exact target; otherwise
show the proposed action. Voice writes require matching the displayed target
and a clear human confirmation/correction; ambiguity remains proposed.
The execution transaction checks actor, active epoch/generation, intent state,
payload hash, expected version and required nonce, then consumes intent/nonce
with the idempotent operation. Expired/cancelled proposals cannot execute.

Returning a previous idempotent result must recheck current access to its
dependencies. Do not repeat the effect, but do not replay revoked factual
payloads merely because the original operation succeeded.

Owner creates Draft content versions and submits Ready for review. Reviewer
with membership or owner access and explicit review capability can mark that
version Reviewed. Review is human-document review, not technical/airworthiness
approval. Comments are separate attributed records. Owner content changes
create a new Draft version; historical Reviewed content/PDF remains immutable.

When reading saved content, re-evaluate every dependency with current grants.
Hide an entire affected block, including its derived prose/metrics, rather than
trying to strip protected phrases. Do not expose hidden record counts. Retain
an intelligible generic unavailable-content message and permitted independent
blocks obtained through their own checked access. Default to withholding the
whole saved version when mixed raw prose/notes cannot be safely separated.
A summary with mixed dependencies is hidden as a whole. Apply the same rule
to derived list titles, scope labels, notes, comments, and replayed assistant
transcripts, not only typed finding blocks.

Generate English report narrative from authorized findings with strict schema
and citation validation. Build title/metadata, scope, executive summary, typed
findings, charts/tables, evidence register, method/limitations, and reviewer/export
metadata. Render a canonical PDFKit PDF from one snapshot; preview that PDF in
the same viewer used for export. Include links/page numbers and a report/version
identifier, with no mandatory synthetic watermark.

Limit a demo report to 20 findings, 200 table rows, and 3 MB. Paginate long tables;
show a clear reduction instruction instead of silent truncation if bounds would
be exceeded. Store server-to-server in private Storage. Reauthorize the entire
report dependency set on every content request. If access was revoked, deny old
PDF bytes and offer generation of a new permitted-content Draft report; do not
relabel that redacted report as the historical Reviewed version.

Broken but non-protected citations: omit unsupported dependent findings from
the export snapshot, visibly list limitations in preview, and require the user
to export that visibly incomplete draft explicitly. No decorative invalid badges.
Already downloaded documents or already heard audio cannot be retroactively
withdrawn; current-request authorization applies to subsequent delivery.

Workspace reset is presenter-only and confirmed. Advance the presenter's
workspace_epoch atomically, fence its active runs/voice, and create the starter
session/investigation for the new epoch once. Normal owned lists show the current
epoch; historical items remain under Archives and shared users retain their
existing versions/comments. Do not change source versions, other users, grants,
memberships, or historical reports. Old-generation actions cannot appear in the
new epoch. Source regeneration is a separate privileged maintenance operation.

## A-10. Operations and deployment

Create resources only after build authorization. Use Vercel Git integration and
a provider-assigned domain; verify the actual project/team and resulting URL.
Use preview deployments for reviewed changes and a separate test database when
running destructive fixtures. Production/demo data and secrets must not be
available to untrusted preview code.

Server environment inputs: Supabase project URL/publishable key as appropriate,
server-only maintenance secret, OpenAI API key/model IDs, allowed application
origin, and configured run/voice limits. Browser code receives only non-secret
public configuration and server-generated SDP; never privileged keys.

Migrations contain explicit grants/RLS/private Storage policies. Apply migrations,
run seed integrity/access checks, provision four accounts through a privileged
script, then deploy and verify the assigned domain/cookies/redirect allowlist.
Keep maintenance credentials out of ordinary request paths. Document local
development against a local or isolated Supabase project; no local-inference setup.

Run database and Vercel regions near one another after verifying actual
availability. No specific tier/region entitlement or hostname is assumed.
Use bounded Node handlers, external durable state, user-specific no-store
caching, and no browser-persisted protected record/query content.

Audit sign-in/out, source-denied requests, tool operations, save/version/share/
review/export/reset, and administration. Store IDs, action/outcome, timing, and
safe error codes; private query text remains in owner-only sessions, not the
administrator audit view. Keep source status and hosted AI metadata factual.

Proposed operational defaults: 10 query starts/minute/user, one active run/user,
10 tools/run, 90-second text deadline, 240-second voice lease, 25-row pages,
100-row page ceiling, and the report limits above. They bound the public demo
without imposing enterprise delivery-budget work. Verify behavior with five
concurrent sessions across the four seeded accounts using the stated acceptance workload.

Implementation compatibility gates: model/account availability; locked package
build; authenticated deployed SDP/sideband; rotation/logout/current-grant
change; private PDF generation/download size; and all four RLS profiles. A gate
failure must be resolved or the technical plan revised explicitly, never hidden
behind a mocked product capability.
