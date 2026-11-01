# Implementation recovery ledger

Updated: 1 November 2026, Asia/Karachi. Owner: root orchestrator.

## Current outcome

BAS-001 has resumed with real accounts and is not yet accepted. No ticket is complete and no application ticket has been merged into integration. Deployment and complete rendered coverage remain open.

User steering on 1 November: administrative key configured; OpenAI key will arrive later. Continue AI feature implementation and defer live OpenAI acceptance until the key is provided. Keep local/contract verification separate and never substitute mocked production success. This supersedes the earlier requirement to stop dependent AI implementation solely for missing OpenAI credentials; real-provider acceptance remains open.

- Approved baseline/actual clean starting commit: d6c327d34a853f3147a0f535bd7b047001ca1bd6.
- Integration: codex/baseerat-integration, D:/Projects/Baseerat; last reconciled tip 8061ceb before this ledger update. Contains execution/contract records, not accepted application code.
- Ticket: codex/bas-001, D:/Projects/Baseerat-worktrees/bas-001; current code checkpoint4000167 / test-evidence checkpoint80df1d8. Builder /root/bas001 resumed and fresh reviewer /root/ui_bas001_build3 is running. Prior checkpoint6e70bbb remains preserved; no ticket acceptance claimed. Reviewer screenshot assets may be untracked while its report is in progress; leave them untouched.
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

Seed persisted once:8records/8versions/4sources/2private buckets; payload hashes and dataset manifest verified. Root verified the newly configured modern administrative key matches the isolated project, then executed reviewed scripts/provision-accounts.mjs successfully. Four real active profiles/accounts now exist, one of each role. Passwords/secret values were never printed.

Ignored .env.acceptance prepared from explicit public configuration/password allowlist, without administrative key. Real scripts/verify-access.mjs passed all four accounts: source/action membership, own profile, forged metadata, authorization write denial, private Data API denial and logged-out JWT source denial. Browser first failed only an ambiguous test link selector; builder corrected it, then both real Playwright tests passed. Presenter/restricted signed in, opened HA-204, received maintenance200/404 contrast, signed out and returned via browser Back to sign-in. Traces off; real HttpOnly/SameSite=Lax cookies verified. These are now genuine Auth/browser results, distinct from prior transactional fixtures.

Builder /root/bas001 resumed in the same ticket worktree to complete real auth/audit browser assertions and fix retained icon/primary-heading recommendations. Next successful build requires a fresh independent reviewer for full authenticated affected flows. No source/review success is inferred in advance.

Hosted policy tests passed from fc19f6c: supabase/tests/bas001_access.sql and bas001_auth_audit.sql. Coverage includes four-profile source/action grants, forged metadata, live grant/session revocation, expired sessions, private owner/cross-owner boundaries, inactive/anonymous/source-write denial; truthful own lifecycle audit, duplicate suppression, premature/revoked/cross-actor/raw-read/update/delete/anonymous denial. Fixtures rolled back. These are deterministic database identity fixtures, not password-auth/browser/provider acceptance.

TDD history: expired-session test first failed; live-session migration made it pass. Auth audit first lacked RPC, then failed42501 because ON CONFLICT required SELECT; insert-only correction now passes without widening read grants. Root docs/execution/bas001-integrity-check.sql separately passed immutable versions, same-record/current-pointer constraints, typed-reference rejection and manifest recomputation.

Anonymous REST /records denied401/42501; private schema denied406/PGRST106. Latest advisors: intentional private.datasets default-deny INFO and unused event-index INFO only. No HIGH security finding reported by advisors; this is not a comprehensive security certification.

## External prerequisites still missing

- SUPABASE_SECRET_KEY configured in ignored ticket .env.maintenance; verified and provisioning completed. Normal application does not receive this key. File values remain private.
- OPENAI_API_KEY absent from ignored .env.local and process/user environment. User requested both local/Vercel configuration. No real text/voice inference performed.
- Hosted signup setting completed by user and verified through public Auth settings: HTTP200, disable_signup=true. Local and hosted public signup are disabled.
- Vercel team access completed and verified: team_i90ZKPuQa1b1CMJtPGDhAx2k / tauheed-akbars-projects. Git app was restricted; initial Git-linked project creation failed400 with no project created. User added Baseerat-AI to installation68232329; repository1437379009 became visible, then root created Git-linked project baseerat-ai / prj_4DtpdfPsyMOAKReOlad8lMG55AMU successfully. Node24.x, Fluid compute and bom1 region configured. Verified assigned project domain baseerat-ai.vercel.app. Public Supabase URL/key configured for app targets; APP_ORIGIN=https://baseerat-ai.vercel.app configured for production. No administrative key/password/OpenAI key uploaded.
- Automatic preview deployments temporarily disabled during controlled initial verification so recovery checkpoint publication does not launch unreviewed builds. Initial reviewed deployment will be created explicitly from the checkpoint Git SHA; do not merge main for deployment. Restore preview automation once per-preview origin/cookie verification is established. No deployment has been created yet.

## Publication and recovery

Connected GitHub account mateldragoran and repository access verified. Issue2 remains open; comments record partial progress, not resolution. No PR yet because no accepted ticket merge.

- Remote integration orchestration snapshot800e0436ea9ff08ccf8c39b91dda1095c69412af; exact tree of local1da5e9e. Fetched/merged locally at a58b91b.
- Remote codex/bas-001-checkpoint published at 62c9c1a3a2f044cbc553a9653935739a399b644d; exact tree2d8d018bf04a29680f2b4e8dc685eebe29ed0d2b of final local6e70bbb86ad98958d9ca4b84ab9c23c7376fd2e6. Tree equality verified before lease-checked ref update. Snapshot explicitly WIP/unaccepted; main remains approved baseline d6c327d.
- Shell push was canceled at a separate Git Credential Manager login. Use connected GitHub tree/commit/ref tools; compare remote tree SHA with local source tree. API snapshot commit identity differs, so record both IDs. Never snapshot ignored env/.tools files.

Next safe actions:
1. Build3 source4000167 / BUILD_ID dL1D7nSp0zu6Cl6gxqxR9 passed; production localhost runtime now PID19408. Persistent H1/icon recommendations fixed. Real two-journey browser checks and all12 signed-out axe scopes passed (exit0). Fresh independent authenticated reviewer /root/ui_bas001_build3 is running; app/UI source frozen. No pass inferred before its report.
2. Wait for independent build3 report; builder resolves actual findings and rebuilds/reports for another fresh review if needed. Keep app/UI frozen during each review. No new implementer ticket dispatched yet.
3. Root publishes current orchestration docs to remote integration branch and updates issue2. Preserve incomplete branch/worktree; do not integrate as accepted or release dependencies. Historical diff whitespace warnings are confined to existing CRLF documentation and the preserved report EOF blank line; working-tree checks are clean. Reports are preserved unchanged.
4. Operator/account/project prerequisites now verified. Publish the reviewed source checkpoint and create the controlled first Vercel deployment; verify HTTPS-origin/cookies, real authenticated journeys, redeployment persistence and a fresh deployed-flow review. BAS-002 follows the foundation under the recorded live-OpenAI deferral; do not fabricate acceptance.
5. After interruption, reread this ledger and ticket notes; inspect branches/worktrees/diffs/processes and hosted migration history before replaying any mutation. Resume surviving agents or dispatch replacements with these pointers.
