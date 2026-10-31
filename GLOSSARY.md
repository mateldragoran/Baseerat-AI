# Baseerat AI

Baseerat AI supports evidence-based engineering investigations and material
planning. This glossary records settled domain vocabulary.

## Language

**Baseerat AI**:
The English product name for the engineering intelligence application.
_Avoid_: BASIRAT AI, BASIRAT AI / بصیرت

**Engineering source record**:
A record of engineering information, such as an inspection, specification,
stock transaction, or maintenance event, which Baseerat AI analyzes without
changing the source record.
_Avoid_: Editable investigation note

**Synthetic data**:
Fictional engineering records used to evaluate the application, distinct from
actual institutional information.
_Avoid_: Actual PAC data, production data

**Part definition**:
A design-level engineering item, such as HA-204, which can have revisions and
multiple manufactured units.
_Avoid_: Physical unit, serial number

**Production batch**:
A group of physical units manufactured together under a shared batch identity.
_Avoid_: Part definition, individual unit

**Physical unit**:
An individual manufactured item identified by a serial number, with its own
maintenance history.
_Avoid_: Part definition, production batch

**Document revision**:
A particular version of an engineering document, identifiable separately from
earlier and later versions.
_Avoid_: Current document (when the referenced version is historical)

**Inspection discrepancy rate**:
The percentage of completed inspections in a scope that have at least one
discrepancy; multiple nonconformances in one inspection count once in the numerator.
_Avoid_: Nonconformance count, failure rate

**Material consumption forecast**:
An estimate of future monthly consumption of a material expressed in its unit
of measure, distinct from a purchasing decision.
_Avoid_: Purchase order, automatic replenishment
