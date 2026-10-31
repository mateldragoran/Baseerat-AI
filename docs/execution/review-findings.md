# Documentation review findings

Updated: 31 October 2026. Planning corrections applied; final package approved
by the user for implementation. These dispositions are not runtime, security, forecast accuracy,
accessibility or interface passes.

## Concept findings and dispositions

| ID | Finding | Planning resolution |
| --- | --- | --- |
| RF-001 | No application to reuse | D-002 confirms greenfield; existing documentation is the reusable baseline. |
| RF-002 | Prototype versus production unclear | D-001/Q43, specification objectives/Out of Scope and AC-001–031 define the demo. |
| RF-003 | Local AI/deployment timing unclear | ADR-0001–003; architecture A-01/A-07/A-10 define hosted OpenAI/Vercel/Supabase and compatibility gates. |
| RF-004 | metric/action schema mismatch | A-06 includes metric and separates validated action descriptors from result blocks. |
| RF-005 | Navigation count mismatch | Six principal destinations plus separately gated Governance. |
| RF-006 | Forecast method/accounting incomplete | D-029/D-042/Q43; A-08 fixes baseline, window, known-at history, uncertainty, evaluation and limitations. |
| RF-007 | Saved evidence lifecycle incomplete | A-04/A-07/A-09 define immutable IDs, full dependencies, metadata/prose/stream checks and byte authorization. |
| RF-008 | Personas confused with permissions | D-030/D-038; A-04/A-09 specify live source/action grants, owner/share rights and review transitions. |
| RF-009 | Overloaded domain terminology | No tenant/project-management module; persona is presentation; workspace reset uses owner epoch; glossary records settled terms. |
| RF-010 | Performance claims lack workload | NFR-01–10 and BAS-015 state measurable demo targets and separate external AI timing; no measurement claimed. |
| RF-011 | Maintenance navigation inconsistent | One Maintenance History workspace/entry contract; BAS-005 verifies cross-entry naming. |
| RF-012 | Branding mismatch | D-007 chooses Baseerat AI; original source preserved. |
| RF-013 | English-only conflicts with bilingual AI | D-017/D-018; AC-014 defines language tests; actual speech quality remains unverified. |
| RF-014 | AI action breadth unclear | D-015/D-024/D-025 and A-06/A-09 define tools, human intent, proposals and confirmation. |
| RF-015 | Voice behavior incomplete | A-07 defines server authority, transcripts, leases, current grants, interruption/reconnect and fallback; BAS-002/011 prove it. |
| RF-016 | Hosted persistence missing | ADR-0003; A-04 defines durable hosted records, datasets, record sets, sessions and artifacts. |
| RF-017 | Easy presentation versus genuine roles | Explicit presenter grants, authenticated transitions, persona-independent permissions and BAS-013 verification. |
| RF-018 | Original synthetic badges conflict with latest choice | D-032/Q43 removes mandatory UI/export badges; internal origin and verbal disclosure remain. |
| RF-019 | Dense tables conflict with desired UX | D-040/Q43, interface guidelines, REQ-027/028 and mandatory separate post-build reviews supersede density defaults. |
| RF-020 | Scenario builder adds scope | Q43 confirms baseline-only forecast; no named-scenario schema/API/UI/ticket. |

## Independent planning audit

[planning-audit.md](planning-audit.md) preserves PA-001–009, original evidence,
and correction verification. Fixes include historical knowledge clocks, versioned
coverage, durable/shared record sets, unexposed raw prose, source-safe titles/
notes/comments/transcripts, category denominator semantics, complete source
kinds, action-intent issuance, explicit training window and current-grant replay.

## Runtime evidence still required

BAS-002 must prove provider models/APIs, locked dependencies, actual Vercel
limits and governed voice recovery. Each feature verifies calculations and
permissions; BAS-014 verifies integrated revocation/replay/races. BAS-015 proves
real language, PDF, persistence, performance and presentation behavior. Every
successful build requires an independent six-domain interface review.

No application build or UI pass has occurred during planning. A corrected
contract does not count as an executed acceptance test.

## Implementation findings

| ID | Finding | State / resolution |
| --- | --- | --- |
| EX-001 | No hosted Supabase project existed at implementation start. | Created isolated `baseerat-ai-dev` after explicit organization choice; healthy and empty schema verified. Real accounts/RLS still pending. |
| EX-002 | Vercel team-scoped operations return 403 despite unscoped project-list access. | Provider team consent requested; no project/deployment claimed. Local implementation continues. |
| EX-003 | Administrative Supabase and OpenAI keys absent from initial environment. | Requested ignored local configuration; never chat secrets. Account and provider acceptance remain open. |
| EX-004 | npm absent from PATH and Docker daemon unavailable. | Implementer uses task-local npm; hosted test project replaces unavailable local Docker only for explicitly isolated checks. |
| EX-005 | BAS-001 asks for private-session isolation, while BAS-002 owned all session tables. | Orchestrator moved only the minimal private query_sessions foundation/owner RLS into BAS-001. BAS-002 retains turns/run/operation/voice and session behavior. Updated migration ownership in implementation-plan.md; verify the real session table rather than an unrelated probe. No additional product workflow introduced. |
| EX-006 | Vercel now defaults new projects to Node 26, while approved application baseline is Node 24. | Implementer instructed to pin `engines.node` to `24.x`; deployed runtime still requires verification. [Official announcement](https://vercel.com/changelog/node-js-26-lts-is-now-generally-available-on-vercel). |
