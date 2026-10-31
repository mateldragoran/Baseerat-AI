# BAS-005: Investigate recorded maintenance recurrence

Status: ready-for-agent; approved for implementation on 31 October 2026.
Start only after the listed blockers are complete.
GitHub issue: [#6](https://github.com/mateldragoran/Baseerat-AI/issues/6).
Parent specification: [GitHub issue #1](https://github.com/mateldragoran/Baseerat-AI/issues/1).

## Objective and what to build

A user opens a serialized unit or part family, filters recorded maintenance events, and inspects a recurrence timeline with source evidence.

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

Requirements: REQ-003, REQ-005, REQ-018.
Acceptance references: AC-003, AC-005, AC-018.
Architecture sections: A-03, A-05–06, A-08.

## Blocked by

[BAS-003 #4](https://github.com/mateldragoran/Baseerat-AI/issues/4)

## Implementation requirements

- Implement part-to-unit/event filtering, categories and dated recurrence definitions.
- Render recorded event counts, understandable timeline and underlying records through shared evidence components.
- Expose summarize_maintenance with scope and exact dependency lineage.
- Use the same maintenance navigation/tab naming across Explorer, Intelligence and Ask actions.

## Expected files/modules

Proposed areas, not existing files: src/features/intelligence/maintenance; src/domain/analysis/maintenance; maintenance tool adapter; entity-history tabs; tests/maintenance.
Follow the actual established conventions after prerequisite tickets land.
Paths are included at the user's explicit request and must be updated if the
approved implementation establishes different locations.

## Integration and verification

- J-03 recurrence count/date/unit reconciliation and historical document-reference cases.
- Restricted analyst direct endpoints, relations and aggregates reveal no Maintenance data.
- Accessible timeline/table alternative, no-data/error states and responsive flow review.

## Acceptance criteria

- [ ] Individual unit history is distinct from design-level history.
- [ ] Displayed recurrence cites actual events and never becomes an unsupported failure prediction.
- [ ] Maintenance navigation is consistent across entry paths.

## Definition of done

- [ ] The ticket's complete user-visible path and stated failure cases work with real persisted data.
- [ ] Meaningful tests above pass; provider fixtures and real-provider evidence are distinguished.
- [ ] Current permission, evidence, confirmation and idempotency rules hold across every changed path.
- [ ] Application build passes and a fresh separate reviewer records all six better-* domains for the affected complete flows.
- [ ] Resolve HIGH findings and required coverage gaps; rebuild and repeat independent review after fixes.
- [ ] If motion is used, document its task benefit, truthful trigger and reduced-motion behavior; omit unnecessary effects and include adopted effects in the same review.
- [ ] Record actual commands/results, review reports, migrations, versions and remaining limitations in execution records.
- [ ] Update this ticket with its GitHub URL when published; do not close or modify the parent specification as part of ticket generation.
