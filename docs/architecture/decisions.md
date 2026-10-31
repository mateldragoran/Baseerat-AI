# Architecture decision index

Status: approved for implementation on 31 October 2026. OpenAI is the demo AI
provider, Vercel hosts the application, and hosted Supabase supplies
PostgreSQL/Auth/private Storage. Detailed backend, authorization and voice
choices are approved in architecture.md; compatibility and runtime verification
remain unperformed.
Updated: 31 October 2026.

## Accepted constraints

The authoritative decision record is
[discovery.md](../planning/discovery.md#round-1-product-boundaries).

- D-001 and D-002 constrain release purpose and the greenfield starting point.
- D-003 identifies the primary user and required material-planning workflow.
- D-004 defines the organization boundary.
- D-005 and D-007 define language and product naming.
- D-006 defines which information the application may change.
- D-008 supersedes the English-only AI scope and defers local inference.
- D-009 through D-012 define functional coverage, seed data, account provisioning,
  and investigation sharing.
- D-013's rejected capability limit is followed by D-015's accepted multi-step
  assistant workflow. D-024 defines action confirmation; D-025 chooses execution
  through flexible application tools.
- D-014 excludes commercial delivery constraints from the requested discovery.
- D-016 through D-019 define live voice, bilingual interactions, reply-language
  selection, and transcript-only application retention.
- D-020 selects Vercel and a provider domain, without reserving a specific name.
- D-021 establishes four demo accounts and easy access to all demo features.
- D-022 selects hosted Supabase for data, identity, and private files.
- D-023 and D-024 define presenter access and AI action confirmation.
- D-025 selects application-tool composition after explanation; general-purpose
  generated SQL/Python execution is outside the first release.
- D-026 through D-028 define domain identity, revision handling, and saved-evidence
  versioning with current permission checks.
- D-029 through D-031 define forecast scope, account/source privileges, and
  cached-source use during outages.
- D-032 removes mandatory demo/synthetic presentation labels; actual data origin
  remains recorded internally. D-036 subsequently resolves relative-date behavior.
- D-033 through D-035 define the quality-rate metric, English reports, and
  voice/provider failure behavior.
- D-036 resolves actual-current-date queries and Asia/Karachi display time.
- D-037 and Q43 confirm a baseline-only forecast and defer named scenarios.
- D-038/D-039 define review-version transitions and presenter reset boundaries.
- D-040 replaces dense tables with clear persona-based responsive UI/UX and
  requires separate reviewer agents after application builds.
- D-041/D-042 define general explanations and actual-consumption/missingness rules.
- Q43 confirms the revised scope and test seams, including baseline-only
  forecasting. Final package approval and build authorization followed on 31 October 2026.

## Architectural decision records

- [ADR-0001: Use hosted OpenAI AI for the evaluation demo](../adr/0001-use-openai-for-demo.md).
- [ADR-0002: Host the authenticated demonstration on Vercel](../adr/0002-host-demo-on-vercel.md).
- [ADR-0003: Use hosted Supabase for persistent demo data and identity](../adr/0003-use-hosted-supabase.md).
- [ADR-0004: Compose application tools for AI-led analysis](../adr/0004-compose-application-tools-for-ai-analysis.md).
- [ADR-0005: Govern text and voice through shared tools](../adr/0005-govern-text-and-voice-through-shared-tools.md).
- [ADR-0006: Use one explainable forecast baseline](../adr/0006-use-one-explainable-forecast-baseline.md).

The source concept's remaining recommended technology list is not an accepted
architecture decision. Technical research is evidence for later choices, not
an approval of those choices.
