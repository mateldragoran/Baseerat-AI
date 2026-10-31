# BAS-014: Verify cross-account evidence and failure recovery

Status: ready-for-agent; approved for implementation on 31 October 2026.
Start only after the listed blockers are complete.
GitHub issue: [#15](https://github.com/mateldragoran/Baseerat-AI/issues/15).
Parent specification: [GitHub issue #1](https://github.com/mateldragoran/Baseerat-AI/issues/1).

## Objective and what to build

An evaluator can repeat restricted-access, revoked-evidence, interrupted voice, source outage, reviewed-edit, and reset demonstrations with correct persisted outcomes.

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

Requirements: REQ-003, REQ-009, REQ-013, REQ-019, REQ-022, REQ-023, REQ-030, REQ-031.
Acceptance references: AC-003, AC-009, AC-013, AC-019, AC-022, AC-023, AC-030, AC-031.
Architecture sections: A-04–10.

## Blocked by

[BAS-013 #14](https://github.com/mateldragoran/Baseerat-AI/issues/14)

## Implementation requirements

- Run cross-flow direct API/RLS/private-file tests using the four real identities; repair concrete integration defects.
- Verify dependency lineage/redaction from live answers through saved versions and PDF bytes.
- Exercise lost connections, old events, provider failures, source outages, concurrent saves/reviews and reset epochs.
- Confirm prompt-injection-like documents cannot grant tools/access or render executable content.
- Keep individual feature safeguards from prior tickets; this ticket integrates, rather than defers, security.

## Expected files/modules

Proposed areas, not existing files: tests/e2e and auth/contract suites; fixtures; affected access/orchestration/report/reset modules; execution evidence.
Follow the actual established conventions after prerequisite tickets land.
Paths are included at the user's explicit request and must be updated if the
approved implementation establishes different locations.

## Integration and verification

- J-01–11 failure variants with deterministic provider fixtures and separately recorded real-provider checks.
- Late-generation/idempotency race matrix and search/count/suggestion non-disclosure.
- Rebuild and independent affected-flow review after each repair.

## Acceptance criteria

- [ ] No integrated path bypasses source/ownership/action rights.
- [ ] Recoveries preserve truth and completed work without repeating effects.
- [ ] Every verified claim has reproducible evidence and unresolved checks are explicit.

## Definition of done

- [ ] The ticket's complete user-visible path and stated failure cases work with real persisted data.
- [ ] Meaningful tests above pass; provider fixtures and real-provider evidence are distinguished.
- [ ] Current permission, evidence, confirmation and idempotency rules hold across every changed path.
- [ ] Application build passes and a fresh separate reviewer records all six better-* domains for the affected complete flows.
- [ ] Resolve HIGH findings and required coverage gaps; rebuild and repeat independent review after fixes.
- [ ] If motion is used, document its task benefit, truthful trigger and reduced-motion behavior; omit unnecessary effects and include adopted effects in the same review.
- [ ] Record actual commands/results, review reports, migrations, versions and remaining limitations in execution records.
- [ ] Update this ticket with its GitHub URL when published; do not close or modify the parent specification as part of ticket generation.
