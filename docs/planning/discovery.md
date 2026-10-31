# Requirements discovery

Status: interview complete; Q43 confirms shared scope and test seams.
Final technical-package approval and implementation authorization remain pending.
Updated: 31 October 2026.

## Method

Use grill-me / grilling: ask the current decision frontier in numbered rounds,
recommend an answer for each question, and wait for the user's answers before
asking dependent questions. Resolve facts through inspection; leave decisions
to the user. Capture answers and update the tree after each round.

## Round 1: product boundaries

The user answered all seven questions. Their answers below are accepted product
boundaries, not approval of the specification, architecture, or implementation.

| ID | Decision | Accepted answer |
| --- | --- | --- |
| D-001 | What constitutes the first release? | Functional evaluation prototype with synthetic data, real persistence, authorization, AI analysis and calculations. Unexpected questions and failure cases must work genuinely; no production-readiness claim. Institutional rollout and live integrations are later. |
| D-002 | Is another source codebase expected? | Greenfield application in the empty Baseerat-AI repository. |
| D-003 | Who is the primary day-to-day user? | Quality engineer investigating recurring component discrepancies. Material planning remains a required supporting workflow; leadership and security evaluators review capabilities. |
| D-004 | What organizational boundary does a deployment have? | One organization for now. No multi-organization tenancy. The user's wording was "no for now keep it to one organization"; its explicit single-organization direction is controlling. |
| D-005 | What language support is required? | Originally English UI, documents, and queries, with Urdu limited to design. The English-only AI part is superseded by D-008; D-017/D-018 subsequently define bilingual AI coverage, English UI/documents, and reply-language rules. |
| D-006 | Can the application modify engineering source records? | Engineering source records are read-only. Writes are limited to app-owned investigation content, report drafts, scenarios, preferences, and authorized administration. |
| D-007 | What is the canonical product name? | Baseerat AI in English, with no appended Urdu rendering. Keep the existing Baseerat-AI repository name. This supersedes the source concept's BASIRAT AI spelling and bilingual name. |

## Round 2: runtime, scope, and delivery

The user answered all seven questions. D-013's recommendation was rejected;
D-015 subsequently clarifies the broader assistant workflow, and D-025 selects
application-tool composition for execution. Other answers are recorded below.
Development-machine inspection is factual input only; it does not establish
where the demonstration or customer system will run.

Observed development-machine facts: AMD Ryzen 5 7500F (6 cores), approximately
31.65 GiB physical RAM, and an NVIDIA RTX 4060 Ti with 16,380 MiB GPU memory
reported by the NVIDIA driver. WMI's roughly 4 GiB GPU-memory result conflicts
with the driver and is unsuitable for sizing. Docker CLI, Node, and Python are
discoverable; npm, Ollama, and llama-server are not on the current PATH. Docker
daemon readiness and installed model availability are unverified. No inference
quality, latency, or concurrency benchmark has been run.

| ID | Decision | Answer |
| --- | --- | --- |
| D-008 | Is actual local inference required in the first release? | No. Use the OpenAI API (user wording: "chatgpt API key"), including voice. English and Urdu voice/text questions and answers are required. No particular model or voice architecture selected. |
| D-009 | Which primary workspaces must be functional? | Accepted the proposed full functional scope: Overview, Ask, Explorer, Quality, Maintenance History, Materials, Knowledge, Investigations/PDF reports, and Governance. Models is a catalogue/status view; interactive relationship graphs are deferred. |
| D-010 | How is demonstration data supplied? | Accepted curated, reproducible synthetic seeds/documents, demo reset, and source-outage scenarios; defer uploads/imports/live connectors. Supabase and local storage are both acceptable options, with neither selected. |
| D-011 | How are prototype accounts provisioned? | Accepted administrator-provisioned accounts, real authentication and server-side permissions; defer institutional SSO and public self-registration. |
| D-012 | How are investigations shared? | Accepted private by default with explicit sharing to selected organization users; sharing does not grant underlying source-record access. |
| D-013 | Is AI restricted to the proposed interpretation/explanation role over prebuilt operations? | Rejected: "the ai should be able to do the other things as well." D-015 accepts multi-step investigation/app actions. After explanation, D-025 selects application-tool composition for execution. D-006 remains accepted. |
| D-014 | What delivery constraints should shape planning? | The user makes the demo primarily with coding agents and considers delivery constraints irrelevant. Stop soliciting business schedule/staffing/budget constraints; continue defining technical acceptance and runtime limits. |

## Round 3: AI capability and bilingual voice

All seven questions answered. The accepted choices below do not authorize
application implementation or deployment.

| ID | Decision | Accepted answer |
| --- | --- | --- |
| D-015 | What additional investigation and app actions should the AI perform? | Multi-step investigations: search records/documents, compare batches, analyze trends, produce charts/forecasts, navigate relevant views, save findings, and draft reports. D-025 subsequently chooses application-tool composition rather than general-purpose generated-code execution. |
| D-016 | Should voice use record/send turns or live conversational audio? | Live conversation with follow-up questions and interruption, while findings/evidence appear on screen; typed input stays available in the same investigation. |
| D-017 | What language/script coverage is required for questions, UI, and documents? | English UI and synthetic engineering documents. AI accepts English, Urdu script, Roman Urdu, and mixed English/Urdu questions; identifiers, revision labels, and units retain their original form. |
| D-018 | How should answer language and spoken playback be selected? | Follow the latest question's language by default, with explicit English/Urdu override. Spoken answers summarize findings; detailed tables/charts/citations remain inspectable on screen. |
| D-019 | What transcripts and raw audio should the application retain? | Save question/answer transcripts with sessions. Discard microphone recordings after processing and keep generated speech transient. This is an application-storage choice, not a provider-retention guarantee. |
| D-020 | Should the prototype be accessible through an authenticated shared HTTPS URL? | Yes. Vercel deployment using a Vercel-provided *.vercel.app domain. baseeratai.vercel.app is an example, not an assigned or availability-verified domain. Local development remains supported. |
| D-021 | Which demo accounts and permission contrasts should be provisioned? | Administrator, full-scope analyst, restricted-scope analyst, and reviewer. The user requires easy demonstration of all features. Presenter privileges and demo-navigation/account-session UX need definition without bypassing genuine account permissions. |

## Round 4: hosting, AI actions, and engineering evidence

All seven decisions are accepted. The user requested a plain-language
explanation of Q25, then chose approach A: application-tool composition.

| ID | Decision | Answer |
| --- | --- | --- |
| D-022 | Should hosted Supabase provide PostgreSQL, Auth, and private file storage alongside Vercel? | Accepted hosted Supabase for PostgreSQL, authentication, and private document/report files. |
| D-023 | Should a fully authorized presenter account and demo launchpad make every feature easy to show? | Accepted explicit access to every demo feature and synthetic dataset for the presenter, a flagship-workflow launchpad, and account transitions that establish the selected account's real session. |
| D-024 | Which AI app actions run immediately and which require preview/confirmation? | Accepted automatic search/analysis/previews; save/export on explicit request; confirm before replacing existing content or sharing; marking Reviewed requires explicit human action. |
| D-025 | Does ad hoc AI analysis require a general-purpose SQL/Python execution environment? | After explanation, the user chose "A for now": AI combines flexible application tools for queries, calculations, forecasts, charts, and saved artifacts. It can combine tools for unscripted questions; general-purpose generated SQL/Python execution is outside the first release. Unsupported analytical operations need an added tool or an explicit limitation. |
| D-026 | How are part definitions, production batches, and physical units distinguished? | Accepted distinct part/design definitions (such as HA-204) with revisions, production batches, and serialized physical units with maintenance history. |
| D-027 | How are historical document revisions applied to engineering events? | Accepted preserving the exact revision recorded for each event and flagging applicability mismatches; never silently substitute the latest revision. |
| D-028 | How do saved findings preserve historical evidence while respecting later access changes? | Accepted preserving captured values, filters, and source versions; refresh creates a new result version. Opening/exporting rechecks current permissions and hides content derived from no-longer-accessible sources. |

## Round 5: analytical meaning, permissions, and failure behavior

Six recommendations were accepted. Q32's visible demo-data framing was rejected;
the underlying date-clock behavior needs separate clarification.

| ID | Decision | Answer |
| --- | --- | --- |
| D-029 | What material quantity and forecast horizons should the first release support? | Accepted monthly consumption in units; horizons 1, 3, and 6 months, default 3; show history, uncertainty, assumptions, and source records. Purchasing decisions remain outside scope. |
| D-030 | What can each account do, and which source domains can it access? | Accepted presenter/admin access to all features/four sources; full analyst access to all sources and permitted investigation actions without administration; restricted analyst limited to Engineering Registry and Production & Quality; reviewer reads all four sources, reviews shared investigations, adds notes, marks Reviewed, and exports permitted reports without editing findings. Private investigations remain private even from presenter/admin unless shared. |
| D-031 | May analysis use last-synchronized records when a source is unavailable? | Accepted using the last successful records with visible age/staleness. Without usable cache, provide partial/unanswerable results. |
| D-032 | Should relative-date queries use a visible fixed demo reference date and display timezone? | Rejected visible demo-data wording: "don't mention that it's demo data, I want it to look realistic, I'll say myself that it's synthetic data." Remove mandatory demo/synthetic presentation badges; the user handles disclosure verbally. Date-clock behavior and timezone require a separate question because the rejection explained presentation, not date semantics. |
| D-033 | What does the default quality-rate metric measure? | Accepted completed inspections with at least one discrepancy divided by all completed inspections, with raw nonconformance counts separate. Show numerator, denominator, scope, and record drill-down. |
| D-034 | What language should first-release PDF report narratives use? | Accepted English reports; user said "just keep documents in English for now." Conversation/history can retain original input language. Urdu PDF reports are deferred. |
| D-035 | What remains usable when live voice or the AI provider fails? | Accepted voice-specific fallback to typed input in the same session, preserving completed findings. Provider-wide outages leave saved investigations/Explorer usable but new AI requests unavailable/retryable. Interruptions stop speech immediately; retries must not duplicate saves/exports. |

## Round 6: remaining workflow boundaries

Answered. The user accepted date behavior, shared editing/review rules, reset,
general explanations, and consumption semantics. They asked to simplify the
forecast scenario proposal and replaced dense-table presentation with polished,
persona-based, understandable responsive UI/UX. The baseline-only forecast
interpretation was confirmed in Q43.

| ID | Decision | Answer |
| --- | --- | --- |
| D-036 | Should relative dates use the real current date, with ordinary freshness metadata and recent seed dates? | Accepted actual current date for relative questions; recent generated history stays stable until deliberately refreshed; ordinary freshness metadata and Asia/Karachi display timezone. No visible fixed demo-date banner. |
| D-037 | Which scenario assumptions may users change without changing historical consumption or baseline? | User declined complexity: "we don't need to make things too complicates this is just a demo not the actual production or MVP project." Retain a focused functional baseline forecast and defer named what-if scenarios/percentage-adjustment UI; this interpretation was confirmed in Q43. |
| D-038 | Who may edit shared investigations, and what happens when reviewed content changes? | Accepted shared view/comments, owner-only finding edits, and authorized reviewer marking Reviewed. Editing reviewed findings creates a new Draft version; previous reviewed versions remain preserved. Simultaneous collaborative editing is deferred. |
| D-039 | What exactly does the presenter's reset action change? | Accepted confirmed restoration of the presenter's starter sessions/investigations, preserving engineering source history and other accounts' work. Source regeneration is separate maintenance. Scenario reset is unnecessary if scenarios are deferred under D-037. |
| D-040 | What visual, device, and browser scope should be accepted from the concept? | Accepted dark navigation, neutral surfaces, theme option, desktop primary and responsive use; explicitly rejected dense engineering tables. Require polished, clear, understandable, persona-based UI/UX with obvious purpose/next actions and the installed better-* skills. User additionally requires a separate reviewer agent after every application build to check those skills. |
| D-041 | May AI provide clearly distinguished general explanations beyond record-backed findings, without web search? | Accepted general explanations distinguished from stored-record findings; record-specific claims require evidence. Web search remains outside the first release. |
| D-042 | What counts as consumption, and how are missing versus known-zero months treated? | Accepted recorded actual usage as the target, excluding receipts/transfers/inventory adjustments. Confirmed no-usage complete months are zero; missing/incomplete months remain unknown. Train on complete calendar months, disclose missing data, and show forecast start. |

## Shared-understanding and specification transition

The user answered Yes to Q43, confirming baseline-only forecasting, clear
persona-focused responsive UI, mandatory post-build reviewer agents, and the
proposed verification seams. This permits specification/planning synthesis,
not application implementation.

Q43 used
[verification-approach.md](verification-approach.md) as the proposed test seams.
The architectural implementation choices left to synthesis must be stated as
technical proposals with rationale and validation gates, not invented user
requirements. No model quality, runtime UI check, or build result is established.

## Dependent discovery branches

This is a working tree, not an approved design. Recompute prerequisites after
each answer; newly exposed decisions may add branches.

- Release boundary and user priority -> required demonstrations, acceptance
  authority, and target dataset size. The user has excluded business-delivery
  constraints from discovery (D-014).
- Release boundary and organization model -> deployment topology, connectivity,
  hosted OpenAI model/voice selection, authentication, and operations. Actual
  local inference is deferred for this release (D-008).
- User workflows and write boundary -> entity identity, relationships, revision
  applicability, ingestion, synchronization, calculation definitions, and provenance.
- Organization model and workflows -> role/capability matrix, ownership, sharing,
  evidence access, export rules, retention, revocation, and audit visibility.
- Question scope and bilingual live voice -> retrieval/analysis tools, action
  confirmations, structured results, interruption, reconnection, grounding,
  transcript retention, and language evaluation.
- Source semantics and planning workflow -> forecast inputs, baseline authority,
  scenarios, method evaluation, uncertainty, and insufficient-data behavior.
- Settled workflows and technical boundaries -> accessibility, performance,
  failure recovery, deployment verification, test seams, and acceptance criteria.
- Resolved decisions -> shared-understanding confirmation, specification,
  milestones, dependency review, ticket approval, and final build-approval gate.

## Answer history

- Round 1 complete: seven decisions recorded above.
- Round 2 answered: D-008 through D-012 accepted as recorded; D-013 rejected
  with broader capability subsequently clarified in D-015; D-014 excludes
  commercial delivery constraints.
- Round 3 complete: D-015 through D-021 accepted, including the user's Vercel
  hosting choice and easy-feature-demonstration requirement.
- Round 4 complete: D-022 through D-028 accepted. D-025 was explained separately;
  the user chose approach A (application-tool composition) for the first release.
- Round 5: D-029 through D-031 and D-033 through D-035 accepted.
  D-032 changes presentation requirements; date semantics remain open under D-036.
- Round 6 and Q43 complete; baseline-only scope and test seams confirmed.
- Formal specification, architecture, milestones and 15 draft tickets written.
- Completed gate: user approved the completed package and ticket breakdown on 31 October 2026.

## Post-discovery motion amendment

The user requested motion-design for subtle polish only when useful, explicitly
rejecting animation for its own sake. The planning amendment refines REQ-027/028
and the existing post-build review gate, with no new ticket or dependency.
The motion amendment is included in the final approved package. On 31 October
2026 the user replied "Approved, go ahead" to the final handoff steps, approving
the full specification/plan and 15-ticket breakdown and authorizing the builder
to implement the approved plan. This handoff turn publishes documentation and
tickets; no application feature or provider resource is created.
