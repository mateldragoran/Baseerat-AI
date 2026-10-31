# BAS-007: Forecast material consumption with an explainable baseline

Status: ready-for-agent; approved for implementation on 31 October 2026.
Start only after the listed blockers are complete.
GitHub issue: [#8](https://github.com/mateldragoran/Baseerat-AI/issues/8).
Parent specification: [GitHub issue #1](https://github.com/mateldragoran/Baseerat-AI/issues/1).

## Objective and what to build

A planner selects a material/horizon, sees history and a reproducible baseline forecast, and opens clear method/evaluation details.

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

Requirements: REQ-006, REQ-021, REQ-025, REQ-027.
Acceptance references: AC-006, AC-021, AC-025, AC-027.
Architecture sections: A-03–06, A-08 Material consumption and forecast.

## Blocked by

[BAS-003 #4](https://github.com/mateldragoran/Baseerat-AI/issues/4)

## Implementation requirements

- Implement actual-usage accounting, linked valid reversals, unit validation, explicit complete/zero/unknown months and current partial-month exclusion.
- Implement seasonal_naive_v1, 24-month eligibility, target months, approximate80% band, rounding and chronological evaluation exactly as specified.
- Return inputs/source-months/dependencies, evaluation counts/MAE/RMSE, assumptions and insufficient-history state.
- Build one clean history/forecast screen with material and1/3/6 horizon; method detail expands on demand; no named scenarios or confidence slider.
- Make the truthful model catalogue entry link to this workspace.

## Expected files/modules

Proposed areas, not existing files: src/features/intelligence/materials; src/domain/analysis/forecast; ledger/coverage migrations and fixtures; forecast tool adapter; tests/forecast.
Follow the actual established conventions after prerequisite tickets land.
Paths are included at the user's explicit request and must be updated if the
approved implementation establishes different locations.

## Integration and verification

- Hand-calculated seasonal fixture, all-zero series, insufficient/missing/mixed-unit/over-reversal cases.
- Forecast cutoff/start and rolling-origin no-lookahead checks; monthly versus total-band rules and display rounding.
- J-04 drill-down, permission denial and responsive chart/table alternative review.

## Acceptance criteria

- [ ] Business known_at and versioned month coverage reconstruct each historical origin; a later-known reversal cannot affect an earlier forecast fit.

- [ ] Points/bands/evaluation reproduce documented formulas and expose limitations.
- [ ] Unknown months never silently become zero; ineligible data cannot produce invented forecasts.
- [ ] The screen remains baseline-only and understandable.

## Definition of done

- [ ] The ticket's complete user-visible path and stated failure cases work with real persisted data.
- [ ] Meaningful tests above pass; provider fixtures and real-provider evidence are distinguished.
- [ ] Current permission, evidence, confirmation and idempotency rules hold across every changed path.
- [ ] Application build passes and a fresh separate reviewer records all six better-* domains for the affected complete flows.
- [ ] Resolve HIGH findings and required coverage gaps; rebuild and repeat independent review after fixes.
- [ ] If motion is used, document its task benefit, truthful trigger and reduced-motion behavior; omit unnecessary effects and include adopted effects in the same review.
- [ ] Record actual commands/results, review reports, migrations, versions and remaining limitations in execution records.
- [ ] Update this ticket with its GitHub URL when published; do not close or modify the parent specification as part of ticket generation.
