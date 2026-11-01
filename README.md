# Baseerat AI

Baseerat AI is an engineering intelligence demonstration. The complete
specification, purposeful motion guidance and 15-ticket plan were approved for
implementation on 31 October 2026.

The repository now contains a **BAS-001 implementation checkpoint; acceptance is
still open**. Its current local application includes password sign-in/sign-out,
Overview, identifier lookup, persisted source-version detail, live source/action
grants, private-session access controls and auth audit foundations. Four real
accounts are provisioned; direct access checks pass for all four profiles, and
local presenter/restricted browser journeys pass. Hosted database policy tests
also pass with isolated rollback fixtures. Deployed behavior remains unverified.

See [BAS-001 setup and commands](docs/setup-bas001.md),
[ticket evidence and limitations](docs/execution/ticket-notes/bas-001.md), and the
[central recovery ledger](docs/execution/agent-state.md) for the exact current
state. Vercel deployment
and remaining interface/assistive-technology coverage are explicit acceptance
gates. Preserve the working branch/worktree until those gates are verified.

Start with:

- [Product specification](docs/product/specification.md)
- [Requirements](docs/product/requirements.md)
- [Architecture, schema and API/tool contracts](docs/architecture/architecture.md)
- [Implementation plan](docs/planning/implementation-plan.md)
- [Dependency graph](docs/planning/dependency-graph.md)
- [15 implementation tickets](docs/planning/tickets/README.md)
- [Interface guidelines](docs/product/interface-guidelines.md)
- [Independent post-build review policy](docs/execution/interface-review-policy.md)
- [Progress and approval status](docs/execution/progress.md)
- [Builder handoff](docs/execution/builder-handoff.md)
- [Planning audit](docs/execution/planning-audit.md)

The approved full application uses Vercel, Supabase and hosted OpenAI APIs. Its synthetic
source data is documented internally; normal presentation has no mandatory
synthetic-data badge. The presenter handles disclosure. English documents and
bilingual text/live voice are planned for the agreed investigation workflows.
AI, voice, connected analytical workspaces, saved investigations, reports and
Governance are later tickets; their presence in the plan is not a claim that
they are implemented in this checkpoint.

Future coding agents must read [AGENTS.md](AGENTS.md), the ticket and its
specification references. Begin with BAS-001 under the recorded approval; follow
its dependencies and independent post-build review requirements.
