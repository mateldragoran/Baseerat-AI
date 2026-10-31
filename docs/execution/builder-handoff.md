# Builder handoff

Status: approved on 31 October 2026. The user approved the complete package,
purposeful motion and 15-ticket breakdown and authorized implementation.
Start BAS-001; this planning handoff has not implemented application features.

## Readiness conclusion

The specification, architecture, acceptance register, five milestones, dependency
graph, interface/motion rules and 15 approved tickets are sufficient to begin the
agreed demonstration. No additional product requirements document is needed
before the first build. Technical compatibility and rendered quality are proved
during implementation, not by claiming the written plan guarantees them.

## Approval and publication

User approval is recorded in [progress](progress.md), AGENTS.md, specification,
ADRs and ticket index. The approval covers the full plan; execute dependency-ready
tickets starting with BAS-001. GitHub issue #1 remains open and unchanged during
child generation; its earlier approval gate is superseded by the recorded final
approval. Publication links and revision evidence are maintained in progress.md
and the ticket index. Use the published main branch and record the actual checkout
commit when the builder starts.

## Operator and environment prerequisites

| Item | Needed for | Verification |
| --- | --- | --- |
| GitHub checkout with the planning commit | Reliable source of truth | Read AGENTS, spec, architecture and the first ticket at the recorded revision. |
| Supabase development/test project and authorized provisioning access | Four real accounts, schema, RLS, private files | Verify the target project; keep ordinary data requests user-scoped and privileged maintenance separate. |
| OpenAI API project/key and access to the proposed text/voice models | Actual text/tool and live-voice behavior | Configure secrets securely; BAS-002 verifies real model/API access and behavior. |
| Vercel project access | Deployed host, provider domain and bounded voice control | Verify target team/project, configured runtime/limits, redirects and the actual assigned URL. |
| Supported Node/package-manager environment | Locked application build | Verify current official compatibility and commit exact package locks; do not copy stale versions blindly. |
| Browser/runtime inspection and microphone test capability | Rendered UI, keyboard/focus, responsiveness and real speech checks | Separate deterministic tests from actual provider and human-listening evidence. |
| Installed better-* and motion-design skills | Required builder/reviewer behavior | These skills live outside the repository. Ensure the receiving environment has them; project summaries do not replace the owning instructions. |

Never ask the user to paste secrets into chat or commit secret values. Missing
access does not prevent useful independent code/fixture work, but unrun real
integration gates remain unverified and cannot be marked complete.

## Reading order

1. [AGENTS.md](../../AGENTS.md) and [progress](progress.md).
2. [Specification](../product/specification.md), including AC-001–031.
3. [Architecture and contracts](../architecture/architecture.md), relevant ADRs
   and [glossary](../../GLOSSARY.md).
4. [Implementation plan](../planning/implementation-plan.md),
   [dependency graph](../planning/dependency-graph.md), and selected ticket.
5. [Interface guidelines](../product/interface-guidelines.md),
   [motion guidelines](../product/motion-guidelines.md), actual owning skills,
   and [post-build review policy](interface-review-policy.md).

The original conversation is not required. The accepted decisions and their
supersessions are preserved in discovery.md if rationale is needed.

## Starting work and completion discipline

- Begin with [BAS-001](../planning/tickets/bas-001-signed-in-workspace.md).
  Establish the readable persona-focused shell, genuine sign-in/source contrast,
  shared contracts and rendered design foundations before expanding screens.
- Prove real deployed provider/voice compatibility in BAS-002. Do not build the
  complete voice experience around an unverified transport or mocked capability.
- Execute dependency-ready tickets. Parallel branches are opportunities, not
  permission to edit shared contracts/migrations concurrently without integration.
- Keep the demonstration focused: no named scenario editor, general-purpose code
  runner, real institutional integrations or enterprise production machinery.
- Every successful application build/rebuild goes to a fresh separate reviewer
  agent. Supply the running URL, actual build/source identity, fixtures/accounts
  and complete affected flows. Resolve HIGH findings and required coverage,
  rebuild, and repeat independent review after fixes.
- The reviewer checks all six owning better-* domains. When motion exists,
  also load motion-design and apply the functional-only project policy. No
  decorative animation is required; keep reduced-motion and immediate feedback.
- Record real test/build/review evidence and current limitations in execution
  records. Provider fixtures do not prove real speech quality or deployed access.
- Never call a ticket complete solely because code compiles. Its user-visible
  outcome, permissions, numerical/evidence consistency and review criteria apply.

## Reusable starting instruction

The user has authorized the approved implementation. Starting instruction:

> Implement the approved Baseerat AI package at the recorded planning revision.
> Read AGENTS.md and builder-handoff.md, verify the approval state, and begin
> BAS-001. Follow the dependency graph, specification acceptance criteria, and
> architecture contracts. Preserve the polished, understandable persona-based
> interface and use motion only where it improves the task. After every successful
> application build, dispatch a separate reviewer under interface-review-policy.md;
> fix blockers and repeat the build/review cycle. Record actual evidence and
> limitations. Do not expand into excluded production features or substitute
> mocked behavior for required real integrations.

The full plan is authorized. Respect dependencies and completion gates; this
handoff does not claim any ticket has already been implemented.
