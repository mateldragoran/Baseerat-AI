# BAS-001: Sign in and inspect a permission-scoped record

Status: implementation in progress; acceptance remains open. Approved on 31 October 2026.
Start only after the listed blockers are complete.
GitHub issue: [#2](https://github.com/mateldragoran/Baseerat-AI/issues/2).
Parent specification: [GitHub issue #1](https://github.com/mateldragoran/Baseerat-AI/issues/1).

## Objective and what to build

A presenter signs in to a polished workspace, opens a real persisted source record, and demonstrates a restricted account receiving different data.

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

Requirements: REQ-002, REQ-009, REQ-012, REQ-016, REQ-022, REQ-027, REQ-028.
Acceptance references: AC-002, AC-009, AC-012, AC-016, AC-022, AC-027, AC-028.
Architecture sections: A-01–05, A-10.

## Blocked by

None; can start under the recorded implementation approval.

## Implementation requirements

- Freeze compatible Next/React/Node and dependency versions in the lockfile; record actual runtime and commands.
- Provision four real profiles with live source/action grants; create a minimal versioned record per logical source and user-scoped reads.
- Deliver sign-in/sign-out, accessible shell, initial purpose/next action, evidence summary, no-store responses and cache clearing on account change.
- Use explicit grants/RLS/private defaults and prevent another user's private-session access; no client role authority.
- Establish shared record, tool result, actor and error schemas for later tickets; configure isolated test data.
- Establish minimal private query_sessions ownership and safe authentication audit foundations; verify live session validity for protected reads after logout. See execution review findings EX-005/EX-007 for the migration ownership reconciliation; BAS-002/BAS-012 extend these foundations.

## Expected files/modules

Proposed areas, not existing files: package.json/package-lock.json; app auth/workspace routes; proxy.ts; src/server/access and catalogue; shared UI/tokens; supabase base migrations/seeds; tests/auth.
Follow the actual established conventions after prerequisite tickets land.
Paths are included at the user's explicit request and must be updated if the
approved implementation establishes different locations.

## Integration and verification

- Browser sign-in→record→sign-out for presenter and restricted user; direct denied record requests.
- RLS/grant checks for all profiles and no cross-user authenticated cache.
- Build/runtime/lockfile checks and independent rendered shell/auth review.

## Acceptance criteria

- [ ] Four real accounts have the specified profiles and source contrast.
- [ ] The record is persisted, inspectable, and inaccessible through forged role/direct-ID requests when denied.
- [ ] Keyboard, focus, initial/loading/error and narrow-width states have review evidence.

## Definition of done

- [ ] The ticket's complete user-visible path and stated failure cases work with real persisted data.
- [ ] Meaningful tests above pass; provider fixtures and real-provider evidence are distinguished.
- [ ] Current permission, evidence, confirmation and idempotency rules hold across every changed path.
- [ ] Application build passes and a fresh separate reviewer records all six better-* domains for the affected complete flows.
- [ ] Resolve HIGH findings and required coverage gaps; rebuild and repeat independent review after fixes.
- [ ] If motion is used, document its task benefit, truthful trigger and reduced-motion behavior; omit unnecessary effects and include adopted effects in the same review.
- [ ] Record actual commands/results, review reports, migrations, versions and remaining limitations in execution records.
- [ ] Update this ticket with its GitHub URL when published; do not close or modify the parent specification as part of ticket generation.
