# BAS-001 setup

Use Node24 (verified 24.22.1), npm12 (verified 12.2.1). Run `npm ci`, `npm test`,
`npm run typecheck`, `npm run lint`, `npm run build`, then `npm start`.
The committed lockfile freezes exact packages. This slice has no inference dependency.

Copy `.env.example` to ignored `.env.local`. Configure NEXT_PUBLIC_SUPABASE_URL,
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY and APP_ORIGIN. Use the exact browser/deployment origin
for APP_ORIGIN; cookie mutations require matching Origin. Normal application code uses no
maintenance key. Set Vercel runtime to Node24 via package engines; configure the same public
variables and exact deployment origin there. Keep test credentials out of untrusted previews.

Apply ordered Supabase migrations to an isolated development/test project using the authorized
maintenance operator. Then execute supabase/seed.sql once. It is idempotent for its dataset ID
and never silently redates existing records. The eight records are fictional source fixtures;
origin is recorded in private.datasets. Full history/relations are BAS-003 work.
Public registration is excluded: disable sign-ups in project Auth settings and provision accounts.
The local config disables both general and email sign-up. This file does not configure hosted
Auth automatically: the operator must disable hosted Authentication sign-ups and verify the
public `/auth/v1/settings` response reports `disable_signup: true` before acceptance/deployment.

The first hosted migrations were applied through MCP, which stamped their application times.
Tracked filenames now match the verified hosted history so future CLI synchronization does not
interpret the original CLI creation versions as new migrations. The SQL bytes are unchanged;
do not reapply these to the existing development project.

| Original CLI creation filename | Verified hosted/tracked filename |
| --- | --- |
| 20261031184631_bas001_identity_catalogue.sql | 20261031184852_bas001_identity_catalogue.sql |
| 20261031185125_bas001_integrity.sql | 20261031185614_bas001_integrity.sql |
| 20261031190339_bas001_live_sessions_auth_audit.sql | 20261031190745_bas001_live_sessions_auth_audit.sql |
| 20261031190841_bas001_auth_audit_insert_only.sql | 20261031211048_bas001_auth_audit_insert_only.sql |

Create ignored `.env.maintenance` with NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SECRET_KEY and
BASEERAT_ACCOUNT_PASSWORD of at least 16 characters (or BASEERAT_PRESENTER_PASSWORD,
BASEERAT_ANALYST_PASSWORD, BASEERAT_RESTRICTED_PASSWORD, BASEERAT_REVIEWER_PASSWORD).
Run `npm run accounts:provision`. This maintenance-only script uses Auth admin to create
confirmed accounts, writes trusted profiles and live grants, preserves existing passwords/epochs,
and restores the documented grant matrix on rerun. Never install this secret in normal app runtime.
Keep those credentials secure and supply to the presenter outside chat. Accounts are:

| Email | Profile | Permitted sources |
| --- | --- | --- |
| presenter@baseerat.example | Presenter/admin | All four |
| analyst@baseerat.example | Full analyst | All four |
| restricted@baseerat.example | Restricted analyst | Engineering; Quality |
| reviewer@baseerat.example | Reviewer | All four |

For direct live access checks create ignored `.env.acceptance` with the public URL/key and
the acceptance passwords, then run `npm run test:access`. Run the rollback-only
supabase/tests/bas001_access.sql in the isolated database to check actual PostgreSQL policies.
The SQL policy fixtures bypass password authentication and are distinct from real account tests.

Run Playwright via `npm run test:acceptance` against the running production server.
Authentication tests default to trace/screenshot/video off. Keep traces off for real credentials;
the implementer uses an ignored local wrapper to redact password/token/secret values from any
captured failure output before printing it. Do not attach credential-bearing traces or auth state.
Install its browser first with `npx playwright install chromium`. A task-local installation is
supported by setting PLAYWRIGHT_BROWSERS_PATH to an ignored `.tools/browsers` absolute path
for both installation and tests; the current checkout uses this approach.
Set BASEERAT_ACCEPTANCE_URL for a deployed URL and BASEERAT_ACCOUNT_PASSWORD for real account
journeys. Without the password, those tests explicitly skip; signed-out tests still run.
Use current Chrome and Edge; record exact tested versions and responsive/manual review evidence.

No user data is stored in localStorage/sessionStorage or a persisted browser query cache.
Authentication remains cookie-backed. Server-rendered data and JSON use private/no-store,
logout revokes the current Auth session and uses full navigation to discard rendered state.
Auth cookies are HttpOnly and SameSite=Lax; HTTPS origins also use Secure. The only privileged
database helper resolves the signed JWT's own Auth session state, with no lookup arguments.
Live-session RLS denies source/action/private-session reads immediately after logout or session
expiry. Auth audit records are private, append-only, and contain actor/session IDs, outcome,
request ID and timestamp, never passwords, email addresses or question text. After Auth confirms
logout, a short-lived user-JWT client is used exclusively to append its completion event; it
cannot read protected source content. If audit delivery fails after logout, the signed-out page
reports that recording failure without falsely claiming the session is still active.
Source versions are immutable and denied/unknown IDs use a neutral unavailable response.
Both direct database requests and application requests remain subject to current source grants.

Acceptance requires a separate six-domain rendered reviewer after each successful build.
Compile success is not acceptance. Live account, hosted deployment/redeployment, screen-reader,
and provider availability evidence must be recorded explicitly; never replace them with mocks.
