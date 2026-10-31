# Baseerat AI interface guidelines

Status: planning requirements; no application interface implemented or reviewed.
Updated: 31 October 2026.

These guidelines record the user's latest interface direction and the installed
`better-*` skills' applicable rules. They support REQ-012, REQ-014, REQ-017,
REQ-019, REQ-022, REQ-023, REQ-027, and REQ-028 in
[requirements.md](requirements.md). The latest
direction favors a polished, spacious, understandable, persona-focused product
over the source concept's dense presentation. Engineering detail remains
available through useful tables and progressive disclosure.

Application implementation still requires approval of the completed
specification and implementation plan under [AGENTS.md](../../AGENTS.md).
This document does not provide that approval. It selects no framework, component
library, typeface, palette values, spacing scale, or animation dependency.

## Design direction and reviewable criteria

The following identifiers are interface criteria, subordinate to the product
requirements. They do not replace the REQ identifiers or change permissions.

### UI-001: Orient the person around a task

Make the current workspace, investigation scope, relevant result, and next
action understandable before exposing technical detail. Each view has one
primary action. Secondary actions use less emphasis; more than three secondary
actions belong in a discoverable menu where appropriate. A short summary links
to deeper evidence and details. Disclosures and off-screen content have visible,
named cues, and necessary truncated values have a keyboard- and touch-usable
route to the full value.

Acceptance: a reviewer can identify the view's purpose, active scope, primary
action, and route to supporting detail from its initial state. Every collapsed
section and horizontal content region signals its additional content. Hidden
detail does not conceal a warning, recovery instruction, or required action.

### UI-002: Focus each persona without changing authorization

Prioritize recurring-discrepancy investigation for quality engineers and the
supporting material-planning workflow. Leadership and security evaluation views
emphasize the information needed for their tasks. Persona choices organize
navigation, summaries, and suggested starting points; they do not switch
accounts, grant source access, expose private investigations, or bypass the
server's permission checks. The presenter launchpad links to real authorized
features and makes authenticated account changes explicit.

Acceptance: each agreed persona can reach its principal workflow without first
navigating unrelated detail. The same authenticated account retains the same
permissions when its presentation focus changes. Restricted-source, private-
investigation, reviewer-action, and presenter boundaries match REQ-022.

### UI-003: Use space and hierarchy to make information readable

Group with space first, background shapes second, and separators only where
they clarify structure. Use shared alignment edges and the eventual project's
spacing and density tokens. Related items sit visibly closer than unrelated
groups. Primary identifying content leads; supporting metadata and actions
trail. DOM order matches reading and visual order.

Acceptance: realistic records, long identifiers, warnings, and several levels of
detail preserve their grouping at supported widths and enlarged text. Review
findings demonstrate a misread group, overlap, clipping, or inconsistency;
personal preference for a different density is not evidence of a defect.

### UI-004: Use comfortable tables when comparison needs them

Use tables for record comparison, detailed evidence, and numeric analysis where
columns help the task. Begin analytical views with the finding or summary and
offer the relevant records as supporting detail. Do not make dense tables the
default container for every view. Keep headers, units, active filters, scope,
and sorting understandable. Align numbers to the trailing edge, text to the
leading edge, and use tabular numerals for numeric columns and changing values.
Allow access to full identifiers and values.

Acceptance: a reviewer can compare realistic rows without ambiguous headings,
lost units, or unreadably compressed text. At narrow widths, genuine two-
dimensional tables may scroll inside a clearly signaled, keyboard-usable
container; the page itself reflows. The key finding and critical actions remain
reachable without discovering an unexplained scroll edge.

### UI-005: Use a calm theme with meaningful emphasis

Use neutral working canvases, dark navigation, restrained accent emphasis, and
a discoverable light/dark theme toggle. These are project presentation choices,
not universal correctness rules. Maintain one theme-switching mechanism and
semantic color roles for surfaces, text, controls, focus, accents, and shipped
statuses. Components consume role tokens. Reserve danger meaning for dangerous
actions or states, and pair every semantic color with text, an icon, or another
non-color cue. Filled primary emphasis belongs to one action per view when
filled color is the chosen hierarchy.

Acceptance: both themes and every rendered state retain readable text,
distinguishable controls, visible focus, and consistent semantic meaning.
Measure the actual rendered foreground/background pairs, including opacity,
overlays, and content beneath translucent surfaces. Theme changes suppress
color transitions. Palette values remain to be specified and measured; no
contrast ratio is claimed by this planning document.

### UI-006: Keep language and typography understandable

Keep navigation, controls, engineering documents, and report narratives English.
Use the glossary's names consistently, sentence case by default per element
type, verb-first action labels, destination-specific links, persistent field
labels, and calm errors that explain recovery. AI answers follow the latest
question's language unless explicitly overridden to English or Urdu. Support
Urdu script, Roman Urdu, and mixed questions without altering technical
identifiers, revisions, numbers, or units.

Set appropriate language and direction metadata on content whose language or
direction changes. Urdu answer blocks use RTL; the English interface stays
LTR. Isolate mixed-direction identifiers and values with bidi-safe markup, and
never reverse digits manually. Mirror directional layout and icons only where
their meaning requires it. Check the actual Urdu font coverage and rendering.

Use an eventual semantic type scale with descending heading hierarchy,
unitless line heights, readable wrapping, and a 60–75-character cap for long-form
text. Text under 18px uses weight 400 or heavier. Text wrapping to three or more
lines needs line-height of at least 1.4. Keep useful content selectable. Mobile
inputs must avoid iOS's sub-16px input zoom; resolve the skill's design choice
between sizing up and compensated scaling when the actual input design exists.

Acceptance: English and Urdu answers, long record identifiers, citations,
numeric units, and mixed-script passages render and read in their intended
order at supported widths. Body copy does not become an unbounded line or clip
when enlarged. Labels match their actual action and errors name the next step.

### UI-007: Make the complete flow keyboard and assistive-technology usable

Use native buttons, links, and form controls where they meet the interaction.
Every interactive control has an accessible name, role, and state. Its visible
label appears in its accessible name. Every pointer path has a keyboard path;
focus remains visible, follows a meaningful order, and is not hidden by sticky
chrome. Overlays contain and restore focus appropriately; route changes update
the document title and move focus to the new context. Provide a skip link past
repeated navigation. Associate labels and errors with their controls and
announce dynamic results without unnecessarily interrupting the person.

Use WCAG 2.2 A/AA criteria for findings. Text requires 4.5:1 contrast, or 3:1 for
large text of at least 24px or 18.67px bold. Meaningful UI boundaries, graphics,
states, and custom focus indicators require 3:1 where applicable. Respect
inactive-control and logo exemptions. Target size follows the 24-by-24 CSS-
pixel AA baseline or its documented exceptions; larger targets are usability
heuristics, and expanded hit areas must not overlap. Dragging has an equivalent
single-pointer alternative.

Acceptance: perform both a keyboard-only task walk and a screen-reader walk,
inspect computed accessible names/roles/states and focus at every stop, and run
a relevant automated audit. Automation alone does not establish accessibility.
Record the tested browser and assistive technology, measured contrast pairs,
exceptions, and every unverified check.

### UI-008: Adapt without losing content or actions

Choose breakpoints where actual content ceases to fit. Let controls and rows
wrap, use logical direction-aware properties, and avoid fixed text-container
heights that clip enlarged or longer content. Keep critical actions reachable
with mobile browser chrome and the on-screen keyboard present. Specify the
supported viewport range in the implementation-ready specification rather than
assuming desktop-only behavior from the source concept.

Acceptance: inspect every supported width, including 320 CSS pixels, and 200%
zoom/text resize. No necessary content or control is clipped, overlapped, or
unreachable. The page reflows with vertical scrolling; genuine two-dimensional
content uses its own accessible container. Test long strings/pseudo-localized
content and RTL answer regions without implying a translated English UI.

### UI-009: Show truthful, recoverable states

Design initial, empty, filtered-empty, loading, pending, success, validation,
partial-result, unavailable-source, stale-data, permission-denied, and error
states wherever the flow can reach them. Distinguish no records from records
that could not be loaded. Empty states explain the place and one appropriate
next action; filtered empty states expose a way to clear or change filters.
Pending actions preserve their name and prevent duplicate effects. Errors say
what failed and how to recover. Preserve typed work and saved context during
recoverable failures.

AI and voice states include listening, processing, speaking, interruption,
reconnection, and typed fallback in the same investigation. Provider-wide
outages preserve saved content and Explorer access while new AI requests show
unavailability/retry. Make source age, partial coverage, applicability
mismatches, and forecast assumptions/uncertainty inspectable. Preserve the
accepted action policy: explicit saving/export requests, confirmation before
replacement or sharing, and explicit human marking of Reviewed.

Acceptance: each reachable state has a defined trigger, truthful visible and
announced feedback, and an available next step. Retrying or reconnecting cannot
duplicate a save/export. Necessary error information and actionable toasts do
not vanish on a timer. Presentation does not claim engineering approval,
complete evidence, current data, or successful saving without the underlying
state supporting that claim.

### UI-010: Polish supports interaction

Keep surfaces and icons consistent with the eventual component system. Review
interaction first and cosmetic details afterward. Motion must be interruptible
where state can reverse, provide a persistent static state cue, and honor
`prefers-reduced-motion`. Gate movement, scaling, and blur behind no-preference;
use opacity feedback for the reduced-motion alternative and disable parallax
and autoplay. Routine keystrokes, row hovers, and tabs respond instantly or
within the owning skill's short feedback rule. Apply its exact recipes only
where the corresponding effect is used; a decorative animation is not required.

Acceptance: exercise hover-capable and touch input, pressed, selected, disabled,
loading, and overlay states. Verify reversal during motion and inspect animation
at 10% speed where motion exists. Reduced-motion users retain the full state
and action information. Theme switching does not animate every color, and
scrollable overlays contain overscroll.

## Purposeful motion amendment

Use [motion-guidelines.md](motion-guidelines.md) and the invoked motion-design
skill for animation selection. Every effect needs a functional benefit and
truthful trigger, with immediate feedback and a reduced-motion alternative.
The user's conditional request overrides decorative/ambient-layer recipes.
The post-build reviewer checks adopted motion within UI/accessibility; no
animation is a valid outcome.

## Verification and remaining planning work

The [interface review policy](../execution/interface-review-policy.md) defines
the mandatory separate-agent review after every successful future application
build. Reviews use the owning skills and source plus runtime evidence. A
planning criterion is not evidence that an interface passes it.

The specification must still define supported browsers and assistive-technology
combinations, viewports, persona entry paths, precise state behavior, accessible
chart alternatives, and the final design tokens/components. Resolve those
within specification planning; this guideline does not authorize construction
or claim runtime verification.

## Skill sources

Rules were read from the installed `better-interface` skill and its
`review-format.md`, followed by the full `SKILL.md` files for
`better-accessibility`, `better-layout`, `better-writing`,
`better-typography`, `better-colors`, and `better-ui` under
`C:/Users/TechMatched/.codex/skills/` on 31 October 2026. Their owning references
are inventoried in the review policy. Reload the installed versions for each
future review; this document does not replace them.
