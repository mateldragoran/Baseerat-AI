# BAS-013: Guide each persona and reset the presenter workspace

Status: ready-for-agent; approved for implementation on 31 October 2026.
Start only after the listed blockers are complete.
GitHub issue: [#14](https://github.com/mateldragoran/Baseerat-AI/issues/14).
Parent specification: [GitHub issue #1](https://github.com/mateldragoran/Baseerat-AI/issues/1).

## Objective and what to build

The presenter moves through all flagship features using clear persona-focused entry points, switches real accounts, and restores starter work without changing other users or sources.

## Context and specification references

This is a greenfield, single-organization functional demonstration. Engineering
sources are read-only. Use hosted Vercel/Supabase/OpenAI, flexible application
tools, realistic normal presentation, English documents, and the agreed language
scope. Baseline forecasts have no named scenario editor. Do not add unrelated
production infrastructure.

Read [AGENTS.md](../../../AGENTS.md), the [specification](../../product/specification.md),
[architecture](../../architecture/architecture.md), [interface guidelines](../../product/interface-guidelines.md),
[motion guidelines](../../product/motion-guidelines.md),
and [review policy](../../execution/interface-review-policy.md).

Requirements: REQ-017, REQ-022, REQ-027, REQ-029, REQ-031.
Acceptance references: AC-017, AC-022, AC-027, AC-029, AC-031.
Architecture sections: A-04–05, A-09–10.

## Blocked by

[BAS-010 #11](https://github.com/mateldragoran/Baseerat-AI/issues/11), [BAS-011 #12](https://github.com/mateldragoran/Baseerat-AI/issues/12), [BAS-012 #13](https://github.com/mateldragoran/Baseerat-AI/issues/13)

## Implementation requirements

- Deliver Quality/Materials/Leadership and authorized Governance focus with relevant next actions/recent permitted work.
- Limit summary indicators and link every count to a reproducible permitted record set; persona changes never alter grants.
- Connect every shortcut to an implemented complete destination, including reports and live voice.
- Implement confirmed presenter-only epoch reset, fencing active runs/voice, idempotent starter restoration and archive access.
- Preserve other accounts, source versions, memberships, historical shared work and comments; no scenario builder/reset dependency.

## Expected files/modules

Proposed areas, not existing files: src/features/overview/persona; navigation/preferences; reset/epoch transaction and endpoint; starter investigation fixtures; tests/presenter.
Follow the actual established conventions after prerequisite tickets land.
Paths are included at the user's explicit request and must be updated if the
approved implementation establishes different locations.

## Integration and verification

- Presenter walkthrough of all shortcuts and separate-account permission differences.
- J-10 including in-flight reset/write race, duplicate reset, other-user/shared-history preservation.
- Responsive/keyboard/RTL/both-theme checks and independent persona/reset flow review.

## Acceptance criteria

- [ ] Purpose and next action are understandable in each persona focus.
- [ ] Reset and account changes use true backend state, not a cosmetic role toggle.
- [ ] Every feature is easy to demonstrate without hiding real access restrictions.

## Definition of done

- [ ] The ticket's complete user-visible path and stated failure cases work with real persisted data.
- [ ] Meaningful tests above pass; provider fixtures and real-provider evidence are distinguished.
- [ ] Current permission, evidence, confirmation and idempotency rules hold across every changed path.
- [ ] Application build passes and a fresh separate reviewer records all six better-* domains for the affected complete flows.
- [ ] Resolve HIGH findings and required coverage gaps; rebuild and repeat independent review after fixes.
- [ ] If motion is used, document its task benefit, truthful trigger and reduced-motion behavior; omit unnecessary effects and include adopted effects in the same review.
- [ ] Record actual commands/results, review reports, migrations, versions and remaining limitations in execution records.
- [ ] Update this ticket with its GitHub URL when published; do not close or modify the parent specification as part of ticket generation.
