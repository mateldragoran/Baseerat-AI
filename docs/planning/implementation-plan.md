# Baseerat AI implementation plan

Version 1.0, 31 October 2026. Approved by the user for implementation.
The completed package, purposeful motion and ticket granularity/dependencies
were approved on 31 October 2026. No implementation has started in this handoff.
Begin with BAS-001; all completion and review gates remain binding.

## Delivery principles

Execution override, 1 November 2026: the user will provide the OpenAI key later and authorized building AI features before live-provider tests. Continue implementation against established interfaces with deterministic contract verification; leave real model/text/voice compatibility and acceptance explicitly unverified until credentials arrive. Missing OpenAI credentials alone no longer prevent dependent AI implementation. Other authorization, review and acceptance requirements remain binding.

Build complete observable slices: a person can sign in, perform the scoped
task, inspect its real result, and exercise its important failure path.
Foundational work is included in the first usable sign-in/record slice, not
split into independent database/UI/API setup projects. There is no existing
code to prefactor.

Motion is a cross-cutting part of existing UI work, not a separate ticket.
Follow the purposeful motion guidelines; establish reusable CSS/component
patterns only as needed, review their task benefit, and verify reduced motion
and truthful feedback in every affected build.

Keep the demonstration coherent and polished. Use seeded data and four real
accounts; do not add production tenancy, integration infrastructure, general
code execution, scenario builders, or elaborate workflows.

Every successful application build/rebuild goes to a **fresh separate interface
reviewer agent** under the [review policy](../execution/interface-review-policy.md).
Review complete affected flows, fix blockers, rebuild, and review again.
Do not defer accessibility or authorization until the last milestone.

## M1. Signed-in workspace and proven provider connection

**Tickets:** BAS-001 and BAS-002.

**Prerequisites:** approved plan/build instruction; isolated Supabase project;
Vercel project access; OpenAI project access; secure credentials configured by
the operator; verified target team/project. No credentials belong in documents.

**Work:** create the Next/React/Node locked dependency baseline, sign-in boundary,
four profiles/grants, semantic design foundations, one inspectable permitted
record per source, and an initial accessible workspace. Then deliver one real
typed tool question and a real interruptible voice question using the same
authorized record tool on the deployed target.

**Likely areas:** package/lock/config, app shell/auth/proxy, access and catalogue
modules, base migrations/seeds, shared tool contracts, provider adapters,
voice control, initial Ask interface, and build/test configuration.

**Integration requirements:** Supabase verified cookies/grants/RLS; hosted
Vercel Node/control channel; Responses strict schema; server-bound Realtime SDP
and sideband; bounded lease/durable operation state; no exposed standard keys.

**Verification:** all four account boundaries against initial records; no
cross-user cache; real text and voice tool calls; interruption; forced
connection rollover; logout; model/schema/package/PDFKit smoke feasibility;
record actual versions/tier limits. A mocked voice animation cannot pass.

**Completion:** a deployed authenticated path works and the provider/hosting
compatibility gates have evidence. Resolve a failed gate or revise the technical
plan before building dependent voice features. Independent UI review recorded.

## M2. Connected engineering records and useful analytical workspaces

**Tickets:** BAS-003 through BAS-007. BAS-003 can proceed alongside BAS-002
after the foundation; BAS-004–007 branch from BAS-003.

**Prerequisites:** signed-in catalogue interface and frozen base record/access
contracts. Provider compatibility is required for later AI integration but not
for these deterministic record/analysis flows.

**Work:** generate the coherent engineering history and negative fixtures;
implement Explorer relationships, quality metrics, maintenance recurrence,
revision-aware Knowledge, and the simple baseline material forecast. Each
workspace includes UI, authenticated data/calculation, evidence/drill-down,
empty/error states, and tests.

**Likely areas:** catalogue/relationships/seeds, quality/maintenance/materials/
knowledge features, common evidence/record links/charts/tables/viewer,
domain-specific application tools, and ticket-owned migrations/fixtures.

**Integration requirements:** immutable version identity, exact applicability,
permission-filtered relationships and counts, private PDFs/passages, actual-usage
accounting, complete versus missing months, shared analytical result contracts.

**Verification:** J-02–04; exact 3-NCR/2-of-10 metric; historical mismatches;
source-denied cases; document passage navigation; forecast formula/history/
evaluation/band edge cases; comfortable responsive presentation and keyboard use.

**Completion:** all deterministic workspaces produce reproducible record-backed
results; no method/source placeholders masquerade as working functionality.
Each build has independent interface evidence.

## M3. Evidence-backed questions and persistent investigations

**Tickets:** BAS-008 and BAS-009.

**Prerequisites:** compatible providers and implemented catalogue/analysis/
document tools with frozen result schemas. These dependencies are genuine:
the complete Ask flow must execute the supported domains, not promise missing tools.

**Work:** complete typed Ask, scope/context/clarification, bounded orchestration,
validated block renderer, evidence navigation, and persistent sessions. Then
save immutable findings into private investigations with selected-user sharing,
comments, owner edits, review transitions, and current-permission redaction.

**Likely areas:** Ask/composer/result renderer, query orchestration/tool registry,
SSE events, session/version/artifact/ACL migrations, investigation screens,
confirmation/idempotency, and provenance policy.

**Integration requirements:** server tool facts shared by UI/narrative; evidence
dependency union for summaries; conflict/nonce/epoch checks; no private chat
disclosure through investigation sharing; current source rights on saved content.

**Verification:** J-01, J-05, J-11; unscripted tool combinations; malformed blocks,
missing citations, cancellation/late events, save/retry uniqueness, owner/member/
reviewer denial tests, review-edit version preservation.

**Completion:** the primary quality investigation can be performed, saved,
reviewed, refreshed, and resumed with inspectable evidence. Independent UI review
and deterministic/auth checks are recorded.

## M4. Reports, full bilingual voice, and Governance

**Tickets:** BAS-010, BAS-011, BAS-012, which may branch after BAS-009.

**Prerequisites:** persistent validated artifacts and version/ACL semantics;
early text/voice compatibility already proved. Each branch uses the same frozen
application tool/action/evidence interfaces.

**Work:** canonical English report preview/export; full voice interaction with
tool-backed visual findings, language control, interruption/recovery/transcripts;
Governance showing actual configuration, grants, source availability, and safe audit.

**Likely areas:** reports/PDFKit/private Storage, Knowledge viewer reuse, Realtime
control/provider adapter, bilingual result rendering, Governance/audit/source
scenario controls.

**Integration requirements:** strict English narrative and citation validation,
immutable PDF/hash, current download authorization, voice server lease and call
binding, safe audit metadata, actual source cache/completeness behavior.

**Verification:** J-06–09; source-revoked PDF denial; new permitted draft export;
eight real speech prompts and 16 text-language cases; reconnect/account-change
fencing; source-offline/cache/no-cache/recovery states; safe configuration display.

**Completion:** each supporting flagship feature behaves genuinely, records
provider/test limitations honestly, and passes its interface review.

## M5. Persona presentation, cross-flow verification, and handoff

**Tickets:** BAS-013 through BAS-015.

**Prerequisites:** functional reporting, bilingual voice, Governance, and
investigations. Persona shortcuts must lead to complete destinations.

**Work:** persona-specific Overview/shortcuts and presenter reset; cross-account
evidence/lifecycle/failure demonstrations; final responsive, accessibility,
performance, integration, deploy/redeploy, and presentation rehearsal.

**Likely areas:** Overview/persona preference/navigation, reset/epoch transaction,
browser journey fixtures, auth/adversarial test suite, performance checks,
deployment/operator instructions, execution evidence, and remaining shared UI fixes.

**Integration requirements:** every shortcut invokes a permitted real workflow;
reset never wipes sources/other users; role changes clear caches/voice; the
actual assigned URL and secrets/configuration match the reviewed deployment.

**Verification:** J-01–11, AC-001–031 and NFR targets; full presenter narrative
around 10 minutes plus unscripted follow-ups; record measured external AI
latencies separately; independent six-domain review of the final rendered flows.

**Completion:** acceptance evidence is recorded, HIGH interface findings and
required coverage gaps are resolved, remaining medium/low issues are explicit,
and operator handoff can repeat sign-in, source failure, account change, and
reset. Do not call the system institutionally production-ready.

## Ticket execution and parallelism

See the [dependency graph](dependency-graph.md) and [ticket index](tickets/README.md).
Approved tickets are one file each, with stable BAS identifiers, requirements,
contracts, expected areas, acceptance, tests, and definition of done.

Potential parallel waves:

1. BAS-001 alone.
2. BAS-002 and BAS-003.
3. BAS-004, BAS-005, BAS-006, BAS-007 after BAS-003.
4. BAS-008 after BAS-002 and BAS-004–007; then BAS-009.
5. BAS-010, BAS-011, BAS-012 after BAS-009.
6. BAS-013 joins those branches; then BAS-014 and BAS-015 sequentially.

Parallelism is optional; a solo builder can work serially. Use separate feature
ownership/worktrees if delegating. Merge migrations in reviewed order, generate
unique migration IDs through the CLI, and keep shared schemas/tool contracts
under one integrator. A shared-contract change serializes affected branches.
Dependency-ready does not imply collision-free changes to the same files.

### Migration ownership and parallel prerequisites

BAS-001 owns identity/source/core record/dataset foundations and the minimal
private query_sessions table with owner-only RLS, so its private-session
isolation acceptance can be tested against the actual application table.
BAS-001 also owns the minimal private authentication audit-event foundation
and narrow own-session validity predicate required for truthful sign-in/out
events and immediate post-logout data denial. BAS-012 adds Governance read/control
surfaces over those actual events; it does not invent historical activity.
BAS-002 extends session behavior and owns turns/run/operation/voice tables.
BAS-003 owns relationships and durable
record sets; its nullable run association remains null until BAS-008 adds the
run foreign key after both branches exist. BAS-006 owns passages/private source
files; BAS-007 owns usage/coverage tables. BAS-008 owns artifact dependencies,
final shared run associations and action proposals. BAS-009 owns investigation/
membership/version/comment/confirmation tables; BAS-010 owns reports.
These are migration stages toward the final architecture schema, not permission
to leave unvalidated references in the finished database. A branch must not
reference another branch's not-yet-landed table. BAS-003 may seed metadata for
later passages/usage fixtures, but BAS-006/BAS-007 complete their own typed data.

## Global definition of done

- User-visible outcome and the ticket's recovery path work with persistent data.
- Spec/contract and current role/source rights match the implementation.
- Meaningful ticket tests pass; real-provider claims have real-provider evidence.
- Application build succeeds and a fresh independent interface review records
  exact flow/domain coverage; fix blockers and repeat after rebuilding.
- No key, raw audio, hidden data, generated script, or unsupported capability
  appears in client payloads/logs/product copy.
- Update execution progress/review records, actual file/module locations,
  migrations/lockfiles, and related issue links. Do not close a parent spec merely
  because children have been generated.

## Risks and gates

| Risk | Concrete handling |
| --- | --- |
| API/version/tier incompatibility | BAS-002 proves real deployed text/voice, duration rollover, and authoritative tools early; no silent replacement with mocked capability. |
| Speech misunderstanding | Visible interpreted scope, clarification/correction, human language evaluation, typed fallback. |
| Saved derived-data leakage | Full dependency lineage, whole-block suppression, current-grant checks, no stale public PDF URL. |
| Forecast overclaim | One documented baseline, explicit eligibility, chronological evaluation, model assumptions, unavailable metrics where unsupported. |
| Interface overload | Summary-first persona tasks, comfortable purposeful tables, progressive detail, every-build independent review. |
| Scope creep | No scenarios, code runner, real integrations, SSO, tenancy, native apps, or enterprise production machinery. |

## Remaining operational inputs

At implementation, the operator supplies credentials, provider access, projects,
and account activation/recovery configuration without pasting secrets into chat.
Verify actual versions, URL availability, tier/region limits and Urdu quality.
These are build prerequisites/compatibility gates, not silently invented
completed integrations or unresolved user product requirements.
