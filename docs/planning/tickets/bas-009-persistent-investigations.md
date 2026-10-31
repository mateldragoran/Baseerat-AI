# BAS-009: Save, share and review versioned investigations

Status: ready-for-agent; approved for implementation on 31 October 2026.
Start only after the listed blockers are complete.
GitHub issue: [#10](https://github.com/mateldragoran/Baseerat-AI/issues/10).
Parent specification: [GitHub issue #1](https://github.com/mateldragoran/Baseerat-AI/issues/1).

## Objective and what to build

An owner saves findings, shares with a reviewer, receives comments/review, edits into a new draft, and resumes preserved historical versions.

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

Requirements: REQ-007, REQ-009, REQ-015, REQ-019, REQ-022, REQ-030.
Acceptance references: AC-007, AC-009, AC-015, AC-019, AC-022, AC-030.
Architecture sections: A-04–06, A-09.

## Blocked by

[BAS-008 #9](https://github.com/mateldragoran/Baseerat-AI/issues/9)

## Implementation requirements

- Persist immutable saved artifacts, scope/source versions and version identity; refresh creates a distinct result.
- Implement private ownership, selected memberships, source-right intersection, owner-only finding edits and attributed comments.
- Implement Draft→Ready→Reviewed with explicit reviewer action; new content after review creates Draft while older version survives.
- Implement exact-payload confirmation, expected-version conflicts and durable idempotency; private chat stays private.
- Suppress entire saved blocks with inaccessible dependencies, including derived summaries.

## Expected files/modules

Proposed areas, not existing files: src/features/investigations; investigation/ACL/comment/confirmation migrations; src/server/investigation and access; saved-artifact dependency checks; tests/investigations.
Follow the actual established conventions after prerequisite tickets land.
Paths are included at the user's explicit request and must be updated if the
approved implementation establishes different locations.

## Integration and verification

- J-05 and save/resume J-01; cross-role/private/admin denial matrix.
- Review/edit/version conflicts, permission revocation, mixed-dependency summary suppression and comment attribution.
- Duplicate save/share/review requests and replacement confirmation replay; interface review of owner and reviewer flows.

## Acceptance criteria

- [ ] Source-derived titles, scope labels, notes and comments follow conservative dependencies; raw private prose is not reachable through guessed Data API endpoints.
- [ ] Explicit intent/proposal/nonce issuance, expiration and atomic consumption are persisted and tested, not represented by a client approval flag.

- [ ] Sharing never grants source access or exposes full query history.
- [ ] The reviewer cannot edit findings; owner edits do not rewrite the reviewed version.
- [ ] Saved work survives refresh and access changes affect subsequent views.

## Definition of done

- [ ] The ticket's complete user-visible path and stated failure cases work with real persisted data.
- [ ] Meaningful tests above pass; provider fixtures and real-provider evidence are distinguished.
- [ ] Current permission, evidence, confirmation and idempotency rules hold across every changed path.
- [ ] Application build passes and a fresh separate reviewer records all six better-* domains for the affected complete flows.
- [ ] Resolve HIGH findings and required coverage gaps; rebuild and repeat independent review after fixes.
- [ ] If motion is used, document its task benefit, truthful trigger and reduced-motion behavior; omit unnecessary effects and include adopted effects in the same review.
- [ ] Record actual commands/results, review reports, migrations, versions and remaining limitations in execution records.
- [ ] Update this ticket with its GitHub URL when published; do not close or modify the parent specification as part of ticket generation.
