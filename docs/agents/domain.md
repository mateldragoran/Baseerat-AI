# Domain docs

## Layout

Use a single-context layout:
- GLOSSARY.md at the repository root.
- docs/adr/ for numbered architectural decision records.
- docs/architecture/decisions.md as the decision index.

## Before exploration or design

Read GLOSSARY.md and ADRs relevant to the task.
If they do not exist, proceed silently. Create them lazily when domain
terms or architectural decisions are resolved through domain-modeling.

Use glossary terms consistently in requirements, specifications,
tickets, tests, and architecture documents.

When a needed term is absent, distinguish a real vocabulary gap from
an unnecessary synonym. Record resolved terminology in the glossary.

Surface conflicts with an existing ADR explicitly, identifying the
decision and the reason for proposing a change.

Keep detailed decision rationale in its ADR and link it from the
decision index rather than duplicating competing accounts.
