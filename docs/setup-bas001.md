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
Set BASEERAT_ACCEPTANCE_URL for a deployed URL and BASEERAT_ACCOUNT_PASSWORD for real account
journeys. Without the password, those tests explicitly skip; signed-out tests still run.
Use current Chrome and Edge; record exact tested versions and responsive/manual review evidence.

No user data is stored in localStorage/sessionStorage or a persisted browser query cache.
Authentication remains cookie-backed. Server-rendered data and JSON use private/no-store,
logout revokes the current Auth session and uses full navigation to discard rendered state.
Source versions are immutable and denied/unknown IDs use a neutral unavailable response.
Both direct database requests and application requests remain subject to current source grants.

Acceptance requires a separate six-domain rendered reviewer after each successful build.
Compile success is not acceptance. Live account, hosted deployment/redeployment, screen-reader,
and provider availability evidence must be recorded explicitly; never replace them with mocks.
