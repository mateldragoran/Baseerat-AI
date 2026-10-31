# BAS-006: Open exact engineering document revisions and passages

Status: ready-for-agent; approved for implementation on 31 October 2026.
Start only after the listed blockers are complete.
GitHub issue: [#7](https://github.com/mateldragoran/Baseerat-AI/issues/7).
Parent specification: [GitHub issue #1](https://github.com/mateldragoran/Baseerat-AI/issues/1).

## Objective and what to build

An engineer opens a historical citation, reads the exact English revision/page/passage, and returns to the investigation context.

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

Requirements: REQ-003, REQ-018, REQ-025.
Acceptance references: AC-003, AC-018, AC-025.
Architecture sections: A-03–06, A-09.

## Blocked by

[BAS-003 #4](https://github.com/mateldragoran/Baseerat-AI/issues/4)

## Implementation requirements

- Create readable selectable English seed PDFs and exact passage locators/content hashes.
- Implement revision library, local PDF viewer/search/zoom/page selection and contextual evidence links.
- Authorize file bytes at request time; preserve exact historical version and applicability warnings.
- Return explicit missing revision/passage states rather than guessing equivalent text.

## Expected files/modules

Proposed areas, not existing files: src/features/knowledge; src/components/document-viewer; private Storage/passages migration and seed assets; catalogue document tools; tests/knowledge.
Follow the actual established conventions after prerequisite tickets land.
Paths are included at the user's explicit request and must be updated if the
approved implementation establishes different locations.

## Integration and verification

- J-02 document completion and J-01 citation-to-passage→return context.
- Missing passage/revision, superseded/mismatched revision and restricted-byte tests.
- Keyboard/viewer focus, narrow widths and private cache/download behavior.

## Acceptance criteria

- [ ] Citations identify exact permitted revision and passage or visibly fail.
- [ ] No public bucket/long-lived URL bypasses file access.
- [ ] English PDFs remain readable/selectable with correct page targeting.

## Definition of done

- [ ] The ticket's complete user-visible path and stated failure cases work with real persisted data.
- [ ] Meaningful tests above pass; provider fixtures and real-provider evidence are distinguished.
- [ ] Current permission, evidence, confirmation and idempotency rules hold across every changed path.
- [ ] Application build passes and a fresh separate reviewer records all six better-* domains for the affected complete flows.
- [ ] Resolve HIGH findings and required coverage gaps; rebuild and repeat independent review after fixes.
- [ ] If motion is used, document its task benefit, truthful trigger and reduced-motion behavior; omit unnecessary effects and include adopted effects in the same review.
- [ ] Record actual commands/results, review reports, migrations, versions and remaining limitations in execution records.
- [ ] Update this ticket with its GitHub URL when published; do not close or modify the parent specification as part of ticket generation.
