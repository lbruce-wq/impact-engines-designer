# Prompt caching in the prototype

The long expert and navigation guides form a stable, application-owned prefix. They are included once in the system instructions for each request, not copied into tool results or appended repeatedly to conversation history.

## Request order

1. Stable agent identity, browser contract and permissions.
2. Stable Survey Solutions programming and Designer navigation guides.
3. An explicit shared-prefix boundary.
4. Tool guidance, capped user memory and response-language preference.
5. Conversation history, tool results, and current browser state.

Dates embedded in the versioned documents are build-time constants. Current time, URL, selection, questionnaire content and live page state stay in the later conversation/browser-state messages. The tool catalogue is fixed for a run. Changing the shared guides intentionally creates a new prefix; the routing key version should be advanced for a new released prompt family.

## Provider handling

- **Anthropic:** an explicit ephemeral cache breakpoint is attached to the system block ending at the shared-prefix boundary. NanoBrowser's existing automatic request caching remains enabled, allowing later conversation reuse as supported by the API. No longer TTL is forced.
- **OpenAI:** shared instructions are leading developer messages in Responses API `input`, rather than top-level `instructions`. A stable `impact-engines-designer-v0.1` routing/accounting key is sent. Response storage remains disabled. No extended retention or explicit paid-write policy is forced.
- **Gemini:** the stable system instruction and ordered messages are eligible for the provider's implicit caching where the selected model supports it. The prototype does not create paid explicit cached-content resources.
- **Other providers/local models:** the same stable-prefix layout is retained. Their caching support depends on the endpoint; the prototype does not claim provider-independent cache guarantees.

These choices follow the current [OpenAI caching guide](https://developers.openai.com/api/docs/guides/prompt-caching), [AI SDK Anthropic provider documentation](https://ai-sdk.dev/providers/ai-sdk-providers/anthropic), and [AI SDK Google provider documentation](https://ai-sdk.dev/providers/ai-sdk-providers/google). The installed SDK's actual request serializers are covered by mocked wire tests.

## Measuring real results

Expand **Model usage** below a finished answer to inspect provider-reported input, output, cache-read and cache-write tokens for that run. Zero can mean no hit or no reported field. A first eligible request may write a cache; later requests may read it. Eligibility, minimum token length, expiry, write charges, routing and retention differ by model/provider. Caching does not remove the instructions from the context window, make them free, or guarantee a latency improvement.

No real-provider keys were used during development, so live hit rates, latency and costs are not yet measured. To benchmark, use the same provider/model and prompt version for a repeated short task, compare first versus subsequent usage, and avoid mixing model changes, compaction and edits to custom memory into that initial comparison. Model usage is stored locally with the conversation; production telemetry is disabled.

Use a model with **64k or more context** for the full prototype. The small-window browser-engine tests keep their original stress conditions with product expertise omitted; a separate multi-turn test runs the complete guides and tool catalogue on a 64k profile.
