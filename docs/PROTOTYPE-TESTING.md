# Prototype test record

19 November 2026.

## Completed

- Full unit suite: 945 passed, 6 skipped across 77 test files (76 passed, 1 skipped).
- Full Designer prompt integration, a 64k multi-turn scripted run and provider request/cache-prefix tests included in that suite.
- TypeScript type checking passed.
- Production extension build passed.
- Browser fixture checks: `appearance`, `panel-chat`, `panel-instructions` passed using Chrome for Testing 158.0.8127.36.
- Appearance screenshots reviewed for panel and onboarding. Light/dark screens were captured by the harness. Composer height stayed stable across wide/narrow checks.
- Original Designer interaction research exercised section creation, roster context menus, nested insertion, properties, movement, expressions, categories and compilation on a disposable lab questionnaire before extension integration.

The six skipped unit tests are inherited opt-in/live tests; the default suite does not spend real-provider credits. Browser fixtures use a scripted local model, which verifies extension wiring rather than actual LLM judgement.

## First live test

1. Load `dist/` unpacked in Chrome or Edge and connect a 64k-or-larger tool-capable model using your own key.
2. Open a disposable questionnaire copy in Survey Solutions Designer. Keep Ask mode for this first test.
3. Select an existing question and use **Explain the selected question**. Check its type, variable and roster context.
4. Request a small validation edit with an explicit rule and message. Verify the saved values in Designer and compile.
5. Ask for a new question inside a named roster. Check that the agent uses the roster's right-click menu and verifies the parent.
6. Request a reorder. Check that the agent hands over the drag and verifies the result after you finish.
7. Inspect **Model usage** over several turns to measure provider cache reads and writes.

Use the original project's twenty-task Designer replay suite for broader evaluation. Real LLM performance, actual provider cache hits, long questionnaires and production deployment remain unverified. This is a local prototype, not a store release.
