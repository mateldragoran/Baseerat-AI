# Hosted demo feasibility and open choices

Research date: 31 October 2026. Status: technical research; no architecture
decision, provider selection, implementation approval, or provisioning.

## Planning inputs

The user has chosen Vercel hosting on a default `*.vercel.app` address and
OpenAI API use for text and live conversational voice with interruption.
Engineering source records are synthetic data. Investigations must persist
and support private and shared access. Real application accounts and source
scopes are administrator-created. Supabase and local storage are permitted
options; the persistence provider remains unresolved. See
[ADR 0001](../../adr/0001-use-openai-for-demo.md) for the existing OpenAI decision.

## Verified feasibility facts

### Hosted persistence and address

Ordinary Vercel Functions provide a read-only filesystem and temporary writable
`/tmp` space. Vercel explicitly says local SQLite storage is unsuitable because
function storage is ephemeral and not shared across instances. **Inference:**
local JSON/SQLite files on the deployed function cannot be the durable,
shared investigation or account store. Bundled synthetic fixtures can be read;
mutable records require a durable service outside the function filesystem.
This finding concerns Functions, not separately provisioned Sandbox storage.
[Vercel runtimes](https://vercel.com/docs/functions/runtimes),
[Vercel SQLite guidance](https://vercel.com/kb/guide/is-sqlite-supported-in-vercel).

Vercel automatically assigns deployment addresses under `vercel.app`.
Names are allocated first come, first served and cannot be reserved.
`baseeratai.vercel.app` is therefore an illustrative desired address, not an
allocated address or availability claim. No project or domain was created or
checked in an account during this research.
[Vercel domain allocation](https://vercel.com/docs/domains/working-with-domains).

### Live voice and application tools

OpenAI documents direct browser-to-OpenAI WebRTC audio. Session setup can pass
through the application server or use an ephemeral client token minted by the
server; the standard OpenAI API key stays on the server. **Inference:** the
continuous browser audio connection need not occupy a Vercel HTTP request for
the entire conversation.
[OpenAI WebRTC guide](https://developers.openai.com/api/docs/guides/voice-webrtc?voice-api=realtime).

For the documented Realtime API, enabled voice activity detection can cancel a
spoken response when the user starts speaking. WebRTC/SIP automatically truncate
unplayed output audio. This supports interruption feasibility; microphone,
playback, network recovery, and tool cancellation behavior still need explicit
acceptance criteria and later browser verification.
[OpenAI conversation interruption](https://developers.openai.com/api/docs/guides/realtime-conversations).

A server-side sideband WebSocket can observe and control the same voice session
while WebRTC carries audio. Application code still executes tools and enforces
authorization. Current OpenAI server-control documentation also describes
forwarding browser data-channel function calls to an authenticated backend for
GPT-Live Responses delegation without a sideband. These are API-specific
options, not interchangeable event schemas or a selected implementation.
[OpenAI server controls](https://developers.openai.com/api/docs/guides/voice-server-controls).

Current Vercel documentation explicitly supports WebSocket servers in Functions
with Fluid Compute. Earlier blanket claims that Vercel cannot host WebSockets
are obsolete. Connections close at the function's maximum duration; reconnects
can reach another instance. Durable coordination belongs in an external store.
**Inference:** an application sideband or audio proxy needs a planned lifetime
and reconnect strategy; selecting direct browser WebRTC does not itself solve
server-side tool authorization or persistence.
[Vercel WebSockets](https://vercel.com/docs/functions/websockets).

### Supabase as an unselected hosted option

Supabase supplies a full hosted PostgreSQL database and integrated Auth using
JWTs and row-level security (RLS). These capabilities can support persistent
investigations, real users, and per-record access, but the product's actual
ownership, source-scope, and sharing rules must be designed.
[Supabase database](https://supabase.com/docs/guides/database/overview),
[Supabase Auth](https://supabase.com/docs/guides/auth).

The Auth administrator `createUser` operation is server-only; privileged keys
must never enter the browser. Account creation does not by itself grant the
correct source scopes or investigation access.
[Supabase administrator user creation](https://supabase.com/docs/reference/javascript/auth-admin-createuser).

Private Storage buckets apply RLS to downloads and other operations; downloads
use a user JWT or a time-limited signed URL. Public buckets allow retrieval by
anyone with the URL. **Inference:** investigation sharing and access to attached
source evidence need coordinated policies; a signed URL is a separate access
capability whose lifetime must be chosen.
[Supabase bucket access](https://supabase.com/docs/guides/storage/buckets/fundamentals).

RLS policies require resource-specific predicates; signing in alone does not
establish permission to every record. User-editable `user_metadata` is unsuitable
for authorization. Privileged server operations need explicit permission checks
because privileged access can bypass RLS.
[Supabase RLS](https://supabase.com/docs/guides/database/postgres/row-level-security).

The current changelog states that, from 30 October 2026, new tables require
explicit grants for Data API exposure on all projects; grants and RLS remain
separate layers. If Supabase is chosen, specifications must cover both layers
rather than assuming automatic table exposure.
[Supabase Data API change](https://supabase.com/changelog/45329-breaking-change-tables-not-exposed-to-data-and-graphql-api-automatically).

## Choices still requiring resolution

- Durable persistence and identity provider; if “local storage” means browser
  storage or a separate local server, define that explicitly and reconcile it
  with hosted, cross-account persistence and sharing.
- Sharing recipients, roles, revocation, source-scope intersection, and whether
  previously saved evidence remains accessible after scope changes.
- Login method, initial administrator bootstrap, account activation/recovery,
  and administrator access to investigations.
- Voice API family and model, supported browsers, session length, reconnect
  behavior, and whether tools use a sideband or authenticated per-call requests.
- Transcript/audio retention, attachments requiring private object storage,
  deployment region, resource limits, and operating budget.

No model, plan tier, pricing, final hostname, database schema, or production
readiness claim is selected here. No API keys, accounts, projects, deployments,
or other hosted resources were created or changed. The Supabase Markdown
changelog endpoint could not be retrieved; its official HTML changelog and the
relevant linked breaking-change notice were inspected instead.
