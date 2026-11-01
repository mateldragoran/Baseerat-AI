# BAS-001 build4: isolated upstream failure/recovery checks

Builder-run supplemental browser/API checks, 1 November 2026. Artifact
`I-YbrUnWFuGCX8s5bA2V0`, application source `e11040e`, Chrome for Testing156.0.8078.4.
Main reviewed server stays on localhost:3000; each separate QA server binds only127.0.0.1:3110.
These are **upstream-response fixtures**, not a claim of an actual hosted source/provider outage.
No OpenAI request or hosted source/grant mutation was performed.

The [preload archive](bas001-build4-upstream-fixture.mjs.txt) runs outside app source using Node
`--import` only in the QA child. It passes actual Auth and user-scoped RLS requests through.
Failure modes return503 at bounded upstream boundaries; cached/no-cache modes change only source
availability/cache fields on already-authorized real REST rows. Record fields, versions, hashes,
date anchor and original evidence age are preserved. The parent restores upstream behavior via
private child-process IPC; no fixture control endpoint or application test-mode adapter is added.
Neither the preload nor fixture environment is selected by the normal/deployed application.

The [runner archive](bas001-build4-error-runner.mjs.txt) enters the real presenter credentials
from ignored .env.acceptance. It uses isolated browser contexts, no trace/video/storage-state
export, and takes screenshots only after sign-in or on the fresh signed-out notice. A verified
session token is held in memory solely for own-session cleanup through normal Auth logout;
no credential/token/header is printed, stored in results or injected into a browser cookie jar.
Cleanup scope=local preserves other reviewer sessions. All QA child servers are stopped afterward.

## Results

Command: `$env:PLAYWRIGHT_BROWSERS_PATH='D:/Projects/Baseerat-worktrees/bas-001/.tools/browsers'; node .tools/qa-error-states.mjs`.
Exit0; [raw results](bas001-build4-error-fixtures.json) contain the exact observed assertions.

| Fixture | Actual rendered/API outcome | Recovery |
| --- | --- | --- |
| server-unavailable | Real server error boundary after held records503; [error](assets/build4-server-unavailable.png) | Restore upstream, activate Try again; actual Overview returns |
| cached-source | Stored evidence warning includes original source age; detail API200; [warning](assets/build4-cached-source.png) | Restore upstream and reload; record view returns without the unavailable warning |
| no-cache-source | Real error boundary; detail API503, not fabricated data; [unavailable](assets/build4-no-cache-source.png) | Restore upstream, activate Try again; Overview returns |
| logout-once | Provider logout503 produces persistent failure; current authenticated context remains200; [failure](assets/build4-logout-once.png) | Explicit second Sign out completes against real provider and returns to sign-in |
| audit-signout | Actual Auth logout succeeds, isolated audit delivery503; notice renders, auditRecorded=false and subsequent source401; [notice](assets/build4-audit-signout.png) | Session is truthfully signed out; administrator recovery instruction remains visible |

The first two recovery defects were RED on build3: reset-only did not refetch server data, and
the SDK cleared cookies on a provider logout failure, making retry impossible (context401).
[Preserved RED](bas001-build3-error-fixtures-red.json) is separate from these GREEN results.
Build4 uses the pinned Next16.4.3 built-in retry callback and stages logout cookie writes until
actual provider success. Normal identity verification/refresh is not staged. Success is never
manufactured by a fixture; real Auth success and real post-logout denial remain required.

Read-only hosted post-check after the fixture run: records8, versions8, profiles4, source grants14,
action grants28, all four sources still available with cache, all payload hashes valid. Auth
sessions and their safe audit lifecycle events change through ordinary test sign-in/out only.

## Reproduction

With the matching built application and ignored .env.local/.env.acceptance configured:

```powershell
Copy-Item -LiteralPath 'docs/execution/test-evidence/bas001-build4-upstream-fixture.mjs.txt' -Destination '.tools/qa-upstream.mjs'
Copy-Item -LiteralPath 'docs/execution/test-evidence/bas001-build4-error-runner.mjs.txt' -Destination '.tools/qa-error-states.mjs'
$env:PLAYWRIGHT_BROWSERS_PATH = Join-Path (Get-Location) '.tools/browsers'
node .tools/qa-error-states.mjs
```

Use only a trusted local test checkout and an acceptance account. It needs only public project
configuration and that account's password, never a maintenance key. The Node child reads
.env.local but receives no .env.maintenance; its APP_ORIGIN is the loopback QA origin. The runner
supports a selected mode list, e.g. `node .tools/qa-error-states.mjs logout-once`, for bounded replay.

This supplement does not replace independent rendered review, screen-reader operation, actual
hosted Governance outage controls, or deployed/redeployed URL evidence. Stable Chrome-channel
acceptance and physical mobile/OS-contrast checks are not inferred from this headless run.
