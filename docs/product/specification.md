# Baseerat AI specification

Version: 1.1, 31 October 2026. Status: approved by the user for implementation.
Tracker specification: [GitHub issue #1](https://github.com/mateldragoran/Baseerat-AI/issues/1).
Product scope and verification seams were confirmed in Q43. On 31 October 2026
the user approved the complete package and ticket breakdown and authorized the
build. These are implementation contracts; real behavior remains to be verified.

## Problem Statement

An engineer investigating a component discrepancy must connect specifications,
production batches, inspections, service history, and material records. Finding
an answer is insufficient unless its scope, calculations, applicable revisions,
and supporting records can be inspected and preserved.

The first release demonstrates this investigation experience using a coherent
fictional engineering dataset. There is no existing application to extend and
no validated knowledge of PAC's actual information systems or processes.

## Solution

Build a polished, responsive engineering intelligence demonstration named
**Baseerat AI**. Its primary workflow is a quality engineer asking a question,
examining evidence, exploring connected records, and saving an investigation
with an English report. A functional material-consumption forecast supports
the demonstration. Leadership and security evaluators can inspect findings and
real permission boundaries.

Users interact through English, Urdu, Roman Urdu, and mixed-language text or
live voice. OpenAI supplies hosted AI; Vercel hosts the application; Supabase
provides PostgreSQL, authentication, and private files. Engineering sources are
read-only. The AI composes application tools rather than executing arbitrary
generated programs.

### Objectives and success measures

| Objective | Observable success |
| --- | --- |
| Investigate across sources | Complete J-01 with source-backed findings from more than one permitted domain. |
| Establish trust | Counts reconcile to records; historical citations resolve to exact revisions; missing evidence is visible. |
| Demonstrate useful AI | Complete distinct, unprepared questions within supported operations without canned production answers. |
| Demonstrate bilingual interaction | Complete the language acceptance set in text and live voice, preserving identifiers and evidence. |
| Demonstrate persistence and access | Resume saved work; distinguish four real accounts; reject unauthorized direct requests. |
| Communicate the product clearly | Each persona finds its primary task and next action; independent interface reviews cover the rendered flows. |

Normal presentation has no mandatory demo/synthetic badges or watermarks. The
presenter handles disclosure verbally; dataset origin remains documented
internally. Operational labels must still reflect actual backend state.

## User Stories

1. As a quality engineer, I want a relevant starting workspace, so that I can begin an investigation without unrelated dashboards.
2. As a presenter, I want direct links to flagship workflows, so that every implemented capability is easy to show.
3. As a user, I want identifier search, so that I can open a known part, batch, unit, or document.
4. As a user, I want analytical questions separate from identifier search, so that each interaction has a clear purpose.
5. As an analyst, I want unscripted questions over authorized data, so that I can investigate beyond suggested prompts.
6. As an analyst, I want visible entity, source, and date context, so that follow-up answers are interpretable.
7. As an analyst, I want to remove inherited context, so that earlier assumptions do not silently control new answers.
8. As an analyst, I want clarification for ambiguous identifiers, so that the application does not choose an unintended record.
9. As an analyst, I want findings, charts, tables, and timelines suited to my question, so that I can understand the result.
10. As an analyst, I want exact numbers and calculation definitions, so that I can verify analytical claims.
11. As an analyst, I want to inspect citations, so that I can open the original supporting record.
12. As an analyst, I want aggregate results to expose the underlying filtered records, so that I can reconcile counts.
13. As an engineer, I want part definitions, batches, and physical units distinguished, so that their histories are not confused.
14. As an engineer, I want connected record navigation, so that I can follow engineering history across sources.
15. As an engineer, I want the revision recorded for an event, so that current revisions do not overwrite historical meaning.
16. As an engineer, I want applicability mismatches highlighted, so that inconsistent evidence remains visible.
17. As a user, I want missing passages and revisions reported accurately, so that the application does not invent substitutes.
18. As a quality engineer, I want discrepancy counts separate from inspection rates, so that I can interpret the correct metric.
19. As a maintenance specialist, I want recorded recurrence summaries, so that I can inspect history without unvalidated failure predictions.
20. As a material planner, I want a material and horizon selector, so that I can obtain a baseline consumption forecast.
21. As a material planner, I want historical inputs, method, and uncertainty, so that I can understand a forecast.
22. As a material planner, I want incomplete history distinguished from zero usage, so that missing records do not imply no consumption.
23. As an analyst, I want multi-step AI investigations, so that the assistant can combine search, analysis, visualization, and report drafting.
24. As an analyst, I want explicit saving and sharing actions, so that AI does not make unnoticed changes.
25. As an analyst, I want confirmations before replacement or sharing, so that the intended effect is clear.
26. As a user, I want English and Urdu questions, so that I can use the language convenient to me.
27. As a user, I want Roman Urdu and mixed-language questions, so that I can use ordinary engineering conversation.
28. As a user, I want language override, so that I can choose English or Urdu explanations.
29. As a voice user, I want live follow-ups and interruption, so that interaction feels conversational.
30. As a voice user, I want on-screen evidence and concise speech, so that long technical results remain inspectable.
31. As a voice user, I want typed fallback, so that a microphone or voice failure does not lose my investigation.
32. As a user, I want transcript history without retained microphone recordings, so that I can resume work without an audio archive.
33. As an analyst, I want private investigations, so that unfinished work is not automatically shared.
34. As an owner, I want to share with selected colleagues, so that they can view and comment within their source rights.
35. As a reviewer, I want review notes and explicit Reviewed status, so that review is distinguishable from engineering approval.
36. As an owner, I want edits after review to create a new draft, so that the reviewed version remains preserved.
37. As a user, I want saved values and source versions, so that refreshing does not rewrite historical findings.
38. As a user, I want current permissions applied to saved findings and exports, so that sharing cannot bypass source access.
39. As a user, I want an English report preview and PDF, so that I can preserve permitted findings and citations.
40. As a user, I want a source outage to show data age and limitations, so that cached evidence is not presented as current.
41. As a restricted analyst, I want only permitted data and relationships, so that inaccessible records are not disclosed.
42. As an administrator, I want actual source, AI, permission, and audit state, so that Governance is verifiable.
43. As a presenter, I want authenticated account changes, so that permission demonstrations use real sessions.
44. As a presenter, I want a confirmed reset of my workspace, so that I can repeat a presentation without changing other users' work.
45. As a user, I want current-date filters and understandable timestamps, so that ordinary date questions make sense.
46. As a keyboard user, I want every primary workflow reachable with visible focus, so that I can work without a mouse.
47. As a small-screen user, I want readable responsive layouts, so that content and actions remain reachable.
48. As a user, I want a clear error and next step, so that failure does not leave me at a dead end.
49. As an evaluator, I want general explanations separated from record findings, so that model knowledge is not confused with evidence.
50. As a future coding agent, I want a self-contained ticket and testable acceptance criteria, so that I can implement without this conversation.

## Implementation Decisions

### 1. Release boundary and reusable components

The repository contains documentation only. There is no application framework,
schema, authentication, API, test suite, or deployment configuration to reuse.
Reuse the established issue-tracker, glossary, interface rules, and review policy.
Create the application as a single deployable modular monolith. This is a
functional demonstration, not a production rollout or an enterprise MVP.

All named scenarios and percentage-adjustment controls are deferred. The material
workspace has one baseline forecast with material/horizon selection and
expandable method detail. Keep the core visible workflows real and complete.

### 2. Functional requirements and navigation

| Area | Required behavior | Requirements |
| --- | --- | --- |
| Overview and persona focus | Task-oriented entry, recent permitted work, at most four meaningful summary indicators, presenter shortcuts. Persona focus changes presentation, never permissions. | REQ-001, REQ-017, REQ-027 |
| Ask | Persistent sessions; visible scope/context; clarification; structured results; cancel/retry; shared text/voice tools; general explanations distinctly labeled. | REQ-001, REQ-003, REQ-013–015, REQ-020 |
| Explorer | Search, type selection, server filtering/sorting/pagination, stable deep links, connected part/batch/unit histories. | REQ-002, REQ-018 |
| Intelligence | Quality counts/rates and maintenance history with record drill-down; baseline material forecast; truthful model catalogue. | REQ-005, REQ-006, REQ-021, REQ-024 |
| Knowledge | English document library, revisions, selectable text, exact page/passage citations, authorized downloads. | REQ-003, REQ-018, REQ-025 |
| Investigations | Private ownership, selected-user sharing/comments, snapshots, versions, review transitions, English report preview/PDF. | REQ-007–009, REQ-019, REQ-030 |
| Governance | Four logical sources, source freshness/status, effective grants, hosted AI configuration, auditable events. | REQ-010, REQ-022, REQ-023 |

There are six principal destinations: Overview, Ask, Explorer, Intelligence,
Investigations, and Knowledge. Governance is a separately gated administration
destination. Quality, Maintenance, Materials, and Models are nested under
Intelligence. There is no fleet-command or operational-approval surface.

### 3. Primary user journeys

| ID | Entry and steps | Completion oracle |
| --- | --- | --- |
| J-01 | Quality focus → question about HA-204 → batch comparison → cited inspection → historical document revision → save investigation. | Same scope and source versions appear in findings, chart, drill-down, and saved version. |
| J-02 | Explorer → production batch → serialized units → inspection → applicable document. | Every link resolves within scope and returning restores filters. |
| J-03 | Maintenance → unit/family/date filters → recurrence summary → service events. | Counts match historical events; no unsupported future-failure claim. |
| J-04 | Materials → material → 1/3/6 months → history/forecast → method detail → save finding. | Result follows the defined accounting/method, or explains insufficient history. |
| J-05 | Shared investigation → review notes → Ready for review → reviewer marks Reviewed → owner edits. | Reviewed version persists; new edited version is Draft. |
| J-06 | Report preview → citation/completeness check → explicit export → reopen PDF. | English PDF matches the permitted immutable report version and evidence register. |
| J-07 | Voice → Urdu/mixed question → visual tool result → spoken explanation → interrupt → follow up → typed continuation. | Technical identifiers survive; both channels use the same scope and persisted session. |
| J-08 | Presenter → restricted account → search/query/direct evidence request/export attempt. | Only Engineering and Quality are available; no protected names, counts, excerpts, or bytes leak. |
| J-09 | Source unavailable → cached query → stale indicator → no-cache case → recovery. | Cached age is visible; no-cache result is partial/unanswerable; recovery does not alter saved results. |
| J-10 | Presenter reset → consequence preview → confirmation → starter workspace. | Other users, shared historical versions, source history, and their comments survive. |
| J-11 | Provider outage or malformed result → retained input → available Explorer/saved work → explicit retry. | No fabricated success and no duplicate persisted effects. |

### 4. System architecture

Use Next.js App Router with React and TypeScript, server-rendered route shells,
authenticated Node application endpoints, Supabase PostgreSQL/Auth/private
Storage, and hosted OpenAI text and Realtime integrations. Keep computation and
authorization in the application. No direct institutional connection or extra
Python service is required.

The logical modules are Identity and Access, Engineering Catalogue, Analysis,
Investigation, AI Orchestration, Knowledge and Reports, and Governance. Text and
voice call the same typed application-tool interface. Source-specific adapters
operate over seeded logical sources, leaving future authorized integrations
possible without claiming they already exist.

The detailed schema, endpoint contracts, tool definitions, deployment mechanics,
and technical defaults are specified in the linked architecture reference.
The architecture reference is normative for implementation once the package is
approved; its compatibility gates precede dependent feature work.

### 5. Database and relationships

Use immutable engineering record versions, a current-record pointer, typed
relationships, and typed extensions for part revisions, batches, units,
inspections, NCRs, maintenance, documents, and material transactions.

Part definitions have revisions; batches identify production groups; serialized
physical units identify individual items. Inspections reference units/batches
and exact recorded document revisions. NCRs reference inspections. Maintenance
events reference physical units. Materials have canonical units, usage
transactions, and month-completeness records.

Sessions contain turns and analysis runs. Runs produce validated blocks with
explicit evidence dependencies. Investigations reference immutable versions
containing findings, notes, and evidence. Reports reference exact investigation
versions and dependency sets. Sharing grants access to an investigation, not
to its sources. No source record is edited through the product.

### 6. API contracts

All application data endpoints authenticate the server session and compute
effective grants from trusted live data. Client role fields are ignored.

| Contract | Behavior |
| --- | --- |
| Record search/detail/relationships | Permission-filter before ranking, counting, pagination, or relation expansion; stable IDs; source/version/freshness fields. |
| Query run | Validate question and explicit scope; accept or clarify; execute bounded tools; publish durable run events and validated result blocks. |
| Voice session/control | Bind provider call to the authenticated application session; server executes tools; application results remain authoritative. |
| Investigation/version/comment/share/review | Check ownership/action grants, expected revision, and confirmation where required; return conflict on stale writes. |
| Report preview/export/download | Re-evaluate current dependency access; persist version/hash; authorize every byte-delivery request. |
| Governance/reset | Administrator or presenter-specific actions only; audited, scoped, and idempotent. |

The architecture reference defines methods, field tables, response envelopes,
pagination, events, errors, confirmation semantics, and retry behavior.

### 7. Authentication and authorization

Use administrator-provisioned Supabase accounts, server-verified sessions, and
database-backed action/source grants. Public registration and institutional SSO
are excluded. The four seeded profiles are:

| Profile | Sources | Actions |
| --- | --- | --- |
| Presenter/admin | All four | All shipped features and administration; private investigations still require owner/share access. |
| Full analyst | All four | Search/analyze; own investigation creation/edit/share/export; shared view/comment; no administration or review marking. |
| Restricted analyst | Engineering Registry; Production & Quality | Analyst actions limited to those source scopes. |
| Reviewer | All four | Read records and shared investigations; comment, review, permitted report export; no finding edits or administration. |

An owner alone edits findings. Explicit review permission is required to mark
Reviewed; the presenter has that permission. Source grant changes apply to
subsequent requests, including saved prose, aggregates, previews, PDFs, search
suggestions, and relationship counts. A persona preference is never a grant.

### 8. Frontend architecture and UX

Use owned shadcn/Radix primitives, Tailwind and semantic CSS tokens, Lucide,
TanStack Table/Query, React Hook Form/Zod, ECharts, and a local PDF viewer.
These are engineering defaults pending dependency verification, not pre-existing
repository components.

URL state owns shareable filters, selected entity/tab, and sorting/page. Query
cache owns server responses and is cleared on account changes. Local component
state owns input and transient interactions; a small shared store may own the
evidence drawer. Server sessions own authentication; the server owns data scope.

Default to dark navigation and a neutral, legible workspace with an optional
dark theme. Use purposeful comfortable tables, summary-first analysis, one clear
primary action, and expandable detail. Persona focus offers Quality, Materials,
Leadership, and authorized Governance entry paths within the same application.
Reviewer entry prioritizes shared work ready for review.

Every view explains its purpose, current scope, and next action. Provide empty,
loading, partial, stale, denied, unavailable, and recoverable error states.
Keep the English shell LTR, Urdu answer regions RTL, and identifiers bidi-safe.
Desktop is primary; content and controls reflow at narrow widths. No inaccessible
content may be excused as a desktop-only design.

Use motion-design only for effects that improve feedback, orientation or
understanding of real state changes. Follow the project motion guidelines:
restrained professional timing, immediate feedback, reduced-motion alternatives,
and no mandatory ambient/choreographic layers. Omit effects without a clear
task benefit. CSS/component primitives are the default; no extra motion feature
or library is required.

Use the project interface guidelines and the actual installed better-* skills.
After every successful application build/rebuild, a fresh separate reviewer
checks all six domains against source and rendered complete flows. A build with
HIGH findings or outstanding required coverage is not complete.

### 9. Backend and AI behavior

The AI may search and join permitted records, choose aggregations, compare
groups, request quality/maintenance/forecast calculations, prepare chart data,
open relevant views, save explicitly requested findings, and draft reports.
Application code validates and executes every tool. There is no generated-code
runtime or unrestricted database query endpoint.

Search/analysis/preview can execute automatically. Save/export requires an
explicit request. Replacement and sharing require a visible confirmation bound
to the exact action payload; marking Reviewed is an explicit human operation.
The backend, not a model utterance, determines whether an action succeeded.

Allow general explanations labeled General explanation. Record-specific facts,
numbers, charts, and forecasts must derive from returned tool results and
resolvable evidence. Explain limitations when the data or tools cannot answer.
Do not turn association into proven causation or historical recurrence into
validated failure prediction.

Completed response blocks are summary, finding, metric, table, chart, timeline,
comparison, entity_list, forecast, and limitation. Actions are separate validated
action descriptors, resolving the original action/metric schema mismatch.
No generated HTML, JSX, script, arbitrary URL, or unvalidated chart configuration
is rendered. Tables/charts and spoken summaries refer to the same analysis run.

### 10. Analytics and forecasting

Inspection discrepancy rate is affected completed inspections divided by all
completed inspections in the same scope. Count a completed inspection once even
with several NCRs. Display NCR count separately. With no denominator, return
unavailable rather than 0%. Date filters apply to inspection event time.

Maintenance analysis reports event counts and recorded recurrence only.

Forecast recorded actual material usage in the canonical unit. Receipts,
transfers, stock adjustments, and unused inventory returns are not usage.
Consumption reversals, if seeded, must explicitly reference the original usage
and cannot exceed it. Unknown months are never silently filled with zero.

Proposed simple baseline: seasonal naive, repeating the corresponding prior-year
monthly value. Require 24 consecutive complete training months; seed 48 months
for normal examples. Offer 1/3/6 future full calendar months, default 3, with
explicit start/cutoff and parameters. Show an approximate model-based 80% band
only when support rules are met, and evaluation sample counts and MAE in units.
Exact formulas, cutoff, support, and zero-series behavior are fixed in the
architecture reference. No accuracy or probability calibration is promised for
real institutional data.

### 11. Integrations and deployment

Vercel serves the Next application at an assigned provider domain; the suggested
baseeratai.vercel.app name is not reserved. Supabase hosts data, identity, and
private documents/reports. OpenAI provides text reasoning and live voice.
Credentials remain server-side. Provider account/model access is an
implementation prerequisite, not an invented completed connection.

Use a bounded server-authoritative voice connection with direct browser/provider
audio and the same application tools as text. Persist checkpoints externally;
rotate/reconnect within verified hosting limits. A compatibility ticket must
prove the selected APIs, Node runtime, tool control, and voice recovery before
dependent voice feature work.

### 12. Security requirements

Enforce authentication, live source/action grants, ownership, and shares at every
application request and use RLS/private Storage as defense in depth. Privileged
keys are restricted to provisioning/maintenance; ordinary record access uses
user-scoped database access. Never rely on client prompts or Realtime client
configuration for authorization.

Treat model output, retrieved documents, questions, tool arguments, and URLs as
untrusted. Validate tool names, bounded arguments, output schemas, action
intent/confirmation, and evidence. Protect cookie-backed mutations against
cross-origin requests. Apply query budgets, pagination caps, runtime deadlines,
session leases, and idempotency. Logs contain safe metadata by default, not
credentials, audio, private query text, or unrestricted document extracts.

### 13. Error handling and evidence lifecycle

Clarify ambiguous permitted matches. For protected/unknown IDs use the same
neutral not-found response. Cancellation preserves input, explicit context, and
completed results. Cancel or fence superseded work; never replay effects during
reconnect. An OpenAI failure does not disable ordinary Explorer or saved work.

An unavailable source may supply last-synchronized data with visible age.
Missing cache yields partial/unanswerable results. Inaccessible or invalid
citations suppress dependent claims and visibly limit the answer. A saved result
does not become valid forever: dependency access is checked when reading it.
Refreshing creates a new immutable result version.

No raw microphone recordings or generated speech files are saved in application
Storage. Transcripts are retained with private sessions; voice transcription is
an approximate provider transcript, not an exact audit of what the audio model
understood. Show interpreted entities/scope, and allow correction or clarification.

### 14. Non-functional requirements

These are approved acceptance targets for the demo, not measured performance.

| ID | Target and measurement |
| --- | --- |
| NFR-01 | Supported acceptance browsers: current desktop Chrome and Edge at implementation freeze; record exact versions. Layout checks at 320, 768, 1024, 1440 and 1920 CSS px, plus 200% zoom. |
| NFR-02 | Keyboard completion, accessible names/roles, focus, text and non-text contrast, reduced motion, and relevant WCAG 2.2 A/AA checks; no claim of formal certification. |
| NFR-03 | On a documented warm deployment with the seeded workload and five concurrent signed-in browser sessions across the four seeded accounts, p95 record/search/filter requests at most 1 second over 30 measured requests; meaningful route content/skeleton within 2 seconds over 10 transitions. |
| NFR-04 | Local interaction feedback within 100 ms; listening/speaking/cancel states change without waiting for a final AI response. |
| NFR-05 | Maximum one active analysis per user; ten tool invocations and 90 seconds per text run; visible cancellation and explicit retry on exhaustion. Voice sessions rotate before the proven server connection limit. |
| NFR-06 | No duplicate save/share/export/review/reset effects after retry or disconnect; concurrent edits return conflict rather than silently overwriting. |
| NFR-07 | Database/cache/Storage/session state survives refresh and Vercel redeployment; raw audio is absent from application persistence/logs. |
| NFR-08 | Seeded sources support normal journeys, ambiguity, missing revision/passage, mismatch, source outage, zero/missing usage, and denied-source cases. |
| NFR-09 | Counts and ledger sums reconcile exactly before display rounding; statistical forecast fixtures use absolute/relative tolerance 1e-9, with display rounding tested separately. All evidence locators resolve or are visibly unavailable. |
| NFR-10 | All affected flows receive independent six-domain interface review after each successful build; no HIGH findings or falsely claimed coverage at completion. |

AI first-response and live-voice timing are recorded separately from application
latency. Initial usability target: first audible response within 5 seconds for
at least 8 of 10 ordinary no-tool turns on the documented evaluation network.
Tool-backed questions show progress. Failure of this target is a compatibility
finding requiring tuning or explicit scope review, not a fabricated pass.

## Testing Decisions

Use the Q43-approved acceptance seam: complete authenticated browser journeys
through the same application tools used by text and voice. Test external
behavior, evidence, numerical consistency, and persisted effects, not component
internals or screenshots alone. There is no existing test prior art in the empty
repository.

Use Vitest for deterministic analytics/contracts, React Testing Library for
meaningful interactive behavior, Playwright for end-to-end journeys, and
automated accessibility checks plus manual keyboard/screen-reader inspection.
Direct API/RLS/Storage negative tests establish authorization beyond hidden UI.

Provider fixtures make CI deterministic and exercise tool calls, malformed
responses, missing citations, refusals, timeout, interruption, and retries. They
must not become hardcoded application answers. Separate opt-in real-provider
checks prove actual text/tool and live voice behavior with authorized credentials.

The language set has at least 16 cases: four each English, Urdu script, Roman
Urdu, and mixed language, covering lookup, comparison, a numerical query, and
clarification/unsupported requests. Text cases must select the correct permitted
entity/scope, preserve identifiers, and produce valid evidence/results. Live
speech evaluation uses at least eight recorded test prompts spoken by a person,
including both languages and mixed technical identifiers; at least seven must
complete the intended task, and every misrecognized critical identifier must
be corrected/clarified before a persisted action. Record human observations,
not an unsupported blanket Urdu-quality claim.

### Requirement acceptance register

| ID | Requirement | Pass condition |
| --- | --- | --- |
| AC-001 | REQ-001 | Three differently phrased unscripted in-domain questions and a scoped follow-up produce distinct valid results; ambiguous and unsupported requests use the correct states. |
| AC-002 | REQ-002 | Search/detail/filter/sort/page deep links survive refresh and return navigation; relationships resolve across four domains for the full analyst. |
| AC-003 | REQ-003 | Each record-specific finding/metric links to backing versions or a reproducible record set; a deliberately invalid locator suppresses the dependent claim. |
| AC-004 | REQ-004 | All seed foreign keys, typed links, event chronology, internal origin, and coverage checks pass; normal presentation has no required synthetic badge. |
| AC-005 | REQ-005 | Quality/maintenance charts and records reconcile for identical filters and current grants. |
| AC-006 | REQ-006 | A baseline forecast works at supported horizons, exposes method/inputs/limitations, and uses insufficient-history state when ineligible; no scenario editor is required. |
| AC-007 | REQ-007 | Save/reload/resume preserves sessions, findings, notes, evidence, and report/version identity. |
| AC-008 | REQ-008 | Preview and PDF match one permitted investigation version; restricted and broken-evidence cases cannot silently export unsupported claims. |
| AC-009 | REQ-009 | Direct cross-role and forged-client-role requests cannot retrieve protected data, counts, excerpts, suggestions, or files. |
| AC-010 | REQ-010 | Governance values match configured providers, logical source state, live grants, and recorded events; keys are never displayed. |
| AC-011 | REQ-011 | Future local-deployment objective is documented as deferred; no local-inference implementation or security certification is claimed. |
| AC-012 | REQ-012 | Primary journeys pass keyboard/focus, relevant accessibility checks, responsive states, input preservation, and recoverable error checks. |
| AC-013 | REQ-013 | Real voice follow-up/interruption, typed fallback, transcript resume, bounded reconnect, and no raw-audio persistence are demonstrated. |
| AC-014 | REQ-014 | The language set and live speech checks above pass; English shell remains LTR and Urdu answers/identifiers render correctly. |
| AC-015 | REQ-015 | One request performs a multi-step investigation with traceable tool results; save/export obey intent, replacement/share require confirmation, and review is human-triggered. |
| AC-016 | REQ-016 | Sign-in and persisted work function on an actual assigned Vercel URL before and after a redeployment. |
| AC-017 | REQ-017 | Presenter shortcuts reach all shipped capabilities; changing accounts establishes real sessions with different data access. |
| AC-018 | REQ-018 | One part definition has distinct batches/units; historical revision and mismatch examples preserve the recorded reference. |
| AC-019 | REQ-019 | Refresh creates a new result; access revocation hides all affected saved blocks and prevents old PDF byte delivery. |
| AC-020 | REQ-020 | New combinations of supported tools answer unscripted queries; generated program execution is unavailable and unsupported operations are explained. |
| AC-021 | REQ-021 | Complete-history fixtures reproduce the documented forecast and evaluation; zero/missing/partial month and canonical-unit cases follow the defined rules. |
| AC-022 | REQ-022 | All four profiles pass the source/action/private/share matrix, including presenter denial for another user's unshared investigation. |
| AC-023 | REQ-023 | Source-offline/cache/no-cache/recovery cases show the correct age and completeness without rewriting saved findings. |
| AC-024 | REQ-024 | Three NCRs in two of ten completed inspections yield NCR count 3 and rate 20%; zero denominator is unavailable. Production/date/source filters alter the eligible denominator; an NCR-category filter alters affected inspections/NCR count within that eligible set. Both scopes are explicit. |
| AC-025 | REQ-025 | Urdu-origin investigation produces an English report with unchanged identifiers/citations; original conversation remains available. |
| AC-026 | REQ-026 | Normal pages and exports use ordinary product presentation; data origin remains documented internally. |
| AC-027 | REQ-027 | Persona entry flows, purpose, primary action, readable tables, progressive detail, both themes, and responsive/RTL states satisfy the interface criteria. Any motion has a documented functional benefit, truthful trigger, and reduced-motion alternative; omitting unnecessary effects is valid. |
| AC-028 | REQ-028 | Each successful build/rebuild has a separate reviewer report covering six domains; HIGH findings and missing required coverage are resolved. |
| AC-029 | REQ-029 | Server-current-date windows and Asia/Karachi boundaries pass deterministic clock tests; source dates do not shift on ordinary page access. |
| AC-030 | REQ-030 | Non-owner finding edits fail; shared comments succeed; reviewed edit creates Draft while preserving old reviewed bytes/content. |
| AC-031 | REQ-031 | Confirmed presenter reset restores starter work; other accounts, source history, shared versions/comments, and retry uniqueness survive. |

## Out of Scope

Production deployment readiness, institutional certification or verified air gap;
actual PAC integrations/data; local inference implementation; multi-organization
tenancy; public registration/SSO; user file uploads/imports; web search;
general-purpose AI-generated SQL/Python execution; named forecast scenarios;
automatic purchasing, maintenance approvals, engineering sign-off, operational
control, flight/fleet/combat intelligence, ERP replacement, validated failure
prediction, default relationship graphs, simultaneous co-editing, elaborate
approval chains, Urdu engineering documents/PDF reports, and native mobile apps.

## Further Notes

The user approved this package, the purposeful-motion amendment and the
15-ticket breakdown on 31 October 2026, and authorized implementation. Begin
with BAS-001 and work the dependency-ready frontier. The handoff task publishes
documentation and tickets; it does not implement application features. Record
real build, provider and independent UI-review evidence during implementation.

Related normative documents:

- [Requirements and decision provenance](requirements.md)
- [Architecture, schema, contracts, and execution rules](../architecture/architecture.md)
- [Interface guidelines](interface-guidelines.md)
- [Purposeful motion guidelines](motion-guidelines.md)
- [Verification approach](../planning/verification-approach.md)
- [Implementation plan](../planning/implementation-plan.md)
- [Dependency graph](../planning/dependency-graph.md)
- [Post-build interface review policy](../execution/interface-review-policy.md)
