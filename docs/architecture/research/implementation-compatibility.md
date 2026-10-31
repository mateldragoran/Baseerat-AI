# Implementation compatibility research

Research date: 31 October 2026. Status: technical recommendations for the
specification's approval; not approved implementation choices. No application
code, packages, provider resources, credentials, or API inference calls were
created or tested. Sources below were opened from their official sites; Supabase
documentation was also retrieved through its connected documentation search.

The accepted provider choices are recorded in [ADR 0001](../../adr/0001-use-openai-for-demo.md),
[ADR 0002](../../adr/0002-host-demo-on-vercel.md), and
[ADR 0003](../../adr/0003-use-hosted-supabase.md). Tool composition remains bounded
by [ADR 0004](../../adr/0004-compose-application-tools-for-ai-analysis.md).

## OpenAI text and voice

| Planning purpose | Verified fact | Proposed use |
| --- | --- | --- |
| Text investigation and report narratives | `gpt-6.1-sol` supports function calling and Structured Outputs; its tool calls require the Responses API. | One text orchestration adapter using this documented model ID, with configurable model selection and later account/evaluation checks. |
| Live conversational voice | `gpt-realtime-2.1` supports speech-to-speech, interruption improvements, and function calling; its capability table explicitly does **not** support Structured Outputs. | Realtime WebRTC for continuous audio; application tools provide authoritative structured visual results. Use Responses for strict-schema final artifacts. |

Sources: [GPT-6.1 Sol](https://developers.openai.com/api/docs/models/gpt-6.1-sol),
[GPT-Realtime-2.1](https://developers.openai.com/api/docs/models/gpt-realtime-2.1).
Both are current catalog entries without a deprecation marker in the fetched
catalog. The deprecations page specifically replaces legacy `gpt-realtime` with
`gpt-realtime-2.1`; avoid legacy model IDs copied from older API examples.
[Model catalog](https://developers.openai.com/api/docs/models),
[Deprecations](https://developers.openai.com/api/docs/deprecations).

For Responses, strict function definitions put `type: "function"`, `name`,
`parameters`, and `strict: true` on the tool object. Every object needs
`additionalProperties: false`; all properties must be required, using nullable
types for optional values. Return execution results as `function_call_output`
items matched by `call_id`. Keep returned reasoning items when continuing a
reasoning-model tool loop. [Function calling](https://developers.openai.com/api/docs/guides/function-calling).
Strict final response JSON uses `text.format` with `type: "json_schema"`,
`name`, `schema`, and `strict: true`. Handle refusals and incomplete responses;
schema conformance does not establish correct numbers, permissions, or citations.
[Structured Outputs](https://developers.openai.com/api/docs/guides/structured-outputs).

### Exact Realtime connection contracts

Prefer the documented **unified interface**: the browser creates an
`RTCPeerConnection`, adds its microphone track and a data channel, and sends its
SDP offer to an authenticated application endpoint. The trusted server sends
multipart form fields `sdp` and `session` to
`POST https://api.openai.com/v1/realtime/calls` with its standard API key.
The session JSON includes `type: "realtime"`, `model: "gpt-realtime-2.1"`, and
the current nested audio configuration, for example
`audio.output.voice: "marin"`. Return the SDP answer for the peer connection.
After setup, audio travels directly between browser and OpenAI.
[WebRTC, Realtime tab](https://developers.openai.com/api/docs/guides/voice-webrtc?voice-api=realtime).

The alternative client-credential flow is
`POST /v1/realtime/client_secrets` with a server API key and a JSON `session`
object. Its response has top-level `value` and `expires_at`. The browser uses
that `value` as its bearer token to post the raw SDP offer to
`/v1/realtime/calls` with `Content-Type: application/sdp`.
The credential's session defaults can be overridden by the client. Credentials
can create multiple sessions until expiry; expiry limits session creation,
not an already-running session. The documented default is 600 seconds;
`expires_after: {anchor: "created_at", seconds: ...}` accepts 10–7200 seconds.
These facts rule out treating an ephemeral token as a single-use application
authorization capability. [Client-secret reference](https://developers.openai.com/api/reference/resources/realtime/subresources/client_secrets/methods/create).

### Server authority with direct audio

The calls response's `Location` header supplies the call ID. The server can
attach to that existing session with
`wss://api.openai.com/v1/realtime?call_id=<call_id>` and its standard API key.
This sideband can monitor events, update instructions, and answer tool calls
while browser WebRTC continues carrying audio.
[Server-side controls, Realtime tab](https://developers.openai.com/api/docs/guides/voice-server-controls?voice-api=realtime).

Recommendation: bind the call ID to the authenticated account, investigation,
scope, and expiry on the server at SDP creation. Have a server sideband execute
the shared application tool registry, persist operation results, and publish
the same result IDs to the UI. Recheck current account access, source scope,
sharing intersection, and confirmation state on every operation. Never accept
a browser-supplied account, call ID, tool output, or instruction as authority.
Sideband control and model instructions do not remove the browser's control
channel or make prompts a security boundary. Only release authorized evidence
to that session; close and recreate it on an access/scope change when old context
would be inappropriate. These are application design requirements inferred from
the connection contracts, not provider-enforced authorization guarantees.

Realtime tool results use `conversation.item.create` with an item of type
`function_call_output`, its `call_id`, and a string `output`, followed by
`response.create`. Tool arguments still need application validation. Do not
dispatch a mutation merely because `response.function_call_arguments.done`
arrived: the reference says it is also emitted for interrupted, incomplete,
or cancelled responses. Check completion/cancellation and durable confirmation
before dispatch. [Realtime conversations](https://developers.openai.com/api/docs/guides/realtime-conversations),
[Server event reference](https://developers.openai.com/api/reference/resources/realtime/server-events).

Authenticated per-call HTTP forwarding from browser events can enforce database
permissions, but leaves the browser to relay conversational events/results and
does not supply a server-observed voice audit. Prefer sideband for this product's
governed tool flow. This comparison is an architectural inference; it is not a
claim that browser prompts are tamper-proof with either design.

## Next.js, Vercel, and a bounded sideband

The current App Router documentation identifies Next.js **16.4.3**. The 16.4
release includes React **19.3**, also identified as current by React's own version
page. Recommend TypeScript and App Router, resolving exact compatible dependency
patches into a lockfile during the approved build. No dependencies are installed.
[Next.js installation](https://nextjs.org/docs/app/getting-started/installation),
[Next.js 16.4](https://nextjs.org/blog/next-16-4),
[React versions](https://react.dev/versions).

Use Node.js for server routes. Vercel recommends Node.js over Edge; Next.js
16.3+ does not support `runtime = 'edge'`. The current Vercel Node page lists
**26.x as default**, with 24.x and 22.x also available; only major versions are
selectable and Vercel applies minor/patch updates. Node 24.x is a conservative
supported proposal, not a claim that it remains the provider default.
[Edge runtime guidance](https://vercel.com/docs/functions/runtimes/edge),
[Node versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions).

Vercel now supports WebSockets on all plans with Fluid Compute. For Next.js,
the current documented API is `upgradeWebSocket()` from `@vercel/functions`
**3.10.0 or later**. A connection stays on one instance; a reconnect can reach
another. WebSocket connections close at the function duration limit, and state
must live outside function memory. Thus an authenticated application control
WebSocket can keep an invocation active while its server opens the outbound
OpenAI sideband; audio remains direct WebRTC. This composition requires a deployed
compatibility test and is not yet verified in Baseerat AI.
[Vercel WebSockets](https://vercel.com/docs/functions/websockets).

Standard Fluid durations are 300 seconds default on all plans; maximums are
300 seconds on Hobby and 800 seconds on Pro/Enterprise. The 1800-second option
is beta and should not be a prerequisite. Recommend an explicit control lease
below the chosen tier's maximum, durable call/operation records in Supabase,
and a visible reconnection state. Test reattaching a sideband to the same call;
if recovery cannot preserve trustworthy control, close/recreate the voice
session with authorized persisted context. Do not promise seamless rollover
before that test. [Duration limits](https://vercel.com/docs/functions/configuring-functions/duration).

## Supabase Auth, grants, and evidence files

Use `@supabase/supabase-js` with `@supabase/ssr`, browser/server clients, and
cookie `getAll`/`setAll` integration. Current Next.js guidance uses `proxy.ts`
to refresh and propagate cookies because Server Components cannot write them.
Verify identity using `auth.getClaims()`; do not trust cookie contents or
`getSession().user` for server authorization. `getClaims()` checks signatures
against cached public keys for asymmetric projects, or calls Auth for symmetric
projects. `getUser()` obtains a fresh Auth user record. Neither replaces current
application permission checks. Do not cache authenticated responses or refreshed
`Set-Cookie` responses across users.
[Supabase SSR client guide](https://supabase.com/docs/guides/auth/server-side/creating-a-client?framework=nextjs),
[getUser](https://supabase.com/docs/reference/javascript/auth-getuser).

The official breaking-change notice schedules explicit grants for new public
tables across existing projects from **30 October 2026**; older tables retain
their grants. Table grants determine object reachability; RLS determines visible
or writable rows. Include least-privilege grants and RLS policies together in
migrations instead of depending on project defaults. The general security guide
still describes a gradual transition; inspect the actual project's settings
after approval rather than assuming rollout completion.
[Data API change](https://supabase.com/changelog/45329-breaking-change-tables-not-exposed-to-data-and-graphql-api-automatically),
[Securing the API](https://supabase.com/docs/guides/api/securing-your-api).

Keep source grants and investigation membership in database tables for fresh
checks. User-editable `user_metadata` is unsuitable for authorization; even
server-owned JWT claims can be stale until token refresh. Privileged service
keys and security-definer functions can bypass RLS. Prefer user-scoped queries
and security-invoker database operations, with narrowly controlled privileged
maintenance. Views need `security_invoker = true` on PostgreSQL 15+ to apply
underlying RLS as the caller.
[RLS guidance](https://supabase.com/docs/guides/database/postgres/row-level-security).

Private Storage buckets enforce `storage.objects` RLS on downloads as well as
other operations; downloads use a user JWT or a time-limited signed URL. Public
buckets bypass read access controls. Recommendation: authorize evidence/report
downloads at request time and stream through the authenticated application or
use JWT-authorized download. A previously issued signed URL remains a bearer
capability for its validity window, so avoid treating it as immediately revoked
by a subsequent application permission change.
[Bucket access](https://supabase.com/docs/guides/storage/buckets/fundamentals).

## Minimal English PDF export

Recommend a Node **PDFKit** renderer for a deliberately simple English report:
title, immutable report version/scope, narrative, modest tables/charts, evidence
references, and page numbers. PDFKit creates a PDF as a readable Node stream;
its documented API supports HTTP output. Text wraps and paginates automatically
and supports links. This supports generating a PDF without a headless browser
binary; that deployment conclusion is an inference from its Node rendering API.
Generate from the authorized saved report snapshot, store the result in private
Storage, and reauthorize every later download. The canonical preview should show
that generated PDF so preview/export cannot diverge.
[PDFKit creation/output](https://pdfkit.org/docs/getting_started.html),
[PDFKit text/layout](https://pdfkit.org/docs/text.html).

`@react-pdf/renderer` is also viable in principle: it provides `renderToBuffer`
and `renderToStream`, and documents React 19 support since 4.1.0. However its
compatibility page lists tests only on Node 18/20/21. It does not establish the
chosen modern Node/Next combination, so PDFKit avoids an unnecessary React
renderer compatibility dependency for this simple report.
[React-pdf Node API](https://react-pdf.org/docs/v4/node),
[React-pdf compatibility](https://react-pdf.org/docs/v4/compatibility).

Vercel's standard Node bundle limit is 250 MB and request/response payloads
are limited to 4.5 MB. Keep the normal export bounded below that response size;
larger artifacts can be stored server-to-server and downloaded through an
authorized Storage path rather than an oversized buffered function response.
Inspect the actual production bundle, fonts, PDF output, and payload size in the
approved compatibility test. [Function limits](https://vercel.com/docs/functions/limitations).

## Remaining validation gates

- Provider credentials, project/model entitlement, budgets, tier/region settings,
  quotas, actual deployed URLs, and model/tool behavior have not been tested.
- Require a deployed early test of SDP setup, sideband attachment, continuous
  audio during tool execution, interruption, transcript persistence, duration
  rollover, logout/access changes, retries, and cancellation/idempotency.
- Require native-speaker checks of English, Urdu script, Roman Urdu, mixed
  speech, accents, identifiers, units, and language switching. Public model
  capability pages do not establish Baseerat AI's Urdu quality threshold.
- Realtime input transcription is optional, asynchronous, and guidance rather
  than an exact account of what the audio model heard. Explicitly enable and
  test transcript events; retain no application raw-audio files. This does not
  imply zero provider-side retention. See [client-secret/session reference](https://developers.openai.com/api/reference/resources/realtime/subresources/client_secrets/methods/create)
  and the earlier [voice research](openai-voice-options.md).
- Resolve/package-pin the remaining dependencies at implementation time. No
  exact OpenAI SDK, Supabase SDK, PDFKit, or React patch version was verified by
  this research. Recheck current provider docs before implementation because
  the installed Vercel skills already contain older Node defaults and an older
  `experimental_upgradeWebSocket` name than the opened documentation.
