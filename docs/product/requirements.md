# Baseerat AI requirements

Status: complete package and ticket breakdown approved for implementation by
the user on 31 October 2026. No application implementation has started.
Updated: 31 October 2026.

## Source

The user supplied "BASIRAT AI — Frontend Product & Technical Specification",
version 1.0, dated 27 October 2026. Its original text is preserved in
[source-concept-v1.0.txt](source-concept-v1.0.txt).

The source is a concept baseline. Its recommendations, proposed personas,
example records, and acceptance targets are not automatically final decisions.
Interview answers will refine the requirements below.

## Confirmed planning constraints

- Work is limited to discovery, architecture, specification, and planning.
- The user must approve the completed specification and implementation plan
  before application implementation begins.
- Track issues in mateldragoran/Baseerat-AI using the connected GitHub integration.
- Use the five default triage labels recorded in ../agents/triage-labels.md.
- Maintain repository documentation and self-contained implementation tickets.

## Confirmed product boundaries

The user's interview answers supersede conflicting wording in the source
concept. Later answers supersede earlier ones where explicitly noted. See
[discovery.md](../planning/discovery.md) for decisions and their identifiers.

- Product name: **Baseerat AI**, in English. Do not append an Urdu rendering
  to the name. This branding rule does not prohibit Urdu AI interaction.
- The first release is a functional evaluation prototype with synthetic data,
  real backend behavior, and genuine handling of unexpected questions and
  failure cases. It must not claim institutional production readiness.
- Use realistic normal product presentation without mandatory demo/synthetic
  banners or watermarks. The user will disclose the synthetic nature verbally.
  This supersedes the source concept's mandatory visible synthetic-data labeling;
  keep the actual data origin documented in repository/provenance records.
- Build a greenfield application in the existing Baseerat-AI repository.
- The primary user is a quality engineer investigating recurring component
  discrepancies. Material planning is a required supporting workflow;
  leadership and security evaluators review the capabilities.
- Serve one organization for now. Multi-organization tenancy is outside scope.
- English remains the interface and synthetic engineering-document language.
  AI interaction supports English, Urdu script, Roman Urdu, and mixed
  English/Urdu questions through text and voice. Preserve identifiers, revision
  labels, and units. This supersedes the Round 1 English-only AI scope.
- Default the answer to the latest question's language, with an explicit
  English/Urdu override. Spoken output summarizes findings while detailed
  tables, charts, and citations remain inspectable on screen.
- Engineering source records are read-only in Baseerat AI. Do not modify
  inspections, specifications, stock transactions, or maintenance records.
  App-owned investigations, notes, report drafts, preferences, and authorized
  administration may be editable. Named planning scenarios are deferred under D-037, confirmed in Q43.
- Use the OpenAI API for first-release AI, including voice. Actual local
  inference is not a first-release acceptance requirement. Eventual institutional
  deployment remains a separate scope. Do not describe hosted inference as local.
- Voice is live conversational audio with follow-up questions and interruption.
  Typed input remains available in the same investigation. Save question/answer
  transcripts with sessions, discard microphone recordings after processing,
  and keep generated speech transient in application storage. Provider retention
  is separate. API/model defaults, transcript semantics, and failure behavior are specified
  in the architecture reference, with real-provider compatibility gates.
- A voice-specific failure falls back to typed input in the same session where
  the text service is available. Provider-wide AI outages leave saved content
  and Explorer usable; new AI requests show unavailable/retry states. Stop
  playback immediately on interruption and prevent duplicate saves/exports
  during retries or reconnection.
- Make Overview, Ask, Data Explorer, Quality, Maintenance History, Material
  Planning, Engineering Knowledge, Investigations/PDF reports, and Governance
  functional. Predictive Models is a catalogue/status view; interactive
  relationship graphs are deferred.
- Use curated, reproducible synthetic seed data and documents, with controlled
  demo reset and source-outage cases. User uploads, spreadsheet imports, and
  live institutional connectors are deferred.
- Use administrator-provisioned accounts with real authentication and
  server-enforced permissions. Institutional SSO and public self-registration
  are deferred.
- Investigations are private by default and may be explicitly shared with
  selected organization users. Sharing does not grant additional access to
  underlying engineering records. Collaboration permissions follow D-038 and the architecture version/access rules.
- Provision administrator, full-scope analyst, restricted-scope analyst, and
  reviewer accounts. Make all features easy for the presenter to demonstrate;
  the implementation must still enforce each account's actual permissions.
- The presenter/admin has all four source scopes and all features, but no
  automatic access to another user's private investigations. Full analysts
  access all four sources without administration; restricted analysts access
  Engineering Registry and Production & Quality only. Reviewers read all four
  sources and shared investigations, add review notes, mark Reviewed, and export
  permitted reports; they cannot modify findings.
- Give the presenter explicit access to every demo feature and synthetic dataset,
  with a launchpad for flagship workflows and real authenticated account changes.
- Use hosted Supabase PostgreSQL, Auth, and private document/report storage
  alongside Vercel. Detailed schema, policies, and account/session flows are specified in the
  architecture reference; no hosted resources have been provisioned.
- Deploy on Vercel at a Vercel-provided *.vercel.app HTTPS address behind
  application sign-in. baseeratai.vercel.app is the user's example, not a
  reserved, assigned, or availability-verified address. Retain local development.
- The user will make the demo primarily with coding agents. Commercial delivery
  constraints, staffing estimates, launch dates, and budgets are not part of the
  requested discovery. Technical operating limits still need acceptance criteria.

## AI capability scope

The user rejected the proposal to limit the AI to interpretation/explanation
and subsequently accepted a multi-step assistant workflow (D-015): search
records and documents, compare batches, analyze trends, produce charts and
forecasts, navigate relevant views, save findings, and draft reports.

Accepted action policy (D-024): searches, analyses, and previews may run
automatically; saving/exporting occurs on explicit request. Replacing existing
content or sharing an investigation requires confirmation. Marking an
investigation Reviewed requires an explicit human action.

After a plain-language explanation, the user selected approach A (D-025): the
AI combines flexible application tools for querying, calculations, forecasts,
charts, and saved artifacts. It may combine tools to answer unscripted questions;
the interface is not limited to prewritten example prompts. General-purpose
generated SQL/Python execution is outside the first release. An analytical
operation unsupported by the available tools requires an added tool or an
honest limitation. The engineering-source read-only boundary remains unchanged.

## Confirmed domain and evidence rules

- Distinguish part/design definitions and their revisions from production
  batches and serialized physical units. Maintenance history concerns physical
  units; quality analysis can compare batches and part definitions.
- Preserve the exact document revision recorded for an inspection or maintenance
  event. Flag applicability mismatches; do not silently replace a historical
  reference with the latest revision.
- Saved findings preserve captured values, filters, and source versions. Refresh
  creates a new result version rather than overwriting historical analysis.
- Recheck current permissions when opening or exporting saved content. Hide
  content derived from sources the viewer can no longer access. Detailed
  provenance/redaction rules are specified in architecture A-04/A-07/A-09.
- For an unavailable source, last-synchronized records may be used with visible
  age/staleness. Without usable cached records, return partial/unanswerable
  results rather than fabricating completeness.
- The default inspection discrepancy rate is completed inspections with at
  least one discrepancy divided by all completed inspections in the same scope.
  Display nonconformance counts separately and expose numerator/denominator.
- Forecast monthly material consumption in units at 1-, 3-, and 6-month horizons,
  default 3, with history, uncertainty, assumptions, and source records.
  Purchasing decisions are outside scope. Method and consumption accounting
  are specified in approved architecture A-08, subject to runtime verification.
- First-release report narratives and engineering documents remain English;
  original-language conversations remain in session history. Urdu PDF reports
  are deferred.
- Relative-date questions use the real current date. Generated recent source
  history remains stable until deliberately refreshed, and ordinary timestamps
  display in Asia/Karachi. No special demo reference-date banner is required.
- Forecasting targets recorded actual consumption, excluding stock receipts,
  transfers, and inventory adjustments. Complete no-use months are zero;
  missing/incomplete months are unknown. Use complete calendar months for
  training and show the forecast start and data-coverage limitations.
- Shared investigations permit viewing/comments, with finding edits reserved
  to the owner. Authorized reviewers explicitly mark Reviewed; changing reviewed
  findings creates a new Draft version and preserves the older reviewed version.
- Reset workspace restores the presenter's starter sessions/investigations after
  confirmation. Preserve source history and other users' work; regenerate source
  data only through a separate maintenance operation.

## Simplified demonstration and interface quality

The user emphasized that this is a demonstration, not a production or MVP
delivery. Keep genuine functionality across the agreed visible workflows and
avoid adding enterprise machinery or unnecessary controls. Q43 confirms D-037: provide
one baseline material forecast with material/horizon selection, history, uncertainty,
and an understandable method explanation; defer named what-if scenarios and
percentage-adjustment editing.

The user's D-040 direction supersedes dense/compact table presentation in the
concept. Use clear visual hierarchy, understandable next actions, readable
comfortable tables where they aid the task, progressive disclosure, and
persona-specific entry points. Desktop is primary; responsive layouts and Urdu
text handling remain required.

Read [interface-guidelines.md](interface-guidelines.md) for the project interface
rules derived from the installed better-* skills. Apply the separate reviewer
agent gate in [interface-review-policy.md](../execution/interface-review-policy.md)
after each application build; no application interface has yet been built or
reviewed.

## Repository discovery

The repository was empty when cloned. It has no application framework,
dependencies, data models, authentication, APIs, tests, deployment configuration,
or implemented features to assess or reuse. Only planning setup files exist.
The concept includes no alternate application source-repository URL.

The user confirmed greenfield work; no additional source codebase is expected.

## Requirement registry

These identifiers are stable. AC-001 through AC-031 in the specification provide
the corresponding observable acceptance criteria; the third/fourth columns below
retain provenance and verification topics.

| ID | Requirement from the concept | Source sections | Verification direction |
| --- | --- | --- | --- |
| REQ-001 | Answer natural-language engineering questions using explicit scope, context, and structured results. | 1, 7.2, 9, 12 | Unscripted in-domain questions, clarification, cancellation, recovery, and resume. |
| REQ-002 | Support independently searchable engineering entities and connected source records. | 7.3, 9, 11 | Find records by identifier; traverse relationships; reproduce URL filters. |
| REQ-003 | Ground findings in inspectable, permission-accessible evidence. | 7.2, 7.5, 9, 12 | Reconcile findings to records and exact document revisions/passages. |
| REQ-004 | Use one coherent fictional aerospace dataset spanning four simulated sources; retain origin in repository/provenance records without mandatory presentation badges. | 1, 11, superseded presentation by D-032 | Validate references, chronology, negative cases, internal origin, and realistic normal presentation. |
| REQ-005 | Provide quality and maintenance analyses that reconcile with underlying records. | 7.4, 12 | Compare displayed counts and charts with scoped records. |
| REQ-006 | Provide an explainable baseline material forecast; named scenarios are deferred following D-037 and Q43. | 7.4, 9, 12; D-037 | Reproduce forecasts, inspect inputs/methods, and exercise insufficient-data handling. |
| REQ-007 | Persist sessions, investigations, findings, evidence, notes, and report versions. | 7.2, 7.6, 9 | Refresh/resume; preserve scope and evidence identity; distinguish saved and refreshed analysis. |
| REQ-008 | Preview and export English reports subject to current permissions; no mandatory synthetic-data watermark under the latest presentation choice. | 7.6, 12, 13; D-032, D-034 | Match reviewed content; test restricted and broken-evidence exports. |
| REQ-009 | Enforce authorization consistently on the server across search, retrieval, evidence, and exports. | 2, 4, 7.7, 13 | Cross-role requests and non-disclosure of inaccessible content or metadata. |
| REQ-010 | Report actual source, inference, permission, and audit state in Governance. | 7.7, 12 | Compare displayed status with configured behavior and recorded events. |
| REQ-011 | Permit customer-controlled deployment without mandatory external inference. | 1, 4, 13 | Validate the eventual deployment profile; first-release obligations remain open. |
| REQ-012 | Provide accessible desktop workflows, clear error states, and consistent shared interactions. | 5, 6, 8, 13, 14 | Keyboard, focus, responsive layout, recovery, and measurable accessibility checks. |

## Interview-added requirements

| ID | Confirmed requirement | Source | Verification topics (defined by matching AC in specification) |
| --- | --- | --- | --- |
| REQ-013 | Provide OpenAI-backed live voice with follow-ups, interruption, on-screen evidence, and typed input in the same investigation. Retain text transcripts rather than raw audio in application storage. | D-008, D-016, D-019 | Transcript semantics, interruption/reconnection, fallback, deletion timing, and selected API/model. |
| REQ-014 | Support English, Urdu script, Roman Urdu, and mixed English/Urdu questions; answer in the latest question's language unless overridden. Keep UI/docs English and technical identifiers unchanged. | D-008, D-017, D-018 | Bilingual evaluation set, speech quality, language switching, Urdu layout, and identifier preservation. |
| REQ-015 | Support multi-step AI-led investigation, analytical views, saved findings, and report drafting with the accepted action-confirmation policy. | D-015, D-024 | Concrete task cases, execution boundaries, confirmation/idempotency, and auditability. |
| REQ-016 | Host the authenticated demo on Vercel with a provider domain and durable Supabase PostgreSQL/Auth/private Storage. | D-020, D-022 | Actual assigned URL, auth, policies, deploy/redeploy persistence, and voice/data connectivity. |
| REQ-017 | Make every implemented feature easy to demonstrate using explicit presenter grants and a launchpad, retaining real permission contrasts between four accounts. | D-021, D-023 | Presenter grants, launch/navigation flow, account transitions, and restricted-access tests. |
| REQ-018 | Distinguish part definitions/revisions, production batches, and serialized physical units; preserve exact event revision references and flag mismatches. | D-026, D-027 | Entity identity, batch/unit navigation, historical applicability, missing/mismatched revision cases. |
| REQ-019 | Preserve saved analysis values/scope/source versions; create a new version on refresh; apply current permissions to saved views and exports. | D-028 | Snapshot reproducibility, refresh versioning, access revocation, and derived-content redaction. |
| REQ-020 | Let AI compose flexible application query/analysis/artifact tools for unscripted workflows; exclude a general-purpose generated-code execution environment from the first release. | D-025 | Unscripted tool combinations, unsupported-operation handling, permission-scoped execution, and result reproducibility. |
| REQ-021 | Forecast monthly material consumption in units at 1/3/6-month horizons, default 3, with inputs, uncertainty, and reproducible methods. | D-029, D-042 | Actual-usage accounting, complete/missing/zero months, model evaluation, and interval interpretation. |
| REQ-022 | Enforce the four accepted account profiles, source scopes, private-investigation boundaries, and reviewer action limits. | D-030 | Role/source/action matrix and negative cross-account tests. |
| REQ-023 | Permit stale cached source records only with age/staleness disclosure; handle no usable cache as partial/unanswerable. | D-031 | Source outage, cache age, recovery, and completeness states. |
| REQ-024 | Calculate inspection discrepancy rate from unique affected completed inspections and all completed inspections in the same scope; expose NCR counts separately. | D-033 | Multiple NCRs per inspection, zero denominator, filters, and record reconciliation. |
| REQ-025 | Keep documents and report narratives English while retaining bilingual conversation history. | D-034 | English report generation from Urdu/English investigations, identifiers, and citations. |
| REQ-026 | Use realistic normal product presentation without mandatory demo/synthetic badges, leaving synthetic-data disclosure to the presenter. | D-032 | Review normal pages and exports; retain internal dataset origin. |
| REQ-027 | Provide polished, understandable, persona-based responsive UI/UX using the installed better-* skills; comfortable readable data presentation replaces dense tables. | D-040 | Task clarity, progressive disclosure, persona entry points, accessibility, responsive/RTL behavior, and rendered evidence. |
| REQ-028 | Dispatch a separate reviewer agent after every application build to check the better-* interface skills, record evidence, and verify fixes. | D-040 | Reviewer dispatch, six-domain coverage, runtime/source evidence, verdict, and rebuild/re-review records. |
| REQ-029 | Use real-current-date ranges, stable recent history, and Asia/Karachi timestamp display. | D-036 | Boundary-date ranges, timezone conversion, no silent source-date shifts, and refresh behavior. |
| REQ-030 | Restrict finding edits to owners, support shared comments/review, and preserve reviewed versions when a new draft is created. | D-038 | Cross-user write checks, transitions, review provenance, and immutable historical versions. |
| REQ-031 | Provide confirmed presenter-workspace reset without changing source history or other accounts' work. | D-039 | Reset boundaries, starter restoration, sharing/history effects, and idempotent retries. |

REQ-011 is a future-deployment objective, not an obligation to implement local
inference in this release. REQ-013 and REQ-014 supersede conflicting language
and first-release inference assumptions in the original concept.

## Purposeful motion amendment

The user requested motion-design only where an effect makes the interface more
polished and useful. Refine REQ-027/028 accordingly: evaluate evidence-panel
transitions, control feedback and actual save/voice state changes; adopt only
those with task benefit. No ambient decoration, theatrical sequence or minimum
animation count is required. Follow [motion-guidelines.md](motion-guidelines.md)
and include adopted effects in the existing independent UI/accessibility review.
This amendment changes no ticket dependencies. It is included in the final
package approved for implementation on 31 October 2026.

## Technical design and approval state

The user confirmed product scope, the baseline-only forecast simplification,
and verification seams in Q43. Technical implementation defaults and acceptance
targets are approved in [specification.md](specification.md) and
[architecture.md](../architecture/architecture.md), supported by cited research.
They are not implemented or measured. Final approval followed Q43 on 31 October 2026.

See the specification's explicit Out of Scope list, [implementation plan](../planning/implementation-plan.md),
[dependency graph](../planning/dependency-graph.md), and [implementation tickets](../planning/tickets/README.md).
The user approved the package and ticket breakdown on 31 October 2026. No unresolved
product question has been silently filled with a claimed user decision;
credential access, package/provider compatibility, language quality, and runtime
measurements are explicit implementation gates.

Original input and the decision history remain in source-concept-v1.0.txt and
[discovery.md](../planning/discovery.md). The documentation-only consistency audit
and resolution record are in [planning-audit.md](../execution/planning-audit.md).
