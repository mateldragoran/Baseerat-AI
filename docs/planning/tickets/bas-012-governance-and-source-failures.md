# BAS-012: Inspect actual Governance and source failure behavior

Status: ready-for-agent; approved for implementation on 31 October 2026.
Start only after the listed blockers are complete.
GitHub issue: [#13](https://github.com/mateldragoran/Baseerat-AI/issues/13).
Parent specification: [GitHub issue #1](https://github.com/mateldragoran/Baseerat-AI/issues/1).

## Objective and what to build

The administrator inspects actual hosted AI/grants/audit state, changes source availability for a controlled failure, and demonstrates stale/no-cache/recovery outcomes.

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

Requirements: REQ-010, REQ-022, REQ-023, REQ-026.
Acceptance references: AC-010, AC-022, AC-023, AC-026.
Architecture sections: A-04–05, A-09–10.

## Blocked by

[BAS-009 #10](https://github.com/mateldragoran/Baseerat-AI/issues/10)

## Implementation requirements

- Show provider/model and actual source/sync state without keys or unsupported local-isolation claims.
- Implement administrator-only effective grant/status/audit views; keep private query text out of audit metadata.
- Implement confirmed source availability/cache controls and corresponding catalogue/analysis limitations.
- Ensure cached age and no-cache absence propagate consistently to Ask, analytics, records and saved refresh.
- Record safe permission-denial and state-change events; ordinary UI uses realistic operational wording.

## Expected files/modules

Proposed areas, not existing files: src/features/governance; src/server/governance/audit; source status and audit policies; source-aware catalogue/tool adapters; tests/governance.
Follow the actual established conventions after prerequisite tickets land.
Paths are included at the user's explicit request and must be updated if the
approved implementation establishes different locations.

## Integration and verification

- J-08/09 administrator and restricted accounts plus direct Governance endpoint denial.
- Cache/no-cache/recovery source cases and audit action/outcome reconciliation.
- No key/private content or hidden-source counts leak; independent rendered Governance review.

## Acceptance criteria

- [ ] Displayed state is backed by actual configuration and behavior.
- [ ] Offline records are either honestly stale or unavailable, never falsely complete.
- [ ] Source scenario controls do not edit engineering content or grant users access.

## Definition of done

- [ ] The ticket's complete user-visible path and stated failure cases work with real persisted data.
- [ ] Meaningful tests above pass; provider fixtures and real-provider evidence are distinguished.
- [ ] Current permission, evidence, confirmation and idempotency rules hold across every changed path.
- [ ] Application build passes and a fresh separate reviewer records all six better-* domains for the affected complete flows.
- [ ] Resolve HIGH findings and required coverage gaps; rebuild and repeat independent review after fixes.
- [ ] If motion is used, document its task benefit, truthful trigger and reduced-motion behavior; omit unnecessary effects and include adopted effects in the same review.
- [ ] Record actual commands/results, review reports, migrations, versions and remaining limitations in execution records.
- [ ] Update this ticket with its GitHub URL when published; do not close or modify the parent specification as part of ticket generation.
