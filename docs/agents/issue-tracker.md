# Issue tracker: GitHub

Repository: https://github.com/mateldragoran/Baseerat-AI
Use the connected GitHub integration. The user explicitly selected
this instead of the setup skill's gh CLI workflow.

## Conventions

- Explicitly target mateldragoran/Baseerat-AI for every operation.
- Before the first write in a session, verify the target repository
  and connected account's access.
- Read an issue's full body and comments before planning from it.
- Publish specifications and implementation tickets as GitHub issues.
- Apply triage labels using docs/agents/triage-labels.md.
- Before creating an issue, check for an existing matching issue.
- Post the resolution before closing an issue.
- Preserve unrelated labels and issue content when updating.
- A ready-for-agent label describes readiness; it does not authorize
  implementation before the user's build approval.

## Documentation and tracker relationship

Product and architecture documents hold the detailed requirements
and design. GitHub Issues track actionable work and execution status.

Keep one Markdown file per implementation ticket in
docs/planning/tickets/. Record its stable ticket ID and, once published,
its GitHub issue number and URL. Keep ticket requirements, acceptance
criteria, and dependencies consistent across both locations.

## Dependencies

Use native sub-issues and blocking relationships when supported.

Otherwise:
- Keep the child list in docs/planning/tickets/README.md; during ticket generation
  the to-tickets skill requires leaving the parent issue unchanged.
- Put "Part of #<parent>" in the child.
- Put "Blocked by: #<number>, ..." near the top of each blocked ticket.

A ticket is startable only after all blockers are completed and the
user has approved implementation. Keep the dependency graph consistent
with tracker relationships. Do not close a parent merely because its
child tickets have been published.

## Integration limitations

Inspect available connector capabilities before tracker operations.
Use GitHub's UI when an operation is unavailable through the connector.
If access prevents completion, report the specific outstanding action.

## Pull requests as a triage surface

PRs as a request surface: no.

## Wayfinding

When using wayfinder, use one map issue with linked child tickets.
Record ticket type, ownership, blockers, and resolution.
Choose unassigned, unblocked open children in map order.
Claim a ticket before working; resolve it with an explanatory comment
and add a decision pointer to the map.
