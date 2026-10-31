# Ticket dependencies

Status: breakdown and implementation approved on 31 October 2026. No ticket
has been implemented. Publication identifiers are in the ticket index.

~~~mermaid
flowchart TD
  B1[BAS-001 Signed-in workspace] --> B2[BAS-002 Provider proof]
  B1 --> B3[BAS-003 Connected Explorer]
  B3 --> B4[BAS-004 Quality]
  B3 --> B5[BAS-005 Maintenance]
  B3 --> B6[BAS-006 Knowledge]
  B3 --> B7[BAS-007 Forecast]
  B2 --> B8[BAS-008 Typed Ask]
  B4 --> B8
  B5 --> B8
  B6 --> B8
  B7 --> B8
  B8 --> B9[BAS-009 Investigations]
  B9 --> B10[BAS-010 Reports]
  B9 --> B11[BAS-011 Bilingual live voice]
  B9 --> B12[BAS-012 Governance]
  B10 --> B13[BAS-013 Persona/reset]
  B11 --> B13
  B12 --> B13
  B13 --> B14[BAS-014 Cross-flow safeguards]
  B14 --> B15[BAS-015 Presentation/handoff]
~~~

## Direct blocking edges

Only direct blockers are listed; transitive dependencies remain binding.

| Ticket | Direct blockers | Why |
| --- | --- | --- |
| BAS-001 | None | First complete sign-in and permitted-record slice; approved and unblocked. |
| BAS-002 | BAS-001 | Needs authenticated actor/record tool and deployment baseline. |
| BAS-003 | BAS-001 | Extends the working catalogue/access contract and seed model. |
| BAS-004 | BAS-003 | Requires real inspections/batches and reproducible record sets. |
| BAS-005 | BAS-003 | Requires units, histories, and scoped relationships. |
| BAS-006 | BAS-003 | Requires versioned document/entity identity. |
| BAS-007 | BAS-003 | Requires material identity and source/coverage contract. |
| BAS-008 | BAS-002, BAS-004, BAS-005, BAS-006, BAS-007 | Full Ask integrates actual provider and the implemented domain tools. |
| BAS-009 | BAS-008 | Saves validated run artifacts with evidence lineage. |
| BAS-010 | BAS-009 | Exports immutable investigation versions with current ACLs. |
| BAS-011 | BAS-009 | Full voice includes persistent saved-action workflows; inherits provider and all tools. |
| BAS-012 | BAS-009 | Governance inspects real operations, sharing, source and provider states. |
| BAS-013 | BAS-010, BAS-011, BAS-012 | Persona/presenter shortcuts must reach complete supporting workflows. |
| BAS-014 | BAS-013 | Verifies the fully integrated account, snapshot, voice and reset paths. |
| BAS-015 | BAS-014 | Final rehearsal/deploy handoff requires integrated safeguards. |

## Safe parallel work and shared ownership

BAS-002/BAS-003 own provider/voice versus catalogue areas after BAS-001 freezes
base contracts. BAS-004–007 own distinct quality, maintenance, knowledge, and
materials modules after BAS-003 freezes record/evidence contracts. BAS-010–012
own reports, voice, and Governance after BAS-009 freezes saved-artifact/action
contracts. Coordinate shared components, migrations, lockfiles, and registry
integration through one integrator; run regressions after merges.

Do not split one count/rate/evidence implementation across separate schema/API/UI
tickets. Do not split voice authorization and provider call binding between
independent branches. Do not split report snapshot authorization from export.
Each branch's ticket includes its data, application, UI, tests and review.

If native GitHub blocking links are unavailable, published ticket bodies will
carry exact parent and Blocked by issue references. The local graph and one-file
ticket definitions remain consistent with those published identifiers.
