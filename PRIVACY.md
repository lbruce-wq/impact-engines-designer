# Prototype privacy

Modified by Impact Engines, 19 November 2026. This policy describes the Impact Engines Designer prototype, not the upstream NanoBrowser product. The upstream document is preserved in docs/upstream-PRIVACY.md.

The prototype runs in your browser and has no Impact Engines account or model proxy. Conversations, attachments, keys and settings are stored locally in the extension's browser storage. Your configured model provider receives your messages, relevant page content, attachments and requested screenshots; a selected voice provider receives voice input when enabled. Their terms and data handling apply. A local browser engine does not make hosted-model requests local.

Production analytics are disabled in code, even if upstream analytics environment variables are supplied. The upstream store-rating prompts and uninstall survey are disabled. Development autorun builds can send synthetic test events to their local fixture server.

The extension inherits broad host/debugger permissions and is intended for use on a disposable Survey Solutions Designer questionnaire during testing. The manifest is not yet restricted to Designer origins.

Remove provider keys in Providers settings. Delete conversations or all extension data in Data settings. Removing the extension clears its local browser storage. No real-provider caching, retention or confidentiality guarantee is made by this prototype; those depend on the provider and model you select.

A browser-readable copy of this information ships as public/prototype-privacy.html and is linked from Settings → Data.
