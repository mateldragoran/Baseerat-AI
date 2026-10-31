# BAS-004: Compare quality findings and reconcile inspection rates

Status: ready-for-agent; approved for implementation on 31 October 2026.
Start only after the listed blockers are complete.
GitHub issue: [#5](https://github.com/mateldragoran/Baseerat-AI/issues/5).
Parent specification: [GitHub issue #1](https://github.com/mateldragoran/Baseerat-AI/issues/1).

## Objective and what to build

A quality engineer selects a part/batches/date range, understands the discrepancy comparison, and drills into the exact inspections/NCRs.

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

Requirements: REQ-003, REQ-005, REQ-024, REQ-027.
Acceptance references: AC-003, AC-005, AC-024, AC-027.
Architecture sections: A-05–06, A-08 Quality.

## Blocked by

[BAS-003 #4](https://github.com/mateldragoran/Baseerat-AI/issues/4)

## Implementation requirements

- Implement affected-completed-inspection rate and separate NCR counts exactly as defined, including category denominator semantics.
- Return calculation definition, scope, exact numerator/denominator and full dependency/record set.
- Build readable comparison/summary, comfortable supporting records and accessible chart alternative.
- Expose compare_batches and approved quality aggregation tools for later Ask integration.

## Expected files/modules

Proposed areas, not existing files: src/features/intelligence/quality; src/domain/analysis/quality; quality tool adapter; common chart/record-set UI; tests/quality.
Follow the actual established conventions after prerequisite tickets land.
Paths are included at the user's explicit request and must be updated if the
approved implementation establishes different locations.

## Integration and verification

- Three NCRs in two of ten inspections => count3/rate20%; multiple NCRs, no denominator and cancelled/in-progress cases.
- Category/date/source filters reconcile chart, metric and rows.
- J-01 quality segment with direct denied requests and independent UI review.

## Acceptance criteria

- [ ] Numbers reconcile exactly and zero denominator is unavailable rather than misleading0%.
- [ ] Chart clicks reproduce the same permitted record set and scope.
- [ ] Association is presented as recorded evidence, not proven root cause.

## Definition of done

- [ ] The ticket's complete user-visible path and stated failure cases work with real persisted data.
- [ ] Meaningful tests above pass; provider fixtures and real-provider evidence are distinguished.
- [ ] Current permission, evidence, confirmation and idempotency rules hold across every changed path.
- [ ] Application build passes and a fresh separate reviewer records all six better-* domains for the affected complete flows.
- [ ] Resolve HIGH findings and required coverage gaps; rebuild and repeat independent review after fixes.
- [ ] If motion is used, document its task benefit, truthful trigger and reduced-motion behavior; omit unnecessary effects and include adopted effects in the same review.
- [ ] Record actual commands/results, review reports, migrations, versions and remaining limitations in execution records.
- [ ] Update this ticket with its GitHub URL when published; do not close or modify the parent specification as part of ticket generation.
