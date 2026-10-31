# Baseerat AI interface review policy

Status: future execution policy; no application build or interface review has
been performed under this policy.
Updated: 31 October 2026.

The user requires application UI/UX to follow the installed `better-*` skills
and a separate reviewer agent after every future application build. This policy
implements that requirement alongside [interface-guidelines.md](../product/interface-guidelines.md).
It does not approve application implementation. The repository remains limited
to planning until the user approves the completed specification and plan under
[AGENTS.md](../../AGENTS.md).

## Trigger and independence

After **every successful application build**, the root agent dispatches a fresh,
separate reviewer agent before claiming the resulting application work complete.
The builder cannot substitute its own review for that reviewer. This includes
successful rebuilds after review fixes. Failed builds are recorded and repaired;
they cannot support a UI-pass claim. No build may be run merely to activate
this policy while application implementation is still unapproved.

The recurring separate-agent requirement comes from the user; it is additional
to the skills. `better-interface` orchestrates domain reviews but does not itself
require a separate agent or an after-build trigger. An ordinary post-build flow
review proceeds under the user's standing instruction and introduces no extra
user permission step. This policy does not create deployment authorization.

The reviewer is read-only by default. It may use safe interactions and test
fixtures required to inspect the flow, but it must not edit application source
or change real external data. It writes its report to the supplied report path.
The root/builder implements authorized fixes, rebuilds, and requests a new
separate-agent review. Do not label an unchecked fix resolved.

## Scope: complete affected flows

Supply the build command/result, exact source revision or working-tree state,
runtime URL, fixture/account setup, and affected user flows. These identify the
artifact being reviewed; they are not a guessed diff scope. Review each affected
**complete flow**, from its entry point through its meaningful outcome and
recovery, across all six domains. Include shared components, navigation,
permissions, empty, loading, error, and narrow-width states that the flow reaches.
An unrelated successful build still requires the separate review; state the
relevant entry flow and any unchanged-interface boundary explicitly.

If the scope is too large to inspect credibly, apply `better-interface`'s rule:
narrow to one complete flow centered on the request, or the common entry path,
and state all exclusions. Queue additional reviewer runs for the other affected
flows before claiming the whole requested scope reviewed. Never turn a narrow
review into a whole-product approval.

The skills distinguish this flow review from an explicit review of a branch,
pull request, commit range, or uncommitted changes. Such a user request belongs
to the user-invoked `interface-review` skill. `better-interface` says to identify
that change-review request and ask the user to invoke `interface-review`; it
cannot start that skill or guess the diff itself. If that skill is unavailable,
state that fact. Do not reroute the ordinary standing post-build flow review
into that user-invocation step. When `interface-review` hands a review back,
use its output format, including `Status` and pre-existing findings; its cap and
verdict concern `Introduced` and `Regression` findings only. Findings that are
only `Pre-existing` leave that change verdict `Approve`.

## Required skill loading and order

For every run, read the installed `better-interface/SKILL.md` and
`better-interface/review-format.md`, then load and complete all owning domains
in this order before consolidating:

1. `better-accessibility`: semantics, keyboard, focus, names, forms, announcements,
   contrast applicability, motion preference, and zoom requirements.
2. `better-layout`: grouping, reading order, space, disclosure cues, responsive
   structure, translated-string growth, and spatial RTL.
3. `better-writing`: labels, vocabulary, action accuracy, recovery copy,
   confirmations, empty states, and status messages.
4. `better-typography`: type roles, computed metrics, fonts, wrapping, full-value
   access, numeric layout, language metadata, and bidi rendering.
5. `better-colors`: semantic role mapping, themes, gamut, and measured contrast.
6. `better-ui`: surfaces, icons, motion recipes, touch/hover states, and polish.

When an affected flow includes animation, also read motion-design and
[the project motion guidelines](../product/motion-guidelines.md). Check the
functional adoption test within UI and reduced-motion/focus behavior within
accessibility. No effect is mandatory; missing ambient/secondary layers are not
findings under the user's functional-only instruction. Preserve the existing
six-domain consolidated report and severity rules.

Use each skill's principles, relevant references, and verification checks. The
combined review uses **better-interface's** severity and output format instead
of the standalone domains' ladders and separate tables. Assign an issue to its
underlying rule owner and put secondary effects in its Why cell. A missing skill
means that domain is `Not reviewed`, with the skill and reason named; continue
with the other domains without reconstructing missing rules from memory.

Recon must identify the actual framework, styling system, component library,
design tokens, supported viewports, runtime/preview commands, and project
conventions. Read applicable AGENTS, CLAUDE, CONTRIBUTING, coding standards,
design-system/Storybook docs, interface ADRs, glossary, and product requirements;
name which exist. Use existing conventions to settle matters of taste, never
to excuse an escalation trigger or domain violation. Do not invent a stack or
replacement design system in a finding.

## Evidence and mandatory verification

Run safe, relevant project checks and inspect the rendered interface when a
finding depends on appearance or runtime behavior. Record the exact command or
interaction and observed result. A screenshot alone cannot establish a code
finding; source alone cannot establish a runtime/visual finding. Every finding
cites `path/to/file:line` and shows the current implementation. For a genuinely
source-less artifact, the skill permits the exact screen and component instead.
Record runtime evidence with the route, fixture/account, state, viewport/zoom,
theme, browser, and screenshot or observation that makes it reproducible.

Required owning-skill checks are:

| Domain | Source checks | Runtime checks |
| --- | --- | --- |
| Accessibility | Names on every interactive element; non-native control key handlers; focus styles; reduced-motion guards; labels bound to inputs. | Walk the complete flow keyboard-only, then with a screen reader; inspect computed names, roles, and states; verify focus at every stop; run an automated audit. Record WCAG A/AA criterion or concrete assistive-technology task for each finding. |
| Layout | Logical properties; container/media queries against supported widths; DOM order versus visual order. | Every supported width, 320px, 200% zoom, RTL mirror/answer-region behavior; long-string and pseudo-localization stress; hidden-content cues and full-value access. |
| Writing | Inventory terms and actions; read component and locale strings; check every label against its action and every error for a recovery instruction. | Exercise labels, empty states, confirmations, and actual server/API strings. Unseen server/CMS strings are Not verified. |
| Typography | Heading size/weight descending per section; line-height, units, measure, and truncation against realistic strings. | Compare computed values and resize with real content to observe wrapping, lone last-line words, truncation, Urdu and mixed-direction values. |
| Colors | Token values and roles; gamut of every declared color; both theme blocks; compute declared-pair contrast. | Measure actual rendered backgrounds including opacity and underlying images in light and dark. Report the measured pair, value, and required threshold; never invent or estimate a ratio. |
| UI | Read every defined hover, pressed, selected, loading, empty, and other state with durations/easings. | Walk every state; inspect touch/hover behavior and reduced motion; replay motion at 10% speed in the browser Animations panel. If the panel or motion is unavailable, state that accurately. |

Record each check that could not be run as **Not verified**, with reason and
remaining evidence needed. An unrun check is not itself a defect finding.
`Clear` means a domain was inspected and yielded no actionable finding;
`Not reviewed` means it was not inspected and must explain why. Do not use
`Clear` when its owning skill never loaded or its evidence names no files,
components, states, or checks. Partial evidence does not support a claim of
complete domain coverage.

## Ranking and consolidation

Use one scale:

- `HIGH`: blocks a task, misleads the user, hides content or controls, causes
  data-loss risk, or creates repeated systemic failure.
- `MEDIUM`: meaningfully harms comprehension, efficiency, adaptability, or
  consistency.
- `LOW`: isolated polish with limited task impact.

Once the owning skill confirms any of these `better-interface` escalation
triggers, rank it `HIGH` regardless of the surface's prominence:

- Interactive control without an accessible name.
- Keyboard-reachable control without visible focus.
- Pointer-only control or path without a keyboard equivalent.
- Motion or autoplay ignoring reduced-motion preference.
- Content/control clipped, overlapped, or unreachable at 320px or 200% zoom.
- Body/control text failing its required rendered contrast ratio.
- Meaning or state conveyed only by color.
- Destructive action without confirmation, undo, or distinct treatment.
- Truncated content with no access to the full value.
- Content/control beyond a scroll edge or disclosure with no visible cue.
- Error without a recovery route.
- Semantic color contradicting its meaning.
- State change carried only by motion with no persistent color, icon, or label.

Triggers precede all other findings. Within severity, prioritize reach and the
benefit of fixing the shared cause. One root cause is one row listing every
confirmed location, preferably against its shared token/component/guideline.
Propose the cheapest effective fix in this order: delete, use the platform,
reuse the project, correct the value, then add. Preserve documented deliberate
choices unless evidence shows a rule violation.

Report at most **15 findings** in the consolidated report. Do not pad. If more
triggers exist, list them first and state how many the cap excluded; a cap must
never conceal the existence of blockers. Link follow-up report(s) for omitted
blockers/remaining affected coverage before the root claims completion.

## Verdict and project completion gate

Preserve the skill's verdict exactly:

- `Block`: one or more `HIGH` findings remain. Do not ship until they are fixed.
- `Approve`: no `HIGH` findings remain. `MEDIUM` and `LOW` findings remain in the
  table as work to do. Approval covers only inspected domains; name every
  `Not reviewed` domain in the verdict line.

Do not silently redefine `Approve` to mean zero findings or full coverage. The
user-required project gate is separately recorded: each successful build needs
its independent review, and the requested affected-flow scope must be accounted
for before it can be called fully reviewed. A limited `Approve` cannot close
unreviewed flow/domain coverage or imply that Not verified checks passed.
When required runtime evidence is unavailable, record the outstanding coverage
and continue useful authorized work without claiming UI verification complete.
This is an execution evidence requirement, not a new user approval request.

Record the build identifier/command, reviewer identity, report link, skill
verdict, unresolved findings, verified scope, exclusions, and remaining checks
in the execution records. If fixes are needed, the builder fixes them within
authorized scope, reruns relevant checks/build, and the root dispatches a fresh
separate reviewer for that successful build. Review the complete affected flow
again and any new shared-component impact. Keep prior reports for traceability.

## Reusable dispatch prompt

Fill placeholders with observed facts. This is a flow-review request under
`better-interface`; it must not be described as a request to review a diff.

```text
Act as the separate, read-only Baseerat AI interface reviewer for build <ID>.
The build command <exact command> completed with <observed result> against
<source revision/working-tree identity>. Runtime: <URL>. Fixture/account setup:
<setup>. Review these complete affected flows: <entry, task, outcome, recovery>.
Inspect shared navigation/components that those flows use. Report exclusions.
Write the report to docs/execution/interface-reviews/<build-ID>-<flow>.md.

Read AGENTS.md, docs/agents/domain.md, relevant glossary/ADRs and project
conventions, docs/product/requirements.md, docs/product/interface-guidelines.md,
and docs/execution/interface-review-policy.md. For animated flows, read
docs/product/motion-guidelines.md and motion-design; assess usefulness and
reduced-motion behavior without requiring decorative layers. Discover the actual stack and
commands. Load installed better-interface/SKILL.md and review-format.md; then
load and complete better-accessibility, better-layout, better-writing,
better-typography, better-colors, and better-ui in that order, using relevant
references. Do not invent missing skill rules, implementation, or test results.

Verify source and runtime evidence, all reachable states, relevant account
boundaries, English UI/Urdu answer blocks, supported widths including 320px,
200% zoom/text resize, both themes, keyboard/focus, screen reader, measured
contrast, and reduced motion. Record exact commands/steps and observed results.
Mark checks you cannot run Not verified, and unavailable domains Not reviewed.
Do not edit application source or perform unauthorized external mutations.

Return one consolidated better-interface report with scope/coverage, one ranked
table (maximum 15 root causes, blockers disclosed even if capped), verification,
and the exact Block/Approve verdict. Cite current source path:line plus runtime
evidence where needed. Keep medium/low findings visible even with Approve.
Return the report path and outstanding coverage to the root. The builder owns
fixes and a subsequent successful build requires another separate-agent review.
```

## Reusable report template

Create one report per review run. Replace placeholders; never leave example
coverage marked passed. Do not issue a verdict in a planning-only report.

```markdown
# Interface review: <build ID / complete flow>

Date: <date>. Reviewer: <separate agent identity>.
Build: <command/result, artifact/source identity>. Runtime: <URL>.

## Scope and coverage

<Entry, task, outcome/recovery; affected shared components; exclusions;
actual stack/styling/tokens; project convention documents found.>

| Domain | Evidence inspected | Result |
| --- | --- | --- |
| Accessibility | <files, components, states, checks> | <count / Clear / Not reviewed + reason> |
| Layout | <evidence> | <result> |
| Writing | <evidence> | <result> |
| Typography | <evidence> | <result> |
| Colors | <evidence> | <result> |
| UI | <evidence> | <result> |

## Findings

| Severity | Domain | Location | Before | After | Why |
| --- | --- | --- | --- | --- | --- |
| <HIGH/MEDIUM/LOW> | <owning domain without better-> | <path:line; all confirmed locations> | <current implementation; runtime evidence reference> | <actionable replacement in project idiom> | <rule/criterion and user impact> |

<If none, omit the table and state: No actionable interface findings.>
<If capped, disclose excluded trigger count and link follow-up evidence/report.>

## Verification

Passed: <each exact command/interaction, setup, and observed result>.
Not verified: <each unavailable check, reason, and remaining evidence>.
Outstanding project coverage: <remaining flows/domains; no false pass claim>.

## Verdict

<Block if any HIGH remains; otherwise Approve. Name every Not reviewed domain;
state the inspected coverage limit. End the report with this verdict.>
```

## Source record

The following installed sources were read on 31 October 2026 under
`C:/Users/TechMatched/.codex/skills/`. Future reviewers must reload applicable
versions rather than treating this record as a substitute for the skills.

- `better-interface/SKILL.md`, `better-interface/review-format.md`.
- Full `SKILL.md` files for all six owning domains listed above.
- Accessibility: `semantics-and-aria.md`, `focus-and-keyboard.md`,
  `hit-areas.md`, `forms.md`, `motion-and-zoom.md`, `screen-readers.md`.
- Layout: `grouping-and-alignment.md`, `spacing-and-adaptivity.md`.
- Writing: `patterns.md`.
- Typography: `spacing-and-sizing.md`, `wrapping-and-punctuation.md`,
  `details-and-accessibility.md`.
- Colors: `contrast.md`, `token-naming.md`, `color-usage.md`.
- UI: `animations.md`, `icons.md`, `surfaces.md`.

Other owning references must be loaded when their implementation details enter
scope, including palette generation/formats/structure, font loading/features,
staged entrances/exits, icon swaps, and animation performance. Exact recipe
values come from those references, not invented project tokens.
