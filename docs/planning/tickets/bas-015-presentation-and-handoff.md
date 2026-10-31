# BAS-015: Rehearse, verify and hand off the complete demonstration

Status: ready-for-agent; approved for implementation on 31 October 2026.
Start only after the listed blockers are complete.
GitHub issue: [#16](https://github.com/mateldragoran/Baseerat-AI/issues/16).
Parent specification: [GitHub issue #1](https://github.com/mateldragoran/Baseerat-AI/issues/1).

## Objective and what to build

The owner can present the actual deployed application, answer unscripted follow-ups, repeat account/source scenarios, and restore the workspace using documented instructions.

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

Requirements: REQ-001–031.
Acceptance references: AC-001–031 and NFR-01–10.
Architecture sections: A-01–10.

## Blocked by

[BAS-014 #15](https://github.com/mateldragoran/Baseerat-AI/issues/15)

## Implementation requirements

- Execute the complete acceptance register and NFR workload on documented browsers/network/deployment.
- Rehearse the approximately10-minute flagship presentation plus unprepared supported follow-ups; record actual provider latencies separately.
- Verify English report PDF layout, bilingual listening results, responsive320–1920/zoom, both themes, keyboard/screen reader and measured contrast.
- Verify deploy/redeploy persistence, actual Vercel URL, account sign-in/out/reset and safe operator setup instructions.
- Resolve blockers, record medium/low findings and coverage; hand off exact versions, commands, provider prerequisites and known limitations.

## Expected files/modules

Proposed areas, not existing files: tests/e2e/accessibility/performance; deployment/config/operator documentation; docs/execution evidence; any verified UI/behavior repairs.
Follow the actual established conventions after prerequisite tickets land.
Paths are included at the user's explicit request and must be updated if the
approved implementation establishes different locations.

## Integration and verification

- All J-01–11 and AC-001–031 with real versus fixture evidence distinguished.
- Five-user warm workload, refresh/redeploy persistence and final independent six-domain interface review.
- No false production/readiness claim, no public secrets/audio, no unreviewed scope presented as verified.

## Acceptance criteria

- [ ] The agreed demonstration is usable, coherent and repeatable on its actual deployment.
- [ ] Required runtime coverage and HIGH findings are closed; remaining limitations are explicit.
- [ ] Operator handoff contains enough information to repeat the presentation without this planning conversation.

## Definition of done

- [ ] The ticket's complete user-visible path and stated failure cases work with real persisted data.
- [ ] Meaningful tests above pass; provider fixtures and real-provider evidence are distinguished.
- [ ] Current permission, evidence, confirmation and idempotency rules hold across every changed path.
- [ ] Application build passes and a fresh separate reviewer records all six better-* domains for the affected complete flows.
- [ ] Resolve HIGH findings and required coverage gaps; rebuild and repeat independent review after fixes.
- [ ] If motion is used, document its task benefit, truthful trigger and reduced-motion behavior; omit unnecessary effects and include adopted effects in the same review.
- [ ] Record actual commands/results, review reports, migrations, versions and remaining limitations in execution records.
- [ ] Update this ticket with its GitHub URL when published; do not close or modify the parent specification as part of ticket generation.
