# OpenAI voice options: technical research

Research date: 31 October 2026.

Status: factual research for planning, not an architecture decision or an
implementation approval. No model, voice, framework, storage policy, or
interaction pattern is selected here. No keys were accessed or API calls run.
Sources are fetched official OpenAI documentation; availability and behavior
must be checked again when the specification selects an API workflow.

## Architecture options

| Option | Documented behavior | Planning implication, not a decision |
| --- | --- | --- |
| Chained voice | Application manages speech-to-text, an agent workflow, then text-to-speech; intermediate text can be inspected or transformed. | A transcript-review step and one shared text/voice investigation workflow are technically possible. |
| Realtime speech-to-speech | One session interprets audio, reasons, calls tools, and produces speech; the model consumes audio directly. | Natural turn taking and interruptions are possible, while tool execution and display state still require application code. |
| GPT-Live | Current docs also describe full-duplex speech with a separate delegated backend. | This is another documented option, not an assumed requirement for the demo. |

Source: [Voice agents](https://developers.openai.com/api/docs/guides/voice-agents).
Realtime is documented for immediate conversations, barge-in and low first-audio
latency: [Realtime getting started](https://developers.openai.com/api/docs/guides/realtime).
These are qualitative capabilities, not measured Baseerat AI latency guarantees.

## English, Urdu and language uncertainty

The speech-generation guide explicitly lists English and Urdu among supported
languages, says voices are optimized for English, and says audio can be generated
by supplying text in the desired language. It also requires clear disclosure that
the voice is AI-generated. This does not establish equivalent pronunciation or
accuracy across languages, or Urdu quality for every newer Realtime model.
[Text to speech](https://developers.openai.com/api/docs/guides/text-to-speech).

The current file-transcription guide describes original-language transcription,
multilingual context, keywords and language hints. Its language section does not
enumerate Urdu; it refers readers to the Whisper language list outside this
research's allowed source domains. Therefore, the fetched pages do not establish
model-specific Urdu transcription support or an accuracy guarantee for the
eventual selection. [File transcription](https://developers.openai.com/api/docs/guides/speech-to-text).
The current transcription model page describes multiple language hints and
code-switching support, without a per-language quality guarantee.
[Transcription model documentation](https://developers.openai.com/api/docs/models/gpt-transcribe).

Roman Urdu spelling, mixed English/Urdu engineering speech, Urdu-script output,
accents, part numbers, units and proper names remain validation unknowns. No
guarantee for these was found in the fetched sources. Representative human
recordings and listening evaluation would be needed after implementation is
authorized; language support alone cannot supply acceptance thresholds.

## Tools and structured visual results

Realtime function calling exposes a named function and JSON arguments. Application
code executes it and returns a function-call result tied to its call ID; the model
can then respond. The API does not itself implement Baseerat AI's investigation
queries or charts. [Realtime conversations, function calling](https://developers.openai.com/api/docs/guides/realtime-conversations#function-calling).

Inference for planning: application tools can return validated investigation data,
and the application can use that same result for tables, charts, record references
and spoken summaries. The result schema, validation, evidence linkage and UI
updates must be specified by Baseerat AI. A model utterance is not a completed tool
operation or authoritative engineering source record.

Structured Outputs constrain text responses to a supplied JSON Schema on
supported models, with refusal and schema limitations to handle.
[Structured model outputs](https://developers.openai.com/api/docs/guides/structured-outputs).
This is distinct from Realtime function calling: the documented
`gpt-realtime-2.1` capability table lists function calling as supported and
Structured Outputs as unsupported. This capability check is an example, not a
model recommendation. [Realtime model capability table](https://developers.openai.com/api/docs/models/gpt-realtime-2.1).

## Browser credentials

Standard OpenAI API keys belong on the application server, never in the browser.
Realtime WebRTC supports a server-mediated unified connection or a short-lived
client secret issued by the server. With the latter, the browser connects to
OpenAI using the ephemeral credential. The docs recommend WebRTC for browser or
mobile clients. An API key alone does not define application authentication,
permissions or usage controls. [WebRTC connection and ephemeral credentials](https://developers.openai.com/api/docs/guides/voice-webrtc).

## Transcript visibility and retention

Realtime input transcription is optional, off by default, asynchronous and separate
from the native audio model. OpenAI says it is guidance about the audio rather
than an exact account of what the model heard. Audio output includes a text
transcript and transcript events. [Realtime server events](https://developers.openai.com/api/reference/resources/realtime/server-events).

Planning tradeoff: a chained workflow can inspect or ask users to correct the
actual intermediate text before the investigation runs. A Realtime transcript
should not be presented as an exact audit of the audio model's understanding.
Displaying captions, allowing corrections and storing transcripts are separate
product choices; neither architecture settles them.

OpenAI's endpoint table currently lists no abuse-monitoring or application-state
retention for `/v1/audio/transcriptions`; `/v1/audio/speech` and `/v1/realtime`
have 30-day abuse-monitoring retention and no application-state retention. API
data is not used for training by default unless the customer opts in. The
Responses workflow has additional storage behavior, including default 30-day
application-state retention; flags, features and model-specific exceptions matter.
Zero Data Retention and Modified Abuse Monitoring require eligibility and prior
approval. [API data controls](https://developers.openai.com/api/docs/guides/your-data).

Application retention is independent: choosing not to save raw audio in Baseerat
AI would not imply that no audio reaches OpenAI or that provider retention is zero.
Raw-audio replay can aid recognition diagnosis, but adds application storage to
govern. Transcript-only records omit tone and cannot fully reconstruct audio
interpretation. These are tradeoffs awaiting a product decision.

## Lifecycle facts and remaining decisions

Current documentation schedules `tts-1`, `tts-1-hd` and `gpt-4o-mini-tts` removal
for 6 January 2027; older Whisper/4o transcription models for 26 February 2027.
The TTS migration changes API workflow to Realtime rather than merely replacing
the model ID at `/v1/audio/speech`. A conceptual chained architecture therefore
must not silently commit a new release to a deprecated speech endpoint example.
[Deprecations](https://developers.openai.com/api/docs/deprecations),
[Speech-generation migration note](https://developers.openai.com/api/docs/guides/text-to-speech).

Unresolved: voice interaction pattern; transcript review/correction policy;
selected models and Urdu validation; Roman Urdu scope; spoken versus visual answer
contents; target latency, quality and cost; application transcript/audio retention;
provider storage configuration and actual account eligibility. This research
resolves none of those product or architecture decisions.
