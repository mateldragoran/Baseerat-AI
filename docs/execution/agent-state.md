# Implementation recovery ledger

Updated: 1 November 2026, Asia/Karachi. Owner: root orchestrator.

## Current outcome

BAS-001 is implemented to a tested checkpoint but is not accepted. No ticket is complete, no dependent ticket is released, and no application ticket has been merged into integration. Required real Auth, deployment and rendered coverage remain open.

- Approved baseline/actual clean starting commit: d6c327d34a853f3147a0f535bd7b047001ca1bd6.
- Integration: codex/baseerat-integration, D:/Projects/Baseerat; last reconciled tip 8061ceb before this ledger update. Contains execution/contract records, not accepted application code.
- Ticket: codex/bas-001, D:/Projects/Baseerat-worktrees/bas-001; final checkpoint 6e70bbb86ad98958d9ca4b84ab9c23c7376fd2e6 includes integration-doc tip f92f7a7. Builder /root/bas001 finished this checkpoint; acceptance is externally gated. Both worktrees clean at handoff; application source unchanged from build2.
- Source ownership: builder owns app/dependencies/migrations/tests/setup/README and ticket notes. Root owns shared execution records, provider mutations, tracker and integration. No concurrent implementers.
- Ownership corrections EX-005/007: BAS-001 includes minimal private query_sessions, safe auth audit base and own-session validity predicate. BAS-002 retains turns/runs/voice/operations; BAS-012 retains Governance surfaces.

## Build and independent reviews

| Build | Source / build ID | Actual evidence | Review state |
| --- | --- | --- | --- |
| 1 | 55cbd7a / hhYsIEPtDtfQmUTVxDz76 | Production build passed; signed-out Playwright passed | /root/ui_bas001_build1 report bas001-build1-auth.md: limited signed-out Approve, no HIGH, MEDIUM gamut and LOW token findings |
| 2 | 1b051f7 / OUcdZWILcSrsY2bC4rQrz | Production build, lint/typecheck/3 contracts passed; Playwright 1 PASS/1 SKIP | /root/ui_bas001_build2 resumed and completed bas001-build2-auth.md: limited signed-out Approve, no HIGH/MEDIUM, one LOW icon-stroke finding. Prior color findings verified fixed |

Runtime: http://localhost:3000, hidden production node PID26760; .next/BUILD_ID and .tools/server*.log verified on resume. No app source/package changes since build2; subsequent commits are SQL/test/docs only. Review2 is complete. Stop server before any rebuild; each successful rebuild requires a fresh independent reviewer.

Independent reports copied byte-identically into integration docs/execution/interface-reviews/ as well as the ticket worktree. Recovery notes: ticket docs/execution/ticket-notes/bas-001.md. Setup: ticket docs/setup-bas001.md. Browser: task-local Chrome for Testing156.0.8078.4 under .tools/browsers. Real-account browser test skipped, never passed. Screen reader, actual200%zoom, authenticated flows and full browser/accessibility acceptance remain unverified.

Supplemental builder-run axe-core4.14.0 evidence: docs/execution/test-evidence/bas001-build2-axe.md, exact runner archive and JSON results in both worktrees. Twelve signed-out scopes (3states x2themes x2widths) produced zero WCAG-tagged violations/incomplete checks. Exit1 honestly reflects one repeated best-practice h1 recommendation at320px (6instances). Retain this and independent LOW icon-stroke finding for the next required app iteration. This automated evidence is not independent AT/human acceptance.

## Verified external operations

Supabase dev project baseerat-ai-dev / exlhtyyxlytrlpsnrwvo, organization projects / ovwqxzlfasuumukdnyfy, ap-south-1. User explicitly approved this organization. Existing unrelated resources untouched.

All four hosted migrations are applied, verified in migration history. Do not reapply:

| Hosted version | Name |
| --- | --- |
| 20261031184852 | bas001_identity_catalogue |
| 20261031185614 | bas001_integrity |
| 20261031190745 | bas001_live_sessions_auth_audit |
| 20261031211048 | bas001_auth_audit_insert_only |

MCP stamped apply times differently from CLI-created filenames. Source-only renames committed at e253054 align all four tracked filenames with observed hosted versions; SHA256 before/after identical, mapping in ticket setup/notes. No remote history mutation or SQL replay.

Seed persisted once:8records/8versions/4sources/2private buckets; payload hashes and dataset manifest verified. Latest post-test check: Authusers0/Authsessions0/profiles0/auditevents0, source records8. No real accounts created yet.

Hosted policy tests passed from fc19f6c: supabase/tests/bas001_access.sql and bas001_auth_audit.sql. Coverage includes four-profile source/action grants, forged metadata, live grant/session revocation, expired sessions, private owner/cross-owner boundaries, inactive/anonymous/source-write denial; truthful own lifecycle audit, duplicate suppression, premature/revoked/cross-actor/raw-read/update/delete/anonymous denial. Fixtures rolled back. These are deterministic database identity fixtures, not password-auth/browser/provider acceptance.

TDD history: expired-session test first failed; live-session migration made it pass. Auth audit first lacked RPC, then failed42501 because ON CONFLICT required SELECT; insert-only correction now passes without widening read grants. Root docs/execution/bas001-integrity-check.sql separately passed immutable versions, same-record/current-pointer constraints, typed-reference rejection and manifest recomputation.

Anonymous REST /records denied401/42501; private schema denied406/PGRST106. Latest advisors: intentional private.datasets default-deny INFO and unused event-index INFO only. No HIGH security finding reported by advisors; this is not a comprehensive security certification.

## External prerequisites still missing

- SUPABASE_SECRET_KEY blank in ignored ticket .env.maintenance. File contains project URL and a generated account password; values never printed. Normal application never receives this key. User must configure securely before accounts:provision.
- OPENAI_API_KEY absent from ignored .env.local and process/user environment. User requested both local/Vercel configuration. No real text/voice inference performed.
- Hosted Auth /auth/v1/settings reports disable_signup=false; operator must disable hosted public signup before acceptance/deployment. Local config already disables it. Connector has no Auth-config mutation; browser fallback requires dashboard login.
- Vercel team_i90ZKPuQa1b1CMJtPGDhAx2k still returns403 on resumed check. Fresh authorize_team_access link shown to user; no Baseerat project/deployment created. Verify access before retrying original scoped creation. Do not use another team to bypass this gate.

## Publication and recovery

Connected GitHub account mateldragoran and repository access verified. Issue2 remains open; comments record partial progress, not resolution. No PR yet because no accepted ticket merge.

- Remote integration orchestration snapshot800e0436ea9ff08ccf8c39b91dda1095c69412af; exact tree of local1da5e9e. Fetched/merged locally at a58b91b.
- Remote codex/bas-001-checkpoint published at 62c9c1a3a2f044cbc553a9653935739a399b644d; exact tree2d8d018bf04a29680f2b4e8dc685eebe29ed0d2b of final local6e70bbb86ad98958d9ca4b84ab9c23c7376fd2e6. Tree equality verified before lease-checked ref update. Snapshot explicitly WIP/unaccepted; main remains approved baseline d6c327d.
- Shell push was canceled at a separate Git Credential Manager login. Use connected GitHub tree/commit/ref tools; compare remote tree SHA with local source tree. API snapshot commit identity differs, so record both IDs. Never snapshot ignored env/.tools files.

Next safe actions:
1. Build2 independent review and bounded axe run are complete; preserve explicit missing coverage and two remaining recommendations. No further app rebuild is needed for this externally gated checkpoint.
2. Builder merged supplied integration-doc tip and returned final checkpoint above. No implementer/reviewer remains running; resume the existing BAS-001 agent when its prerequisites arrive, or replace it with these recovery pointers.
3. Root publishes current orchestration docs to remote integration branch and updates issue2. Preserve incomplete branch/worktree; do not integrate as accepted or release dependencies. Historical diff whitespace warnings are confined to existing CRLF documentation and the preserved report EOF blank line; working-tree checks are clean. Reports are preserved unchanged.
4. Once secure inputs/team access arrive, provision real accounts, disable hosted signup, verify authenticated API/RLS/browser/cookie/logout/audit and deployed/redeployed journeys, then finish independent rendered coverage. BAS-002 follows accepted BAS-001.
5. After interruption, reread this ledger and ticket notes; inspect branches/worktrees/diffs/processes and hosted migration history before replaying any mutation. Resume surviving agents or dispatch replacements with these pointers.
