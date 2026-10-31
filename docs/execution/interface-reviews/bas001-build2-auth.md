# Interface review: BAS-001 build2 / signed-out entry and recovery

Date: 1 November 2026, Asia/Karachi (final evidence check: 31 October 2026 21:14 UTC).
Reviewer: fresh separate read-only agent `/root/ui_bas001_build2`.
Runtime: `http://localhost:3000`.

Build supplied by builder: `node .tools/package/bin/npm-cli.js run build`, exit 0; compile 1.484s, typecheck 1.767s. Supplied source: `codex/bas-001` at `1b051f7`. Independently read `.next/BUILD_ID`: `OUcdZWILcSrsY2bC4rQrz`. No rebuild was performed. Repository HEAD advanced through SQL/execution work during review; final observed HEAD was `e25305435022246da35c190ffb8418dbebfeae54`, with clean working tree before this report. `git diff --name-only 1b051f7..HEAD -- src package.json package-lock.json` returned no paths. The application source stayed frozen. The review was interrupted and resumed; browser bindings were reinitialized and remaining checks were actually completed after reconnection.

## Scope and coverage

Reviewed the reachable signed-out flow: root entry to sign-in; initial orientation and administrator access/password-reset guidance; native required/email validation; password reveal/hide; pending credentials; actual invalid credentials, retained input and keyboard retry; theme changes; protected Explorer/direct record entry; missing-route recovery through Explorer to sign-in. Also opened the actual notice state `/sign-in?notice=audit-unavailable` and inspected its warning, recovery instruction and usable form. This was direct notice-state inspection: no authenticated logout or successful audit write was performed or implied.

All requested widths were inspected for the sign-in/error flow in both themes: 320×720, 768×900, 1024×900, 1440×900 and 1920×1080 CSS pixels. The notice was additionally inspected at 320px in both themes. Shared tokens, auth controls, theme toggle, shell, record components, loading, not-found and error recovery source were inspected. Authenticated Overview/Explorer/record/sign-out rendering is explicitly excluded: real Auth accounts were unavailable, and no fabricated authentication was used.

Actual stack: Next App Router 16.4.3, React 19.3.1, TypeScript, Tailwind 4.3.3 plus authored global CSS/semantic custom properties, native controls, Lucide React 1.66.0, Segoe UI/Arial/system fallbacks. Hosted Supabase supplies authentication. No application component framework or animation library is installed in this slice; no animation is adopted. Commands were discovered from package.json; the runtime was the builder's existing production server.

Recon read AGENTS.md, docs/agents/domain.md, GLOSSARY.md, decision index and ADR-0003, relevant requirements/specification/architecture/implementation-plan and BAS-001 references, interface/motion guidelines, review policy and README. No CLAUDE, CONTRIBUTING, CODING_STANDARDS or Storybook convention file was found. Loaded installed better-interface/SKILL.md and review-format.md, then full owning skills in the prescribed order: accessibility, layout, writing, typography, colors, UI. Relevant references included all six accessibility references, both layout references, writing patterns, typography spacing/sizing and wrapping/punctuation, colors contrast/token naming/color formats, and UI surfaces/icons. Motion recipes were not imposed where no animation exists.

Browser: CUA ChatGPT in-app browser, browser ID 2, tab ID 1; AX/DOM inspection and screenshots through mcp__cua_repl only. Exact browser engine/version is not exposed by this surface's supported inventory/API. This run does not establish the specified current Chrome/Edge compatibility acceptance.

| Domain | Evidence inspected | Result |
| --- | --- | --- |
| Accessibility | auth-controls.tsx, theme-toggle.tsx, shell.tsx, layout/loading/error/not-found; AX names/roles/states; keyboard form/recovery walk; native validation; visible focus; limited DOM audit | Clear within inspected signed-out checks; AT, true zoom, full audit and authenticated checks Not verified |
| Layout | globals.css logical properties/media queries; sign-in reading/visual order; both themes at all five widths; long editable values; narrow notice/error scrolling | Clear within inspected checks; enlarged text, pseudo-localized static strings and authenticated layout Not verified |
| Writing | Actual initial/help/native-validation/pending/credential-error/not-found/notice copy; source strings in auth/API/shared failures, shell/catalogue/record views | Clear within inspected flow; unseen server and account outcomes Not verified |
| Typography | Computed 16px input, 400+ small-text weights, heading/body metrics; source unitless leading/measure/wrapping; English lang/LTR; long/mixed-script editable value | Clear within inspected checks; actual Urdu answers, enlarged text and authenticated long content Not verified |
| Colors | Both theme blocks, semantic usage, all authored/consumed primitive gamut values; actual computed colors/backgrounds/opacity for text, controls, focus, credential error and audit notice | Clear within inspected checks; prior two color findings verified fixed; final pixel and authenticated-state checks Not verified |
| UI | All authored state CSS; native/primary/quiet/reveal states, pending/retry, immediate theme changes, Lucide SVG metrics and visible rendering | 1 LOW finding; touch/coarse pointer and authenticated states Not verified |

## Findings

| Severity | Domain | Location | Before | After | Why |
| --- | --- | --- | --- | --- | --- |
| LOW | UI | `src/app/globals.css:80`; `src/components/auth-controls.tsx:25`, `src/components/auth-controls.tsx:27`; `src/components/theme-toggle.tsx:12` | Global `svg { stroke-width: 1.8px }` overrides Lucide's stroke. Rendered theme, reveal and Sign in icons measure 18×18 with 24×24 viewBox, computed stroke 1.8px and no non-scaling vector effect: 1.35px rendered stroke. The Sign in arrow sits beside weight-600 text. | Delete the global stroke-width override. Native Lucide 2-unit strokes render at 1.5px for these regular-text 18px controls; use Lucide's absoluteStrokeWidth on the semibold Sign in arrow for a 2px rendered stroke. Recheck any shared affected icons when their authenticated flows become available. | The owning icons rule measures rendered pixels: 1.5px beside regular text, 2px beside medium/semibold. One global value makes the regular icons slightly thin and the primary-action arrow visibly lighter than its label. Glyphs remain recognizable; task impact is limited polish. |

One root cause reported; none excluded by the 15-row cap. No HIGH trigger was confirmed.

Prior build1 findings: the MEDIUM gamut defect is fixed by the five explicit sRGB palette values at globals.css:5–9 and their semantic mappings. The LOW primitive-bypass defect is fixed by semantic navigation/accent/border roles at lines 23–29 and their component use. The prior theme remount risk is corrected in source: theme-toggle.tsx now derives state through useSyncExternalStore from the document data-theme attribute and observes changes. Repeated visible toggles kept the action name and actual theme synchronized. Authenticated client-route remount behavior remains outside this runtime scope.

## Verification

### Observed checks

- Opened root and reached sign-in with title “Sign in · Baseerat AI”; the purpose, primary action, required fields and administrator recovery route were visible.
- Keyboard Tab order was theme → email → password → reveal → Sign in. Captured visible focus on all five light-theme stops; also inspected narrow dark input focus. Computed focus used the explicit role color. Enter submitted and Space toggled reveal/theme. Recovery link was keyboard reachable with a visible ring and Enter activated it.
- Control geometry: inputs about 50px high; primary action 46px; reveal 40×40; theme 40px high and 40px wide at narrow width. These exceed the 24px baseline without overlapping hit areas.
- Empty submit focused Email address and exposed the native “Please fill out this field” guidance. An invalid email exposed the native missing-@ guidance and focused Email address. These checks retained platform validation.
- Submitted disposable nonexistent `interface-build2@example.invalid` with a deliberately invalid review password. Actual pending AX state was “Sign in · Connecting…” with aria-disabled and stable status “Signing in. Wait for your workspace.” Focus stayed on submit. Actual result was “Unable to sign in. Check your email and password, then try again.” Both typed inputs remained; revealing showed the retained password. Keyboard Enter retried and returned to the same recoverable failure. No real credential or successful account session was used.
- Inspected sign-in/error screenshots at all five widths in both themes. At 320, innerWidth=320 and document scrollWidth=305 with scrollbar reserved; no page horizontal overflow was observed. Vertical scrolling and keyboard focus reached the form, warning/error, Sign in, help and footnote. At 768, scrollWidth=753; at 1024/1440/1920 it equaled viewport width. Controls and copy fitted their columns. Decorative story content is intentionally removed below the authored 760px breakpoint.
- Long email plus revealed mixed Urdu/Latin/HA-204 password at 320 retained native input scrolling. End exposed the password tail, with input scrollLeft=1994 and clientWidth=255; document scrollWidth stayed 305. This verifies editable fields only, not whole-interface RTL or Urdu answer layout.
- Direct notice URL showed “Sign-out completed, but its audit record could not be saved. Contact your administrator.” It retained the form and recovery help and fitted at 320 in both themes. Actual computed text is the secondary text role, due to sign-in paragraph styling, over the warning background; measured that actual pair below. This check proves notice presentation only.
- Direct Explorer entry returned to sign-in. Direct `/records/00000000-0000-0000-0000-000000000000` exposed the real loading state then returned to sign-in; waited for the sign-in heading before recording the outcome. No protected record data appeared.
- `/interface-review-missing` showed record-unavailable explanation and “Return to Explorer”. Tab/Enter reached actual loading then sign-in. The AX tree retained a route-announcer string “Loading your workspace…” at the completed client navigation; spoken final-context behavior requires AT verification.
- Limited read-only DOM audit: zero unlabelled inputs, zero positive tabindex values, zero focusable descendants of aria-hidden content; native required email/password with username/current-password autocomplete; one alert; stable pending status plus notice status where relevant; viewport “width=device-width, initial-scale=1”. This is not a full automated accessibility audit.
- Source search `rg -n 'animation|transition|scale|will-change|opacity|hover|active' src/app/globals.css` found no adopted animation/transition. Hover rules are under hover-capable media. All state/theme changes are immediate by explicit source comment. No animation/10%-speed replay was applicable.
- Read-only source commands included `rg --files` convention/component inventories, `Get-Content` of the named files, `git status --short`, `git rev-parse HEAD`, the source-diff command above and `Get-Content .next/BUILD_ID`. No application source edit, build, environment-secret read, test-account creation or provider mutation was performed. Only this report was written.

### Color measurements

Read actual getComputedStyle foreground/background/border/opacity and the nearest painted ancestor. Text surfaces are opaque (opacity 1), with no image or overlay behind measured pairs. Transparent sign-in containers paint on the root page; reveal paints over the input surface. Matched computed colors to their resolved semantic definitions, converted numeric OKLCH/hex values to linear sRGB, and used WCAG relative luminance. No gamut clamping was needed: all 26 authored/consumed palette values are in sRGB (linear channel range 0–1), including the five replacements. The authored black-alpha shadow is in gamut and carries no text. Unused third-party Tailwind palette steps are not claimed corrected.

| Actual pair / state | Ratio | Required |
| --- | ---: | ---: |
| Light primary / page; secondary / page | 17.05:1; 7.23:1 | 4.5:1 text |
| Light input text / white; secondary icon/placeholder / white | 17.84:1; 7.56:1 | 4.5:1 text; 3:1 meaningful icon |
| Light primary action white / #005f5a; source hover white / teal-900 | 7.54:1; 9.46:1 | 4.5:1 |
| Light focus #009488 / page; / white | 3.59:1; 3.76:1 | 3:1 |
| Light input border / white; / page | 4.77:1; 4.55:1 | 3:1 |
| Dark primary / page; secondary / page | 18.40:1; 13.59:1 | 4.5:1 |
| Dark input text / surface; secondary icon / surface | 16.28:1; 12.02:1 | 4.5:1 text; 3:1 icon |
| Dark input border / surface; / page | 6.79:1; 7.68:1 | 3:1 |
| Dark primary action slate-950 / teal-300; source hover / teal-200 | 13.71:1; 16.02:1 | 4.5:1 |
| Dark focus/accent teal-300 / page | 13.71:1 | 3:1 focus; 4.5:1 small text |
| Credential error light #a30037 / rose-50; dark #ffccd3 / rose-950 | 7.31:1; 11.06:1 | 4.5:1 |
| Actual notice light slate-600 / #fffbeb; dark slate-300 / amber-950 | 7.29:1; 10.10:1 | 4.5:1 |
| Story white / slate-950; secondary slate-300 / illustration slate-800 | 20.17:1; 9.87:1 | 3:1 large heading; 4.5:1 small text |

These are computed style/token measurements, not sampled final raster pixels. Hover values explicitly marked “source hover” are declared-pair checks. Screenshot capture occasionally omitted unchanged story pixels after theme swaps or momentarily used a previous viewport bitmap while DOM geometry updated. Subsequent captures at 1024/1920 showed the full story; no source rule hides it in dark mode. This capture uncertainty is recorded rather than attributed to an application defect.

### Not verified / outstanding coverage

- **Real authenticated complete flow and four-account matrix:** sign-in success, Overview → Explorer → record → exact version → sign-out; effective source contrast/denials; private/source outage/stale/empty/error states; real audit write/failure/logout recovery; logout invalidation and back-forward/account changes. Real accounts were unavailable. Neither direct notice inspection nor source inspection substitutes for these.
- **Authenticated shared component rendering:** shell/nav/account footer/record list/detail/provenance, their both-theme responsive/long-string/keyboard/AT states, and theme state after client-route remount. All need a follow-up rendered review with real accounts.
- **Screen reader:** no NVDA/JAWS/Narrator walk. AX and role markup do not prove spoken validation, repeated error/status, route focus/context or notice announcements. Verify the retained route-announcer behavior with the target AT.
- **Actual 200% zoom and text resize:** four Control+plus keys at 1024×900 did not change innerWidth=1024 or root/input=16px; Control+0 reset afterward. This surface exposes viewport sizing, not a confirmed zoom control. No DOM mutation was used as a substitute.
- **Full automated accessibility audit**, Windows forced-colors runtime, current desktop Chrome/Edge exact-version acceptance, true touch/coarse pointer/mobile keyboard/browser chrome: not exercised through this IAB surface.
- **Pseudo-localized static copy and text enlargement**, Urdu answer font coverage/bidi/RTL answer regions: no answer UI exists in this slice, and static DOM copy was not altered. The editable mixed-string check has a narrower scope.
- **Runtime reduced-motion preference emulation and Animations panel:** only visibility/viewport browser capabilities are advertised. Reduced-motion emulation was not available; no authored motion exists to replay at 10% speed.
- **Actual connectivity/429/configuration failures and error-boundary reset:** recovery strings/handlers were inspected in source, but failures were not induced. Missing-route runtime was inspected in light theme at 1024; other missing-route themes/widths remain unverified.
- **Final raster/P3 contrast** and every authenticated warning/selected/hover color state: not measured. The numeric table describes its computed method and distinguishes source-only hover checks.

## Verdict

**Approve**: no HIGH findings remain in the inspected signed-out scope. The LOW rendered-icon-stroke finding remains work to do. All six owning domains were loaded and inspected; none is Not reviewed. This limited verdict does not complete BAS-001, authenticated affected-flow coverage, Chrome/Edge acceptance or any Not verified check. A successful rebuild after any fix requires another fresh separate rendered review.

