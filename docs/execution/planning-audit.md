# Planning consistency audit

Date: 31 October 2026. Scope: documentation only. No application build,
provider/API call, database migration, provisioning, browser interaction,
runtime calculation, or interface pass was performed or established.

This audit checks the repository's accepted discovery decisions through Q42,
with the parent's report that the user accepted Q43, against the specification,
architecture, plan, dependency graph, ticket index, and all 15 draft tickets.
It does not approve implementation or ticket publication. Findings below are
contract corrections for the planning author, not claims of application defects.

## Findings requiring correction

### PA-001 — HIGH — Historical forecast replay has no historical knowledge clock

References: `docs/architecture/architecture.md`, **A-03. Domain and seed
specification**, **A-04. Database schema / Identity, sources, and records**,
and **A-08. Deterministic analytics / Material consumption and forecast**;
`docs/planning/tickets/bas-007-baseline-material-forecast.md`, **Implementation
requirements** and **Integration and verification**.

Problem: A-08 requires historical replays to use only transactions known at
each historical origin, excluding later reversals. `material_transactions`
declares `event_at` but no knowledge/availability timestamp. `created_at` on
record versions is an actual setup timestamp, since all synthetic history is
seeded together. Treating it as historical availability either excludes all
history from past origins or includes later knowledge. The single current
`material_months` row also cannot recover coverage known at a past origin.

Correction: distinguish event time, logical source-known time, and actual
database insertion time. Declare a seeded `known_at` (or equivalent immutable
source-version availability) for transactions/reversals and versioned coverage.
Define exactly which versions and completeness assertions are visible at each
origin/cutoff. Add a fixture with a reversal learned after its consumption
month and verify it changes later origins only. This preserves the already
accepted simple baseline; it does not require a new forecasting service.

### PA-002 — HIGH — Reproducible record-set IDs lack a durable definition and shared-read rule

References: `docs/architecture/architecture.md`, **A-04. Database schema /
Sessions, tools, evidence, and investigations**, **A-05. API conventions**
(aggregate/chart record sets and `GET /record-sets/{id}`), **A-06. Application
tools and result contracts**; `docs/product/specification.md`, **J-01**,
**AC-003**, and **AC-019**.

Problem: artifacts store `record_set_ref`, and record sets are opaque IDs bound
to an actor, scope, dataset version, and full query definition. No durable
record-set definition/membership or dataset manifest contract exists in A-04.
Re-running against current pointers after regeneration can disagree with a
saved chart. A set bound only to the creating actor also has no specified
authorized route for a shared-investigation reviewer to inspect the same set.

Correction: declare durable record-set storage, either an explicit table or a
fully specified immutable artifact payload, containing normalized plan,
dataset identity, exact member version IDs or equivalent reproducible version
selection, and calculation version. Define owner-only run reads and reads
through an authorized saved investigation container, both intersecting current
source access. Specify no protected counts on denial. Verify reproduction
after redeployment/regeneration and authorized shared drill-down. Assign this
base contract to BAS-003, with sharing integration in BAS-009.

### PA-003 — HIGH — Saved free-text surfaces fall outside dependency redaction

References: `docs/planning/discovery.md`, **D-028** and **D-038**;
`docs/architecture/architecture.md`, **A-04. Sessions, tools, evidence, and
investigations** (`investigations.title`, `investigation_versions.note_content`,
`comments.text`, and `scope`) and **A-09. Mutations, versions, reports, and
reset**; `docs/planning/tickets/bas-009-persistent-investigations.md`,
**Implementation requirements**.

Problem: the redaction mechanism tracks artifact dependencies and suppresses
whole artifact blocks. Shared titles, notes, comments, scope labels, and report
metadata can repeat source-derived facts but have no dependency rule. A
restricted recipient or an owner whose grant was revoked can still receive
the protected conclusion through these parallel fields even when the finding
block is hidden. Current source-access requirements are broader than artifacts.

Correction: define which metadata is safe/non-derived and how record-derived
notes/comments/title/scope are bound to dependency sets. A conservative
container/version dependency union for unclassified text is sufficient for
this demonstration. Recheck those dependencies on lists, snapshots, comments,
report generation, and file delivery, with generic replacement text and no
hidden counts. Add a case that repeats a material result in a note/title,
then shares with the restricted account and revokes the owner's materials
grant. Do not imply that arbitrary manual prose can be reliably classified
without an explicit conservative policy.

### PA-004 — MEDIUM — Category-filter acceptance contradicts denominator semantics

References: `docs/architecture/architecture.md`, **A-08. Deterministic analytics /
Quality**; `docs/product/specification.md`, **AC-024**;
`docs/planning/tickets/bas-004-quality-analysis.md`, **Implementation requirements**.

Problem: A-08 explicitly keeps all eligible completed inspections in the
denominator when an NCR category is selected; AC-024 says filters alter both
numerator and denominator consistently. The latter can be implemented as
removing inspections without that category from the denominator. A-08 also
refers to "stated category/date semantics" for NCR counts without specifying
whether an NCR's own `observed_at` is filtered or whether all linked NCRs for
in-scope inspection times count.

Correction: qualify AC-024: source/part/batch/inspection-date filters determine
E; category filters determine affected membership and NCR count without
shrinking E. Define the NCR date rule explicitly and use it in comparison,
chart, drill-down, and tests. Add a category fixture where one selected
category affects one of ten eligible inspections and yields 10%, not 100%.

### PA-005 — MEDIUM — Referenced domain entities and version targets are incomplete

References: `docs/architecture/architecture.md`, **A-03. Domain and seed
specification**, **A-04. Identity, sources, and records**, and **Record kinds
and mandatory payload fields**; `docs/planning/tickets/bas-003-connected-explorer.md`,
**Implementation requirements**.

Problem: HA-200 is a family and `part_definition.family_id` is required, but
the exhaustive record-kind/payload table declares no family kind or family
table. `material_transactions.record_version_id` must reference a version,
but there is no material-transaction kind/payload describing that version.
`material_months.source_version_id FK` does not name its target. These are
unresolved identity contracts, rather than implementation file choices.

Correction: add the family identity/payload and part-family relation. State
whether each ledger transaction is its own engineering record/version and add
that kind, or explicitly define an alternative parent-version model. Name the
coverage provenance FK target and invariants. Align fixture validation and
lineage with that decision before BAS-003 freezes the catalogue contract.

### PA-006 — MEDIUM — Question/answer transcript retention lacks an answer storage contract

References: `docs/planning/discovery.md`, **D-019**;
`docs/architecture/architecture.md`, **A-04. Sessions, tools, evidence, and
investigations** (`turns`), and **A-07. Text and voice orchestration**;
`docs/product/specification.md`, **AC-007** and **AC-013**;
`docs/planning/tickets/bas-011-bilingual-live-voice.md`, **Implementation requirements**.

Problem: the accepted requirement retains question/answer transcripts. `turns`
stores only `user_text`; A-07 says to retain provider output transcript events
but its enumerated durable application event types have no transcript event.
A validated visual artifact is not necessarily the actual spoken answer.
Interrupted speech also needs a defined distinction between generated and
heard content.

Correction: declare persisted assistant transcript segments or fields, their
turn/generation/sequence relationship, approximate/corrected status, and
interruption marker. State whether unplayed generated transcript is retained
and how it is labeled. Keep provider speech transcript separate from validated
factual artifacts. Verify resume after interruption and redeployment without
retaining raw microphone/generated audio.

### PA-007 — MEDIUM — Intent and action-proposal identifiers have no issuance/lifecycle contract

References: `docs/architecture/architecture.md`, **A-04. Sessions, tools,
evidence, and investigations**, **A-05. Endpoint register**
(`POST /confirmations`, `POST /investigations`, `POST /reports`), **A-06. availableActions**,
and **A-09. Mutations, versions, reports, and reset**;
`docs/planning/tickets/bas-009-persistent-investigations.md`, **Implementation requirements**.

Problem: endpoints require `explicitIntentId` or `proposedActionId`; action
descriptors have `actionId` and a proposal ID. Confirmation nonce issuance is
defined, but no normative contract says how these prior IDs are issued,
stored, expired, or verified. A-09 correctly says a model call cannot grant
intent, but does not specify the trusted source of the IDs. Builders can
otherwise invent incompatible or client-forgeable mechanisms.

Correction: specify one server-issued action/intent record or equivalent
durable operation payload. Define human UI/turn origin, actor/session/epoch,
target/payload hash, expiry, one-time versus idempotent reuse, and relation
between action/proposal/confirmation IDs. Give a direct UI save and a spoken
explicit-save sequence. Include forged/mismatched/expired intent tests. This
need not add user-facing confirmation to ordinary explicitly requested saves.

### PA-008 — MEDIUM — Forecast window selection is ambiguous despite exact-formula acceptance

References: `docs/architecture/architecture.md`, **A-08. Material consumption
and forecast**; `docs/product/specification.md`, **10. Analytics and forecasting**,
**AC-021**; `docs/planning/tickets/bas-007-baseline-material-forecast.md`,
**Acceptance criteria**.

Problem: eligibility requires the latest 24 consecutive complete months, normal
seeds provide 48, and the uncertainty formula uses T training months. It is not
stated whether T is exactly 24, all available consecutive months, or a bounded
window, nor whether historical origins use the same window policy. Point
forecasts can match while sigma, bands, and evaluation differ.

Correction: choose a deterministic window, for example all consecutive complete
history ending at cutoff with a documented cap and minimum 24, and apply the
same selection rule at every historical origin. Declare how an earlier missing
month bounds that window. Include a fixture where the first 24 and last 24
months have different seasonal residual variance so tests prove the choice.

### PA-009 — HIGH — Stream replay and continuing voice context need revocation rules

References: `docs/planning/discovery.md`, **D-028** and **D-035**;
`docs/architecture/architecture.md`, **A-04. Sessions, tools, evidence, and
investigations** (`run_events`, `voice_sessions`), **A-05. Endpoint register**
(`GET /query-runs/{id}/events`), and **A-07. Text and voice orchestration**;
`docs/architecture/research/implementation-compatibility.md`, **Server authority
with direct audio**; `docs/planning/tickets/bas-011-bilingual-live-voice.md`,
**Implementation requirements**.

Problem: durable run-event replay is owner-authorized, while source revocation
is described chiefly at saved-block reads and subsequent tool invocations.
Persisted SSE event payloads could contain old source-backed text. A Realtime
call also retains earlier authorized provider context; after revocation, a
tool-free request to repeat the previous material answer can reuse those facts
without invoking any tool that rechecks grants. The repository's compatibility
research explicitly recommends closing/recreating calls on access/scope changes,
but the normative orchestration contract does not define that transition.

Correction: define factual durable events as artifact references resolved
through current access, or reauthorize/redact payloads at each replay/delivery.
Define an access-generation check for every new turn/control operation and
before releasing facts to voice; invalidate/close provider context on changed
grants and recreate with only currently authorized context. State the bounded
handling of changes during an already-live connection and acknowledge that
previously delivered/heard content cannot be withdrawn. Test SSE reconnect
after revocation and a no-tool voice follow-up after revocation. Use the same
rule for live transcript reads and browser cache invalidation.

## Dependency and scope checks

- The graph, ticket-index `blockedBy` arrays, and all 15 ticket **Blocked by**
  sections agree. No cycle or disagreement in direct blocking edges was found.
- BAS-002 before BAS-008 and BAS-011 correctly prevents final voice capability
  from depending solely on untested provider/host assumptions. No deployed
  compatibility pass is claimed by these drafts.
- BAS-003 owns complete seed records before BAS-004–007. BAS-006 completes PDF
  bytes/locators; BAS-003 explicitly limits its earlier journey to metadata, so
  the absence of a BAS-006 dependency for metadata Explorer is intentional.
- The six principal destinations plus separately gated Governance resolve the
  concept's navigation count. Comfortable tables, persona-focused entry paths,
  baseline-only forecasts, English documents, bilingual interaction, realistic
  presentation, and independent post-build reviews match the accepted direction.
- A-08's forecast starts next calendar month and deliberately leaves the current
  partial month as a gap. This is an explicit proposed technical convention,
  not an arithmetic error. It needs final package approval, not an invented
  claim that the user selected that exact forecast start.
- Provider/model/package identities and forecast method are marked technical
  proposals with compatibility gates. No application verification can be
  inferred from planning completeness or a future ready-for-agent label.

## Synchronization notes, separate from contract findings

At audit time, discovery's shared-understanding section, requirements' status/
open-decisions wording, architecture decision-index summary, verification-
approach status, progress, and original review-findings still describe pre-Q43
or pre-specification work. The parent is finalizing these concurrently. Update
them to the accepted Q43 state and link resolved RF items to the completed
planning contracts; do not interpret this transient staleness as permission to
implement. Historical research should retain its research-date context while
clearly pointing to later decisions that supersede its old open questions.

The remaining gate is user approval of the completed specification/plan and
ticket breakdown. All application implementation, resources, and publication
remain pending that authorization.

## Resolution verification

Verified by rereading the revised planning contracts on 31 October 2026.
The original findings above are retained as the audit trail. All nine are
**resolved in documentation**; no application/runtime behavior is verified.

| Finding | Documentation resolution verified | Runtime status |
| --- | --- | --- |
| PA-001 | Architecture A-04 adds business `known_at` and append-only coverage versions. A-08 distinguishes event cutoff, live/historical knowledge origins, origin-known fitting, and the later evaluation snapshot/target version IDs. BAS-007 owns the later-known reversal check. | Unverified; requires seeded clock and no-lookahead tests. |
| PA-002 | A-04 adds datasets, durable record sets and exact member versions, plus creator/shared-container access intersected with current dependencies. BAS-003 owns durable drill-down; BAS-009 adds saved-container sharing. | Unverified; requires redeployment/regeneration and shared-read checks. |
| PA-003 | A-04/A-09 extend dependencies to titles, labels, notes, comments and transcripts, with safe projections, generic labels and conservative whole-version withholding. Raw prose is in an unexposed schema. BAS-009 includes direct Data API and prose checks. | Unverified; actual grants/RLS/projections must be tested. User-authored text is explicitly not a DLP guarantee. |
| PA-004 | A-08 fixes NCR counts to inspection-period membership and states separate observed-time queries. Specification AC-024 now distinguishes eligible-set filters from category-only numerator/NCR filters. | Unverified; requires category/date reconciliation fixtures. |
| PA-005 | A-04 declares `part_family`, `material_transaction`, and `material_coverage`, links typed transactions to their exact versions, and names coverage's `record_versions.id` target and required kind. | Unverified; requires migration and seed integrity checks. |
| PA-006 | A-04 turns now store user/assistant roles, text and transcript quality, delivery state/audio position and artifact references. A-06/A-07 distinguish factual artifacts from approximate/interrupted transcripts and add transcript events. | Unverified; requires interruption/resume and persistence checks without audio storage. |
| PA-007 | A-04 adds persisted action requests and nonce relationships. A-05 adds the human authorization endpoint; A-09 defines human origins, expiry, payload/version/epoch checks and atomic consumption. | Unverified; requires forged/expired intent, replay and concurrency tests. |
| PA-008 | A-08 specifies the same contiguous window at every origin: at most the latest 48 complete months, minimum 24, stopping at the latest gap. | Unverified; requires exact variance/window fixtures. |
| PA-009 | A-07 limits durable events to IDs/safe metadata and reauthorizes replay. New turns/responses and a 15-second heartbeat check grants; changed access closes/recreates voice with permitted context. BAS-011 includes revoked no-tool follow-up/replay acceptance. | Unverified; requires deployed voice/provider, SSE and cache tests. |

The implementation plan's **Migration ownership and parallel prerequisites**
also resolves the new cross-branch schema dependency: BAS-001 owns core/dataset
foundations, BAS-002 owns initial sessions/runs/voice, and BAS-003 creates record
sets with a nullable, initially unbound run association. BAS-008 adds its run FK
after both branches exist. Later passage/usage/investigation/report tables have
named owners, and no branch may reference an unlanded table. This is a coherent
documentation-level phasing rule; actual migration ordering remains untested.

No remaining high-impact contradiction from PA-001–009 was found in the revised
contracts. This resolution review does not establish build, interface, provider,
security, numerical, migration, or deployment acceptance and does not authorize
implementation or publication.
