# BAS-011: Complete bilingual live voice investigations

Status: ready-for-agent; approved for implementation on 31 October 2026.
Start only after the listed blockers are complete.
GitHub issue: [#12](https://github.com/mateldragoran/Baseerat-AI/issues/12).
Parent specification: [GitHub issue #1](https://github.com/mateldragoran/Baseerat-AI/issues/1).

## Objective and what to build

A user asks Urdu/English/mixed questions aloud, sees the same authoritative findings/evidence as text, interrupts, follows up, and saves explicitly requested work.

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

Requirements: REQ-013, REQ-014, REQ-015, REQ-019.
Acceptance references: AC-013, AC-014, AC-015, AC-019.
Architecture sections: A-05–07, A-09.

## Blocked by

[BAS-009 #10](https://github.com/mateldragoran/Baseerat-AI/issues/10)

## Implementation requirements

- Extend the proved provider path to all shared tools, context, language override and saved-action policy.
- Render listening/processing/speaking/interrupted/reconnecting/fallback states and visible interpreted entities/scope.
- Persist approximate/corrected transcripts and completed results; no raw microphone/generated speech persistence.
- Implement lease rollover, current-access rechecks, account-change closure and late-generation fences; no browser-controlled call-ID authority.
- Use validated structured artifacts from shared tools/text adapter; concise speech references the same results.

## Expected files/modules

Proposed areas, not existing files: src/features/ask voice UX; src/server/ai/realtime and shared tools; voice-session migrations/control endpoint; transcript rendering; tests/voice.
Follow the actual established conventions after prerequisite tickets land.
Paths are included at the user's explicit request and must be updated if the
approved implementation establishes different locations.

## Integration and verification

- J-07 plus eight real speech prompts and the specified language/task threshold; human listening evidence.
- Interrupt during read and proposed write, reconnect/rotation, denied source, account/scope change, microphone failure and provider-wide outage.
- No raw audio/secrets in Storage/logs/client bundles; independent voice-control and RTL UI review.

## Acceptance criteria

- [ ] Revocation followed by a no-tool follow-up closes/recreates provider context before trusted speech; historical stream/transcript replay cannot resend revoked facts.

- [ ] Live voice works genuinely and obeys the same data/action rules as typed questions.
- [ ] A mistaken critical identifier is corrected/clarified before persistence.
- [ ] Recovery preserves completed work without duplicate writes or false success.

## Definition of done

- [ ] The ticket's complete user-visible path and stated failure cases work with real persisted data.
- [ ] Meaningful tests above pass; provider fixtures and real-provider evidence are distinguished.
- [ ] Current permission, evidence, confirmation and idempotency rules hold across every changed path.
- [ ] Application build passes and a fresh separate reviewer records all six better-* domains for the affected complete flows.
- [ ] Resolve HIGH findings and required coverage gaps; rebuild and repeat independent review after fixes.
- [ ] If motion is used, document its task benefit, truthful trigger and reduced-motion behavior; omit unnecessary effects and include adopted effects in the same review.
- [ ] Record actual commands/results, review reports, migrations, versions and remaining limitations in execution records.
- [ ] Update this ticket with its GitHub URL when published; do not close or modify the parent specification as part of ticket generation.
