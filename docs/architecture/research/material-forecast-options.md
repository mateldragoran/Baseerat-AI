# Material forecast options

Research date: 31 October 2026. Status: planning research; method and policy
choices below remain proposals. No model was trained or evaluated for this note.
Any later statistical results on the curated synthetic data demonstrate behavior
on fictional records; they do not validate institutional forecasting performance.

## Context and boundary

The accepted product direction is monthly material-consumption forecasting in
units, with 1-, 3-, and 6-month horizons (default 3), explanations, uncertainty,
and scenarios. ADR 0004 permits application forecast tools, rather than general
AI-generated program execution. The LLM can request a supported calculation and
explain its returned evidence; ordinary backend code performs the arithmetic.

## Source findings

Hyndman and Athanasopoulos describe these benchmark methods: naive repeats the
last observation; seasonal naive repeats the last observation from the same
season. MAE and RMSE measure errors in original units. MAPE is undefined or
infinite at zero actuals; sMAPE is unstable near zero. MASE scales absolute errors
by training-series naive errors. Rolling-origin validation uses only observations
before each forecast origin and supports multiple horizons. Prediction intervals
need distributional assumptions; residual bootstrap assumes uncorrelated errors
with constant variance. For uncorrelated residuals, naive forecast standard
deviation is `sigma * sqrt(h)` and seasonal naive is
`sigma * sqrt(floor((h-1)/m)+1)`. These are model-based results, not universal
uncertainty formulas. [FPP3, chapter 5](https://otexts.com/fpp3/toolbox.html)

Simple exponential smoothing (SES) uses
`level[t] = alpha*y[t] + (1-alpha)*level[t-1]`, with flat future forecasts
`forecast[h] = level[T]`. It suits series without clear trend or seasonality.
Parameters and initialization must be specified; fitting them by squared-error
minimization requires optimization. Smoothing methods alone do not define the
full forecast distribution; the underlying statistical model provides intervals.
[FPP3, chapter 8](https://otexts.com/fpp3/exponential-smoothing.html)
[NIST SES equation](https://www.itl.nist.gov/div898/handbook/pmc/section4/pmc431.htm)

Missingness can bias forecasts and needs context. Some methods can use missing
values; the cited implementation of ETS cannot. Small counts need care with
continuous distributions. Croston's intermittent-demand method is biased and
has no algebraic prediction intervals. Summing monthly mean forecasts gives a
total mean; interval limits cannot simply be added because forecast errors are
correlated. Simulation of joint future paths is one solution.
[FPP3, chapter 13](https://otexts.com/fpp3/practical.html)

NIST distinguishes averaging and exponential smoothing as ways to smooth time
series. A trailing-average forecast below is an application proposal, distinct
from a centered moving average used to inspect historical patterns.
[NIST smoothing overview](https://www.itl.nist.gov/div898/handbook/pmc/section4/pmc42.htm)

## Minimal implementation candidates — inference and proposals

These formulas can be implemented as short, deterministic TypeScript functions;
they do not imply a Python service or an LLM numerical calculation. This is an
engineering inference from their arithmetic, not a source endorsement of a stack.

| Candidate | Proposed implementation and explanation | Limitation |
| --- | --- | --- |
| Naive benchmark | Repeat the latest complete monthly consumption value at every requested horizon. Show that month's value and date. | Reacts entirely to one month; an exceptional final month dominates. |
| Seasonal naive benchmark | For horizons up to 6 months, copy each target month's value from the previous year. Show the source months. | Needs all relevant prior-year observations; arithmetic eligibility does not establish stable seasonality. |
| Trailing mean alternative | Average the latest `w` consecutive complete months; repeat that mean for each future month. Version the chosen window. | Smooths spikes but ignores trend and changing seasonality. Do not recursively include predictions without specifying a different method. |
| SES alternative | Fix and version `alpha` and the initial level, or specify a bounded deterministic fitting procedure. Return those parameters with results. | More setup than a mean; fixed parameters are not an optimized ETS implementation. |

A plausible smallest comparison is naive plus seasonal naive when eligible,
with one smoothing alternative if it adds explanatory value. Method selection,
minimum history, parameter grid/window, tie-breaking, and fallback policy remain
specification decisions. No method is claimed to be most accurate for Baseerat AI.

## Data meaning — unresolved domain decisions

These are modeling implications, not institutional inventory-accounting rules:

- Decide whether the target is actual recorded use, gross stock issues, or net
  issues after returns. A stock issue can precede use; a return can reverse an
  issue from an earlier month. Calling either consumption requires an explicit
  approved definition and example ledger reconciliation.
- Separate receipts, transfers, adjustments, issues, usage events, and returns.
  Decide whether a return is attributed to its posting month or linked original
  event. Net negative months require correction or a differently named target;
  silently clipping them would conceal a semantic problem.
- A complete month with confirmed no consumption can be zero. An absent or
  incomplete month is unknown, not automatically zero. Preserve a calendar index,
  completeness status, and provenance; do not drop gaps and compress time.
- Decide the series key (material and applicable location/scope), canonical unit,
  conversion rules, reporting timezone, and exclusion of partial current months.
  Stockouts can conceal unmet need: an observed-use forecast is not automatically
  an unconstrained-demand forecast.

## Proposed evaluation and uncertainty contract

Use chronological rolling origins with eligible histories and evaluate leads
1 through 6, reporting the requested 1/3/6 leads separately. Keep origins and
actual months identical across methods being compared. Fit any parameters using
only information available at that origin; keep a final untouched chronological
test segment if selecting among candidates. Record sample counts and exclusions.
This applies the chapter 5 validation principle to this product's horizons.

Propose MAE in units as the readable main measure, RMSE as a supplementary
large-error measure, and signed mean error for direction. Report per material;
do not average incomparable unit types. MASE is optional for cross-series
comparison: declare the reference lag and return unavailable if its training
denominator is zero. The zero-denominator consequence follows directly from
its definition. Do not report a percentage accuracy score for all-zero actuals.

Two reviewable uncertainty options are:

1. Explicit model-based benchmark intervals using the cited assumptions and
   forecast-error variance, with diagnostics and observed held-out coverage.
2. A proposed empirical error band: collect earlier rolling-origin errors
   separately by lead, add chosen lower/upper error quantiles to the current
   point forecast, and validate coverage on later untouched origins. Record the
   quantile rule, history size, nominal level, and observed coverage. Such a band
   has no automatic calibrated-probability guarantee, especially with few or
   dependent errors. Return unavailable when the agreed support rule fails.

Neither arbitrary `+/-10%` nor LLM confidence is a statistical interval. If the
target is nonnegative, any bound adjustment must be declared and evaluated;
Gaussian errors can produce negative bounds. Fractional expected units need an
explicit display/rounding rule. A horizon total needs its own error validation
or a joint-path construction, rather than summed monthly interval endpoints.

Scenarios should be explicitly assumed changes (for example, an approved
activity multiplier) applied to a named base forecast. Show the formula and
assumption; do not label a scenario an interval quantile or assert causal
learning from the synthetic ledger. Explanations should return method/version,
cutoff, source record references, observed monthly series, exclusions, parameters,
forecast values, evaluation evidence, and uncertainty limitations.

## Decisions required before specification approval

Resolve the target and returns examples; calendar completeness and units;
eligible history and candidate methods; parameter/selection/fallback policy;
interval type, level and support rule; lead versus cumulative-total presentation;
rounding; scenario parameters; and synthetic evaluation fixtures. Accuracy and
coverage targets require an explicit product decision; this research sets none.
