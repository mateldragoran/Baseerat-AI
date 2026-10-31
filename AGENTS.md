# Baseerat-AI

## Current scope

The user approved specification v1.1, architecture, purposeful motion guidance,
five milestones and the 15-ticket breakdown on 31 October 2026, and authorized
implementation under that plan. Begin with BAS-001 and follow dependency-ready
tickets. See docs/execution/builder-handoff.md and progress.md for handoff status.

The repository started empty. Do not assume an existing application,
technology stack, database, authentication system, or deployment setup.

The approved implementation contract is in docs/product/specification.md,
docs/architecture/architecture.md and docs/planning/implementation-plan.md.
Before a ticket, read those contracts and its requirement/acceptance references.
Keep implementation within the approved scope; compatibility, real-provider
acceptance and independent rendered UI review remain completion gates.

## Planning documentation

Maintain the following records as discovery and planning progress:

- docs/product/requirements.md: requirements and unresolved questions.
- docs/product/specification.md: implementation-ready specification.
- docs/architecture/architecture.md: system design.
- docs/architecture/decisions.md: decision index linking relevant ADRs.
- docs/planning/implementation-plan.md: milestones and verification.
- docs/planning/dependency-graph.md: dependencies and safe parallel work.
- docs/planning/tickets/: self-contained implementation tickets.
- docs/execution/progress.md: approval and execution status.
- docs/execution/review-findings.md: contradictions, gaps, and resolutions.

Distinguish confirmed requirements, proposals, and unresolved questions.
Give requirements stable identifiers and observable acceptance criteria.
Keep specification references, tickets, and dependencies consistent.

## Interface quality

Before UI work, read docs/product/interface-guidelines.md. After each application
build, dispatch a separate reviewer agent using
docs/execution/interface-review-policy.md. Review the rendered affected flows
against all six owning better-* skills, resolve blocking findings, and repeat
build/review after fixes before marking the build complete. For motion work,
read docs/product/motion-guidelines.md and motion-design; adopt effects only
where they improve the task and include them in UI/accessibility review.

## Agent skills

### Issue tracker

Use GitHub Issues in mateldragoran/Baseerat-AI through the connected
GitHub integration. Read docs/agents/issue-tracker.md before tracker work.

### Triage labels

Use the five default triage labels. Read docs/agents/triage-labels.md
before triaging or publishing specifications and tickets.

### Domain docs

Use a single-context glossary and root ADR directory.
Read docs/agents/domain.md before domain or architecture work.
