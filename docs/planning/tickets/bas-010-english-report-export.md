# BAS-010: Preview and export a permitted English report

Status: ready-for-agent; approved for implementation on 31 October 2026.
Start only after the listed blockers are complete.
GitHub issue: [#11](https://github.com/mateldragoran/Baseerat-AI/issues/11).
Parent specification: [GitHub issue #1](https://github.com/mateldragoran/Baseerat-AI/issues/1).

## Objective and what to build

A user previews the canonical English PDF for a saved version, checks evidence/limitations, and downloads the same authorized bytes.

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

Requirements: REQ-003, REQ-008, REQ-019, REQ-025, REQ-026.
Acceptance references: AC-003, AC-008, AC-019, AC-025, AC-026.
Architecture sections: A-04–06, A-09.

## Blocked by

[BAS-009 #10](https://github.com/mateldragoran/Baseerat-AI/issues/10)

## Implementation requirements

- Create a validated English narrative and immutable report snapshot from permitted findings, charts, methods and evidence.
- Render bounded paginated PDF, store hash/version/size privately, and preview that exact PDF.
- Authorize every content request; block old PDF delivery after dependency access loss and offer a new permitted-content Draft.
- Handle broken non-protected citations by visibly excluding unsupported claims and explicitly exporting an incomplete draft; preserve original reviewed version.
- Honor limits without silent truncation; no mandatory synthetic watermark.

## Expected files/modules

Proposed areas, not existing files: src/features/reports; src/server/reports PDFKit adapter; reports/private Storage policies; report endpoints; viewer reuse; tests/reports.
Follow the actual established conventions after prerequisite tickets land.
Paths are included at the user's explicit request and must be updated if the
approved implementation establishes different locations.

## Integration and verification

- J-06 preview/export/hash/content match including an Urdu-origin investigation.
- Denied Storage/PDF bytes after revocation, broken evidence, layout pagination and size-limit cases.
- PDF visual inspection and independent UI review; idempotent export retry.

## Acceptance criteria

- [ ] Preview and download cannot diverge in version, content or permissions.
- [ ] English text, source references and page layout are readable; no unsupported claim hides behind a badge.
- [ ] Export does not expose another user's private or revoked content.

## Definition of done

- [ ] The ticket's complete user-visible path and stated failure cases work with real persisted data.
- [ ] Meaningful tests above pass; provider fixtures and real-provider evidence are distinguished.
- [ ] Current permission, evidence, confirmation and idempotency rules hold across every changed path.
- [ ] Application build passes and a fresh separate reviewer records all six better-* domains for the affected complete flows.
- [ ] Resolve HIGH findings and required coverage gaps; rebuild and repeat independent review after fixes.
- [ ] If motion is used, document its task benefit, truthful trigger and reduced-motion behavior; omit unnecessary effects and include adopted effects in the same review.
- [ ] Record actual commands/results, review reports, migrations, versions and remaining limitations in execution records.
- [ ] Update this ticket with its GitHub URL when published; do not close or modify the parent specification as part of ticket generation.
