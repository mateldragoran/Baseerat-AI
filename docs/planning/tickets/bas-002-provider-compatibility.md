# BAS-002: Prove real text tools and live voice on the deployed host

Status: ready-for-agent; approved for implementation on 31 October 2026.
Start only after the listed blockers are complete.
GitHub issue: [#3](https://github.com/mateldragoran/Baseerat-AI/issues/3).
Parent specification: [GitHub issue #1](https://github.com/mateldragoran/Baseerat-AI/issues/1).

## Objective and what to build

A signed-in user asks a real text question and a real voice question about a permitted record, sees its evidence, interrupts speech, and survives controlled reconnect.

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

Requirements: REQ-001, REQ-009, REQ-013, REQ-014, REQ-016, REQ-020.
Acceptance references: AC-001, AC-009, AC-013, AC-014, AC-016, AC-020.
Architecture sections: A-01, A-05–07, A-10.

## Blocked by

[BAS-001 #2](https://github.com/mateldragoran/Baseerat-AI/issues/2)

## Implementation requirements

- Verify account access to the proposed current text/Realtime models and strict tool/output schemas; record exact API/runtime/package facts.
- Implement one shared authorized get_record tool with actual Responses and server-bound Realtime SDP/sideband.
- Prove Vercel authenticated control channel, external durable leases/operations, direct audio and the 240-second lease/rotation design.
- Persist approximate transcripts only; no key/raw audio exposure; fence cancelled and old-generation calls.
- Expose a small genuine Ask experience that later full Ask work extends, not a decorative animation or canned response.
- Run a bounded PDFKit generation feasibility check on the same runtime; record package/payload limitations.

## Expected files/modules

Proposed areas, not existing files: src/server/ai provider adapters; app/api query and voice routes; src/features/ask minimal composer/voice controls; run/voice operation migrations; tests/integration/providers.
Follow the actual established conventions after prerequisite tickets land.
Paths are included at the user's explicit request and must be updated if the
approved implementation establishes different locations.

## Integration and verification

- Opt-in real text and voice tool result with current source grants; denied record request.
- Interruption, forced expiry/reconnect, duplicate control connections, logout, account/scope change and no duplicate effect.
- Native-speaker exploratory Urdu/mixed identifiers; document limitations rather than claiming final language acceptance.

## Acceptance criteria

- [ ] Deployed real-provider evidence establishes the API/hosting path before downstream voice work.
- [ ] Authoritative tool execution remains server-side and reconnect cannot cross users or repeat operations.
- [ ] A failed compatibility gate has an explicit resolution; mocked behavior cannot count as passing.

## Definition of done

- [ ] The ticket's complete user-visible path and stated failure cases work with real persisted data.
- [ ] Meaningful tests above pass; provider fixtures and real-provider evidence are distinguished.
- [ ] Current permission, evidence, confirmation and idempotency rules hold across every changed path.
- [ ] Application build passes and a fresh separate reviewer records all six better-* domains for the affected complete flows.
- [ ] Resolve HIGH findings and required coverage gaps; rebuild and repeat independent review after fixes.
- [ ] If motion is used, document its task benefit, truthful trigger and reduced-motion behavior; omit unnecessary effects and include adopted effects in the same review.
- [ ] Record actual commands/results, review reports, migrations, versions and remaining limitations in execution records.
- [ ] Update this ticket with its GitHub URL when published; do not close or modify the parent specification as part of ticket generation.
