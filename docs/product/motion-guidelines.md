# Purposeful motion for Baseerat AI

Status: user-requested planning amendment; no animation implemented or runtime
quality claimed. The complete package still awaits final approval.

## Purpose and precedence

Use motion-design to improve feedback, spatial continuity, or understanding of
a real state change. Choose its Corporate personality: calm, precise, responsive,
with no overshoot. An effect with no demonstrable task benefit should be omitted.

The user's “only if it makes sense” condition overrides decorative recipes.
In particular, “Always three motion layers” does not require ambient backgrounds,
secondary choreography or constant movement here. Missing decorative layers is
not a review defect. Static or opacity-only reduced-motion feedback remains valid;
important state changes retain a label/icon and correct semantic state.

Precedence: user intent; accessibility/reduced motion; established better-ui
recipes and project tokens; then motion-design's general choreography guidance.
Do not introduce a second conflicting motion system.

## Adoption test

Before adding an effect, record its trigger, task benefit, smallest effective
property/distance/duration, persistent static cue, reduced-motion alternative,
and usefulness on repeated use. If removing it improves clarity or speed, remove
it. No view has to animate and no animation library is required.

## Candidate interactions

These patterns are optional and must earn their place in the rendered flow.

| Interaction | Useful treatment | Essential behavior |
| --- | --- | --- |
| Evidence inspector/context panel | Short eased transition clarifying its relationship to the selected citation | Preserve source identity, focus, Escape and return context; use small displacement/fade on narrow screens. |
| Disclosure/context change | Small reveal where it helps explain newly available detail | Critical controls and warnings remain usable immediately. |
| Control feedback | Immediate state/color response; adopted press scaling follows better-ui exactly | Disabled controls remain static; reduced motion and action feedback work. |
| Save/copy completion | Restrained icon/status transition after actual success | Persistent success label; failed operations never play success feedback. |
| Voice controls | Clear listening, processing, speaking and interruption changes | Follow actual microphone/provider state; stop speech immediately. |
| Analytical selection | Brief highlight where it aids orientation | Show authoritative values; no count-up or chart-growth animation is required. |

Prefer CSS transitions and the selected component primitives. Add a dependency
only when a selected interaction requires a capability they cannot provide,
with the reason documented.

## Timing and accessibility

- Update semantic state, feedback and action availability immediately. Animation
  cannot postpone navigation, data access, cancellation or a primary action.
- Reuse tokens. Starting palette where no specific better-ui recipe applies:
  100 ms quick feedback, 150 ms state feedback, 250 ms panel transition;
  signature curve cubic-bezier(0.2, 0, 0, 1). Exits may be shorter. Adopted exact
  better-ui recipes retain their own values.
- Use modest transform/opacity effects with eased spatial movement; transition
  named properties, avoid layout shifts, and use will-change only if measured.
- Repeated interactions, typing, row hover and tabs remain immediate or within
  better-ui's 150 ms ceiling. Routine page/list entrance sequences are unnecessary.
- Movement/scale/blur require prefers-reduced-motion: no-preference. Reduced
  motion gets static or short opacity feedback with the same information,
  controls, labels, icons and completion state.
- Progress, source freshness and success must reflect real state. No invented
  progress percentages, timed reasoning steps or simulated waveform activity.
- Suppress theme-switch color transitions; keep hover behavior appropriate to
  pointer capability and support reversed/interrupted transitions.
- Test both themes, narrow widths, keyboard/focus, touch, repeated use and
  interruption. Record performance observations rather than claiming unmeasured
  frame rates.

## Independent review

The existing separate post-build reviewer loads motion-design for flows with
animation, alongside all six better-* skills. Review purpose/restraint within UI
and reduced-motion/focus behavior within accessibility. This adds neither a
separate review domain nor a feature ticket.

Each adopted effect must pass the adoption test and remain truthful/responsive.
Unnecessary motion is a finding; no animation is a valid outcome. Apply the
existing fix/build/re-review loop.

Sources: installed motion-design SKILL.md, director/context-adaptation.md,
reference/quality-checklist.md, and existing better-ui/accessibility rules.
These project-specific precedence rules prevent decorative recipes from
overriding the user's conditional request.
