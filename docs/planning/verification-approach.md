# Verification approach

Status: scope and test seams confirmed by the user in Q43.
Final package and build authorization recorded on 31 October 2026.
Technical acceptance detail is in specification.md; runtime checks are unrun.
Updated: 31 October 2026.

## Primary acceptance seam

Verify complete authenticated user workflows through the application interface:
browser -> authenticated application endpoints -> permission-scoped application
tools -> persistent data and AI integrations -> inspectable results.

Typed questions and live voice must use the same investigation tools,
authorization policies, calculation definitions, and evidence-resolution rules.
They may have different transport and rendering behavior. Test shared outcomes
through the common application tool boundary, then verify both channels end to
end rather than inventing separate data-access paths for voice.

The repository has no application or prior test infrastructure to reuse. Prefer
the highest observable boundary that proves the behavior. Add narrower checks
only where a browser journey cannot adequately establish a requirement.

## Focused supporting checks

- Authorization: direct authenticated requests test cross-account IDs, restricted
  sources, private/shared investigations, downloads, and exports. Verify these
  controls independently of hidden UI controls.
- Deterministic analysis: test observable query/calculation outputs and lineage.
  Include three NCRs across two of ten completed inspections -> three NCRs and
  20% inspection discrepancy rate, plus zero-denominator and missing-data cases.
- Forecasts: test ledger inclusion rules, complete/zero/missing months, chosen
  method formulas, evaluation windows, supported uncertainty, and insufficient
  history. Specify exact reproducibility and support rules before implementation.
- AI contracts: deterministic provider fixtures/replayed tool calls test malformed
  blocks, unsupported requests, invalid citations, denied actions, interruption,
  cancellation, and retry/idempotency. Fixtures are test mechanisms, not scripted
  production answers.
- Real integrations: add separately identified OpenAI text/tool and live-voice
  checks with curated English, Urdu, Roman Urdu, and mixed-language examples.
  Human listening is needed for pronunciation, recognition, and usability claims;
  contract tests alone cannot establish speech quality.
- Persistence: save/resume, refresh versioning, review/draft transitions, reset
  boundaries, current-permission redaction, and deploy/redeploy durability.
- Interface: apply all six better-* domains, rendered states, responsive widths,
  keyboard/focus checks, measured contrast, Urdu bidi, and reduced motion.

## Post-build review

The separate reviewer-agent gate is mandatory under the user's D-040 request.
Follow [interface-review-policy.md](../execution/interface-review-policy.md).
Report actual coverage and evidence. A missing build, unavailable runtime,
unrun check, or uninspected domain cannot be reported as passed.

## Completion evidence

The formal specification maps requirements to observable acceptance checks;
tickets carry relevant checks and completion criteria. Record executed results
in execution progress and review records during the approved implementation. No application tests, builds, or UI reviews have been run during
this documentation-only phase.
