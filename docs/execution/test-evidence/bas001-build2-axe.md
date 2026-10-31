# BAS-001 build2: supplemental automated accessibility evidence

Date: 1 November 2026, Asia/Karachi. Builder-run test at the approved browser seam;
this is **not** an independent manual review or formal accessibility certification.
Application source `1b051f7`; BUILD_ID `OUcdZWILcSrsY2bC4rQrz`, unchanged production
runtime `http://localhost:3000`. No app/package/lock edits or rebuild were performed.

Tooling: official npm `axe-core@4.14.0`, downloaded into ignored `.tools/axe`;
Playwright `1.64.1` from the committed lockfile; task-local Chromium `156.0.8078.4`.
Resolved npm package version and repository (`dequelabs/axe-core`) were inspected.
Downloaded tarball SHA512 exactly matched the official registry integrity:
`sha512-9WTZxEjsZ7b13TH8JPmbV2z8CHbl80/2hm3XPEG4JgNdQLK81IBRXmSxHfMAOkSqQeRxT/0dwNDz2GOm3zzpcQ==`.

The exact [runner archive](bas001-build2-axe-runner.mjs.txt) and
[raw structured results](bas001-build2-axe-results.json) are preserved for reproduction.
Executed command: `$env:PLAYWRIGHT_BROWSERS_PATH = 'D:/Projects/Baseerat-worktrees/bas-001/.tools/browsers'; node .tools/audit-signed-out.mjs`.
Exit1 reflects the six repeated best-practice instances below; it is not reported as a clean audit.

## Scope and actual results

Tags selected: wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa, best-practice.
The initial form, actual invalid-credential Auth response, and directly opened audit-unavailable
notice were each audited in both themes at 1440×900 and 320×900. No authenticated state was
fabricated. The notice proves its presentation, not an actual logout/audit outage operation.

| Viewport | State | Theme | Passed rules | WCAG-tagged violations | Best-practice violations | Incomplete |
| --- | --- | --- | ---: | ---: | --- | ---: |
| 1440×900 | Initial sign-in | Light | 34 | 0 | 0 | 0 |
| 1440×900 | Initial sign-in | Dark | 34 | 0 | 0 | 0 |
| 1440×900 | Actual invalid credentials | Light | 34 | 0 | 0 | 0 |
| 1440×900 | Actual invalid credentials | Dark | 34 | 0 | 0 | 0 |
| 1440×900 | Audit-unavailable notice | Light | 34 | 0 | 0 | 0 |
| 1440×900 | Audit-unavailable notice | Dark | 34 | 0 | 0 | 0 |
| 320×900 | Initial sign-in | Light | 32 | 0 | page-has-heading-one | 0 |
| 320×900 | Initial sign-in | Dark | 32 | 0 | page-has-heading-one | 0 |
| 320×900 | Actual invalid credentials | Light | 32 | 0 | page-has-heading-one | 0 |
| 320×900 | Actual invalid credentials | Dark | 32 | 0 | page-has-heading-one | 0 |
| 320×900 | Audit-unavailable notice | Light | 32 | 0 | page-has-heading-one | 0 |
| 320×900 | Audit-unavailable notice | Dark | 32 | 0 | page-has-heading-one | 0 |

One root cause produces six best-practice instances: responsive CSS hides the marketing h1
with `.story-content` below760px; the visible task heading remains h2 (`sign-in/page.tsx`).
Axe classifies impact as moderate, but its actual rule tags are only cat.semantics and
best-practice. The owning accessibility skill treats a one-h1 convention as a recommendation,
not a HIGH finding without a concrete task failure. No heading content/control loss was shown.
Retain this recommendation for the next required application iteration: make the sign-in task
heading the page's persistent primary heading. Do not claim this convention warning is a
WCAG failure or that automation proves screen-reader usability.

## Reproduction

From this worktree with the unchanged production server running and dependencies installed:

```powershell
$env:PLAYWRIGHT_BROWSERS_PATH = Join-Path (Get-Location) '.tools/browsers'
node node_modules/playwright/cli.js install chromium
New-Item -ItemType Directory -Force '.tools/axe' | Out-Null
Invoke-WebRequest 'https://registry.npmjs.org/axe-core/-/axe-core-4.14.0.tgz' -OutFile '.tools/axe/axe-core.tgz'
tar -xzf '.tools/axe/axe-core.tgz' -C '.tools/axe'
Copy-Item -LiteralPath 'docs/execution/test-evidence/bas001-build2-axe-runner.mjs.txt' -Destination '.tools/audit-signed-out.mjs'
node .tools/audit-signed-out.mjs
```

The bounded runner performs two real invalid-account requests (one per viewport), uses a new
signed-out browser context for each viewport, changes themes through actual controls and writes
`.tools/axe-signed-out-results.json`. Provider rate limiting may prevent reproducing the intended
invalid-credential state; the runner then fails instead of silently relabeling that outcome.

Not covered: real four-account/authenticated flows, source contrast/private records, successful
logout/audit writes, screen-reader speech/route announcements, true200% zoom/text resize,
current stable Chrome/Edge acceptance, forced colors, touch/mobile keyboard or absent Urdu answer
UI. Independent review2 remains a separate, limited signed-out Approve with one LOW icon finding.
