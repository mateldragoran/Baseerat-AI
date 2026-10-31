# Interface review: BAS-001 build1 / signed-out entry and recovery

Date: 1 November 2026, Asia/Karachi (review ended 31 October 2026 19:01 UTC).
Reviewer: fresh separate read-only agent `/root/ui_bas001_build1`.
Runtime: `http://localhost:3000`.

Build supplied by builder: `node .tools/package/bin/npm-cli.js run build`, exit 0; Next 16.4.3, compile 2.7s, typecheck 2.1s. Supplied build revision: `55cbd7a`, branch `codex/bas-001`. Reviewer independently read `.next/BUILD_ID`: `hhYsIEPtDtfQmUTVxDz76`. No rebuild was performed. During review HEAD became `40cd3444a34c39ebfe39a396b0c497620fc91a43`; `git diff --name-only 55cbd7a..HEAD -- src package.json package-lock.json` returned no paths. Latest observed unrelated working-tree change was `supabase/tests/bas001_access.sql`. Application source remained frozen for this review.

## Scope and coverage

Reviewed the reachable signed-out flow: `/` redirects to sign-in; initial sign-in; native required/email validation; password reveal/hide; keyboard order and focus; pending credentials; actual invalid-credential response, input retention and retry; light/dark switch; direct Explorer and record URL protection; missing-route recovery back through Explorer to sign-in. Inspected shared source for Overview, Explorer, record detail, shell, loading/error and sign-out. Source inspection does **not** approve their authenticated rendering or behavior.

Actual stack: Next App Router 16.4.3, React 19.3.1, TypeScript, Tailwind 4.3.3 with authored global CSS and semantic CSS custom properties, native form controls, Lucide React 1.66.0; Segoe UI/Arial/system fallbacks. No installed application component framework, animation library or adopted animation was found. Auth uses hosted Supabase; no real Auth accounts were available. No fabricated sessions or account provisioning was used.

Recon read `AGENTS.md`, `docs/agents/domain.md`, `GLOSSARY.md`, architecture decision index and ADR-0003, requirements, relevant specification/architecture/implementation-plan sections, BAS-001, interface/motion guidelines and review policy, README and package commands. No CLAUDE, CONTRIBUTING, CODING_STANDARDS or Storybook convention file was found. Loaded installed `better-interface/SKILL.md` and root `review-format.md`, then full accessibility, layout, writing, typography, colors and UI skills in that order. Relevant owning references included all six accessibility references; both layout references; writing patterns; typography spacing/sizing and wrapping/punctuation; colors contrast, token naming and color formats; UI surfaces/icons. No animation was adopted, so motion recipes were not imposed as mandatory effects.

Browser: CUA ChatGPT in-app browser (`iab`, browser ID 2, tab ID 1), DOM/AX inspection and screenshots through `mcp__cua_repl` only. Exact engine/version was not exposed by its supported DOM scope; `navigator.userAgent` was unavailable. This is not Chrome/Edge compatibility acceptance. Builder separately reported a Chrome for Testing 156.0.8078.4 signed-out acceptance pass; that is supplementary builder evidence, not this reviewer's browser walk.

| Domain | Evidence inspected | Result |
| --- | --- | --- |
| Accessibility | `auth-controls.tsx`, theme toggle, shell, loading/error/not-found; native labels/types/autocomplete, AX names/roles/states, keyboard walk and visible focus in both themes; limited automated DOM audit | Clear within inspected signed-out checks; screen reader, full audit, zoom and authenticated checks Not verified |
| Layout | `globals.css`, sign-in DOM/visual order; screenshots at 320/768/1024/1440/1920; narrow-page scrolling and long editable inputs | Clear within inspected states; enlarged text, pseudo-localized static copy and authenticated layouts Not verified |
| Writing | Sign-in labels/help, actual credential error, pending copy, not-found recovery; source strings in auth API, shared HTTP failures, shell, catalogue and records | Clear within inspected flow; unseen server/permission/outage outcomes Not verified |
| Typography | Computed 16px input text, 400+ small-text weights, unitless source leading, heading hierarchy, English `lang`/LTR, wrapping, long email and mixed Urdu/Latin revealed password; source `bdi` and record date formatting | Clear within inspected flow; Urdu answer regions and authenticated long content Not verified |
| Colors | Both theme blocks, actual computed foreground/painted ancestor backgrounds and opacity, input boundaries, focus, error and primary action; imported primitive gamut calculation | 1 MEDIUM, 1 LOW; final raster/P3 mapping Not verified |
| UI | Native/quiet/primary/password button states, currentColor Lucide icons, hover media query, pending/retry, immediate theme changes; all authored state CSS | Clear within inspected flow; touch emulation and authenticated states Not verified |

## Findings

| Severity | Domain | Location | Before | After | Why |
| --- | --- | --- | --- | --- | --- |
| MEDIUM | Colors | `src/app/globals.css:10`–16 and 42–50, plus warning mapping at 24; imported `node_modules/tailwindcss/theme.css:34`, 100, 102, 204, 210 | Semantic roles directly consume out-of-sRGB primitives without an in-gamut fallback: teal-600 linear sRGB R=-0.023090; teal-800 R=-0.002128; rose-800 G=-0.003638; rose-200 R=1.000463; amber-50 R=1.001466. Sign-in visibly consumes teal-600/800 and rose-800/200. Amber warning is source-only in this run. | Define in-gamut role values in the existing token layer, reducing chroma while holding hue/lightness; retain wider-gamut enhancement only under the matching gamut query if useful. Remeasure rendered pairs after the change. | The colors skill requires every consumed step to fit the target gamut or have a deliberate fallback. Display-dependent mapping should not decide the semantic palette. No text contrast failure was confirmed. |
| LOW | Colors | `src/app/globals.css:81`, 95, 98, 102, 104, 106, 133 | Brand/story accents and illustration/navigation borders reference raw teal/slate primitives inside component rules, bypassing the otherwise established semantic tier. | Add/reuse semantic roles for navigation accent and its relevant border/separator roles, then point those component rules at them. Preserve the current appearance where intentional. | The owning token rule says components consume semantic roles. These exceptions make theme changes require component edits; this is a token-system inconsistency, not a current readability blocker. Active-navigation runtime remains unverified. |

Two root causes reported; no findings excluded by the 15-row cap. No HIGH trigger was confirmed in the inspected flow.

## Verification

### Observed checks

- Opened `/` in IAB: landed on `/sign-in`, title `Sign in · Baseerat AI`; form purpose, required fields and administrator recovery guidance were visible.
- Keyboard walk: Tab reached theme, email, password, reveal/hide and Sign in in reading order. Space toggled password visibility and changed its accessible name; Enter submitted. Screenshots showed the custom ring at each form stop. Dark narrow input/button rings also remained visible. Target measurements: theme/reveal 40×40 CSS px, inputs about 50px high, submit 46px high; all exceed the 24px baseline.
- Submitted empty form, then `not-an-email`: browser validation focused Email address and exposed the native required/missing-`@` guidance in AX. No request was needed for these states. Native browser validation was retained rather than classed as a missing custom error implementation.
- Submitted disposable nonexistent `interface-review@example.invalid` with a deliberately invalid password: observed `Sign in · Connecting…`, disabled AX state backed by `aria-disabled`, and persistent status text `Signing in. Wait for your workspace.` Focus stayed on submit. Actual response: `Unable to sign in. Check your email and password, then try again.` Both typed values remained visible when revealed. Repeated keyboard submission returned to the same recoverable failure. No valid credential was entered.
- Switched themes repeatedly. No authored transition/animation was found by `rg -n 'animation|transition|scale|will-change|opacity' src`; the stylesheet explicitly records immediate changes at line 229. Source uses one `data-theme` mechanism. Dark→reload reset both document theme and toggle coherently to light; persistence is not claimed. No animation/10%-speed replay was applicable.
- Used viewport capability `set({width,height})` at 320×720, 768×900, 1024×900, 1440×900, 1920×1080 and inspected screenshots in both themes, including credential-error layout. At 320, document/body scroll width was 305 versus innerWidth 320 (scrollbar reserved); controls fit within the content margins. Vertical scrolling/keyboard focus reached submit, help and footnote. No horizontal page overflow or inaccessible control was observed. Viewport override was reset afterward.
- Long email plus a revealed mixed Urdu/Latin/HA-204 password at 320: native input scrolling and End key exposed the tail; no page overflow. This checks editable-field behavior only, not Urdu answers or whole-interface RTL.
- Direct navigation to `/explorer` and `/records/00000000-0000-0000-0000-000000000000` while signed out returned to sign-in. `/interface-review-missing` showed the record-unavailable state with `Return to Explorer`; keyboard activation briefly showed the real workspace-loading view and ultimately returned to sign-in. No protected record data appeared.
- Limited read-only DOM audit through CUA evaluation: zero unlabelled inputs; zero positive tabindex values; five native form controls with names; required email/password and username/current-password autocomplete; one alert and one stable status region; viewport meta `width=device-width, initial-scale=1`. This is not a comprehensive automated accessibility audit.
- Source/read-only commands: `rg --files` convention inventory; `Get-Content` of named contracts/components/CSS; `git status --short`, `git rev-parse HEAD`, `git log -3 --oneline`, the source-diff command above, and `Get-Content .next/BUILD_ID`. No test/build, source edit, environment-secret read or external-data mutation was performed by this reviewer.

### Contrast evidence and limits

Read actual computed colors, the ancestor that paints each background, and opacity (1) in both themes. The sign-in surfaces are opaque with no image/overlay behind the measured text. Converted CSS colors to linear sRGB and applied WCAG luminance; out-of-gamut channels were clamped for the sRGB calculation below. Gamut classification separately used the **unclamped** imported OKLCH values and standard OKLab→linear-sRGB equations. These are computed rendered-style measurements, not sampled final screenshot pixels. Final browser gamut mapping/P3 raster measurement remains Not verified and must be repeated after the palette correction.

| Inspected pair / state | sRGB ratio | Required |
| --- | ---: | ---: |
| Light primary text / page (slate-900 / slate-50) | 17.05:1 | 4.5:1 |
| Light secondary text / page (slate-600 / slate-50) | 7.23:1 | 4.5:1 |
| Light input text / white | 17.85:1 | 4.5:1 |
| Light placeholder/password icon / white | 7.56:1 | 4.5:1 text; 3:1 meaningful icon |
| Light primary action white / teal-800; hover white / teal-900 | 7.53:1; 9.46:1 | 4.5:1 |
| Light focus teal-600 / page; / white input | 3.49:1; 3.66:1 | 3:1 |
| Light input boundary slate-500 / white; / page | 4.77:1; 4.55:1 | 3:1 |
| Dark primary / page (slate-100 / slate-950) | 18.40:1 | 4.5:1 |
| Dark secondary / page (slate-300 / slate-950) | 13.59:1 | 4.5:1 |
| Dark input text / surface (slate-100 / slate-900) | 16.28:1 | 4.5:1 |
| Dark password icon/secondary / input surface | 12.02:1 | 3:1 icon; 4.5:1 text |
| Dark input boundary / input; / page | 6.79:1; 7.68:1 | 3:1 |
| Dark primary action slate-950 / teal-300; hover / teal-200 | 13.71:1; 16.02:1 | 4.5:1 |
| Dark focus/accent teal-300 / page | 13.71:1 | 3:1 focus; 4.5:1 small text |
| Error light rose-800 / rose-50; dark rose-200 / rose-950 | 7.20:1; 11.07:1 | 4.5:1 |
| Story white / slate-950; secondary slate-300 / slate-800 illustration | 20.17:1; 9.87:1 | 3:1 large heading; 4.5:1 small text |

Transient IAB screenshot captures sometimes omitted unchanged story pixels after wide theme swaps, or retained a prior viewport composition while AX and computed geometry had updated. Resizing 1440→1441→1440 produced a complete stable dark screenshot with the story intact. This capture inconsistency is recorded as evidence uncertainty, not attributed to an application source defect.

### Not verified / outstanding coverage

- **Real authenticated complete flows:** sign-in success, four account profiles/source contrast, Overview→Explorer→record/exact version→sign-out, private/denied source behavior, stale/empty/loading/error states, account changes/back-forward cache, all authenticated responsive/long-content rendering and keyboard/AT coverage. Real Auth accounts were unavailable; hosted schema/seed and anonymous denials do not substitute for this.
- **Theme remount risk:** `src/components/theme-toggle.tsx:5` initializes local `dark=false` without reading the retained HTML attribute. A remount while HTML remains dark could expose `Use dark theme` while already dark. Sign-in has no internal route link to exercise that remount. Verify authenticated Overview↔Explorer/record navigation in dark mode; synchronize theme ownership if the mismatch occurs. This is a source-supported follow-up, not a fabricated runtime finding.
- **Screen reader:** no NVDA/JAWS/Narrator session was run. AX names/roles and alert/status markup do not establish spoken error, route or repeated-announcement behavior. After not-found recovery, AX retained a hidden `Loading your workspace…` route-announcer string alongside completed sign-in; verify final context announcement with the target AT before claiming it works.
- **200% browser zoom and text resize:** attempted four `Control+plus` keys at 1024×900 then `Control+0`; innerWidth stayed 1024 and root/input size stayed 16px. No actual 200% evidence was obtained. The IAB capability exposed viewport sizing only, and DOM mutation was not used as a substitute.
- **Full automated accessibility audit**, forced colors runtime, real touch/coarse pointer, mobile keyboard/browser chrome, exact current Chrome and Edge versions: not exercised in this CUA surface. Source guards/native semantics and limited DOM audit were inspected only.
- **Pseudo-localization/static string growth**, whole-interface RTL mirror, real Urdu answer/font coverage: no localized answer UI exists in this slice and no DOM content was altered. Long editable-field stress is the limited evidence above.
- **Runtime reduced-motion preference emulation** and Animations-panel 10% replay: unavailable through the exposed browser API. No application animation/transition exists in inspected source; no missing decorative effect is a finding.
- **Error-boundary reset and connectivity/429/configuration failures:** recovery source inspected but these actual runtime failures were not induced. Missing-route recovery was exercised in light mode; its dark rendering was not reached through an exposed signed-out control.
- **Final pixel/P3 contrast**, complete authored warning/selected/authenticated palette states: require the next rendered review after token fixes. Current table states its computed sRGB method explicitly.

## Verdict

**Approve**: no HIGH findings remain in the inspected signed-out scope; the MEDIUM gamut and LOW token findings remain work to do. All six owning domains were loaded and inspected; none is marked Not reviewed. This limited verdict does not close BAS-001, its authenticated flow gate, or any Not verified check above. Any successful rebuild requires a fresh separate review of the affected complete flows.
