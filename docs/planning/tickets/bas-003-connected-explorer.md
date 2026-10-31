# BAS-003: Explore connected part, batch and unit history

Status: ready-for-agent; approved for implementation on 31 October 2026.
Start only after the listed blockers are complete.
GitHub issue: [#4](https://github.com/mateldragoran/Baseerat-AI/issues/4).
Parent specification: [GitHub issue #1](https://github.com/mateldragoran/Baseerat-AI/issues/1).

## Objective and what to build

An analyst searches HA-204, navigates batches and serialized units, inspects related history and exact source versions, and returns to reproducible filters.

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

Requirements: REQ-002, REQ-003, REQ-004, REQ-018, REQ-029.
Acceptance references: AC-002, AC-003, AC-004, AC-018, AC-029.
Architecture sections: A-03–06, A-09.

## Blocked by

[BAS-001 #2](https://github.com/mateldragoran/Baseerat-AI/issues/2)

## Implementation requirements

- Build the complete coherent typed seed catalogue and exceptional fixtures with stable recent dates and internal origin manifest.
- Distinguish part/revision/batch/unit identities; enforce relation endpoint kinds and chronology; preserve missing/mismatched revision references.
- Implement search/filter/sort/cursor, current/exact-version detail, accessible relationships/counts and record-set definitions.
- Carry filters/tabs/context in URL; use comfortable summary-first record pages and shared inspector.
- Document content links become active only when bytes/locators exist; metadata views must not lead to dead controls.

## Expected files/modules

Proposed areas, not existing files: src/features/explorer; src/server/catalogue; src/domain/records and evidence; app/explore routes; common record links/inspector; supabase catalogue migrations/seeds; tests/catalogue.
Follow the actual established conventions after prerequisite tickets land.
Paths are included at the user's explicit request and must be updated if the
approved implementation establishes different locations.

## Integration and verification

- J-02 without the later PDF viewer: entity/metadata navigation, refresh/back-state and scope preservation.
- Integrity/foreign-key/version/calendar checks and restricted relationships/counts/suggestions.
- Current-clock/Asia-Karachi boundary tests and no daily source-redating.

## Acceptance criteria

- [ ] Persist dataset manifests and exact record-set membership/version IDs for repeatable drill-down; defer the nullable run FK until BAS-008 when its prerequisite branch exists.

- [ ] Part/batch/unit history traverses multiple sources with correct version identity.
- [ ] Record list counts and all linked metadata are permission-filtered before response.
- [ ] Seed data includes ordinary and negative cases supporting later unscripted analysis.

## Definition of done

- [ ] The ticket's complete user-visible path and stated failure cases work with real persisted data.
- [ ] Meaningful tests above pass; provider fixtures and real-provider evidence are distinguished.
- [ ] Current permission, evidence, confirmation and idempotency rules hold across every changed path.
- [ ] Application build passes and a fresh separate reviewer records all six better-* domains for the affected complete flows.
- [ ] Resolve HIGH findings and required coverage gaps; rebuild and repeat independent review after fixes.
- [ ] If motion is used, document its task benefit, truthful trigger and reduced-motion behavior; omit unnecessary effects and include adopted effects in the same review.
- [ ] Record actual commands/results, review reports, migrations, versions and remaining limitations in execution records.
- [ ] Update this ticket with its GitHub URL when published; do not close or modify the parent specification as part of ticket generation.
