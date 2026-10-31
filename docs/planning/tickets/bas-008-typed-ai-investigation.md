# BAS-008: Ask unscripted questions with structured evidence-backed results

Status: ready-for-agent; approved for implementation on 31 October 2026.
Start only after the listed blockers are complete.
GitHub issue: [#9](https://github.com/mateldragoran/Baseerat-AI/issues/9).
Parent specification: [GitHub issue #1](https://github.com/mateldragoran/Baseerat-AI/issues/1).

## Objective and what to build

An analyst asks different English/Urdu questions, sees appropriate structured findings and charts, clarifies scope, and follows evidence without losing context.

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

Requirements: REQ-001, REQ-003, REQ-014, REQ-015, REQ-020.
Acceptance references: AC-001, AC-003, AC-014, AC-015, AC-020.
Architecture sections: A-05–08.

## Blocked by

[BAS-002 #3](https://github.com/mateldragoran/Baseerat-AI/issues/3), [BAS-004 #5](https://github.com/mateldragoran/Baseerat-AI/issues/5), [BAS-005 #6](https://github.com/mateldragoran/Baseerat-AI/issues/6), [BAS-006 #7](https://github.com/mateldragoran/Baseerat-AI/issues/7), [BAS-007 #8](https://github.com/mateldragoran/Baseerat-AI/issues/8)

## Implementation requirements

- Integrate every implemented domain tool behind validated bounded query plans, with current grants and full lineage.
- Implement persistent text sessions, explicit context/source/date chips, language control, clarification, cancellation and durable ordered events.
- Validate all block kinds and action descriptors; keep numerical arrays/tool facts authoritative; suppress unsupported citations.
- Handle partial/unanswerable/provider failure and general explanations distinctly; no arbitrary HTML/code/web-search execution.
- Implement request budgets, generation fencing, action proposals and fixture-based contract tests; retain real-provider integration evidence.

## Expected files/modules

Proposed areas, not existing files: src/features/ask; src/components/ai-results/evidence; src/server/ai orchestration/tool registry; sessions/runs/artifact migrations; query endpoints; tests/ask.
Follow the actual established conventions after prerequisite tickets land.
Paths are included at the user's explicit request and must be updated if the
approved implementation establishes different locations.

## Integration and verification

- J-01 query/evidence segments and J-11; at least three unprepared supported question patterns and a contextual follow-up.
- 16 language text cases, malformed block/tool/citation, injection-like source content and denied-scope tests.
- Cancel/timeout/replay preserve input/results without duplicate effects; full rendered Ask review.

## Acceptance criteria

- [ ] Both user and assistant transcripts persist separately from validated artifacts; stream replay resolves IDs with current dependency checks.
- [ ] Land the run/record-set association and final foreign keys after both prerequisite branches, with no dangling legacy associations.

- [ ] Responses vary appropriately by question and reconcile with underlying data.
- [ ] General knowledge is labeled; record-specific claims cite valid permitted versions.
- [ ] Unsupported operations produce a useful limitation instead of a scripted or invented answer.

## Definition of done

- [ ] The ticket's complete user-visible path and stated failure cases work with real persisted data.
- [ ] Meaningful tests above pass; provider fixtures and real-provider evidence are distinguished.
- [ ] Current permission, evidence, confirmation and idempotency rules hold across every changed path.
- [ ] Application build passes and a fresh separate reviewer records all six better-* domains for the affected complete flows.
- [ ] Resolve HIGH findings and required coverage gaps; rebuild and repeat independent review after fixes.
- [ ] If motion is used, document its task benefit, truthful trigger and reduced-motion behavior; omit unnecessary effects and include adopted effects in the same review.
- [ ] Record actual commands/results, review reports, migrations, versions and remaining limitations in execution records.
- [ ] Update this ticket with its GitHub URL when published; do not close or modify the parent specification as part of ticket generation.
