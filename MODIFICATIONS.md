# Modifications to NanoBrowser

Modified by Impact Engines, 19 November 2026.

Upstream base: `291d5f3927ee4c4795b0ea4588f2b404838b3ff6`. The original Apache 2.0 LICENSE remains unchanged. This fork adds Survey Solutions guidance, prompt-cache integration, Impact Engines branding, prototype privacy, packaging and associated tests. Existing upstream engineering and dependency notices are retained.

## Changed upstream files

- `AGENTS.md`
- `PRIVACY.md`
- `README.md`
- `entrypoints/options/index.html`
- `entrypoints/permission/index.html`
- `entrypoints/sidepanel/index.html`
- `entrypoints/welcome/index.html`
- `package.json`
- `public/_locales/en/messages.json`
- `public/_locales/zh_CN/messages.json`
- `public/_locales/zh_TW/messages.json`
- `public/icon-128.png`
- `public/icon-32.png`
- `src/agent/__tests__/compaction.test.ts`
- `src/agent/__tests__/elision.test.ts`
- `src/agent/__tests__/injection-context.test.ts`
- `src/agent/__tests__/overflow-recovery.test.ts`
- `src/agent/__tests__/reasoning.test.ts`
- `src/agent/loop.ts`
- `src/agent/prompt.ts`
- `src/extension/__tests__/first-run.test.ts`
- `src/extension/__tests__/upgrade.test.ts`
- `src/extension/analytics.ts`
- `src/extension/bindings.ts`
- `src/extension/first-run.ts`
- `src/extension/notify.ts`
- `src/extension/selection.ts`
- `src/extension/uninstall.ts`
- `src/llm/providers.ts`
- `src/llm/stream.ts`
- `src/options/AboutSection.tsx`
- `src/options/App.tsx`
- `src/options/PrivacyCard.tsx`
- `src/options/Welcome.tsx`
- `src/options/index.tsx`
- `src/options/welcome-main.tsx`
- `src/side-panel/App.tsx`
- `src/side-panel/RatingCard.tsx`
- `src/side-panel/Transcript.tsx`
- `src/side-panel/__tests__/cards.test.tsx`
- `src/side-panel/index.tsx`
- `src/side-panel/mic-permission.tsx`
- `src/store/settings.ts`
- `src/ui/components.tsx`
- `src/ui/icons.tsx`
- `src/ui/links.ts`
- `src/ui/locales/en.json`
- `src/ui/locales/zh_CN.json`
- `src/ui/locales/zh_TW.json`
- `tailwind.config.ts`
- `wxt.config.ts`

New files under src/designer, src/llm/prompt-cache.ts, scripts, docs and public provide the new instructions, tests, original product glyph, brand assets, fonts, privacy page and licence notices. Toolbar PNG replacements are described in public/brand/ASSET-NOTICES.txt. Source comments, JSON metadata and this record identify modifications.

The small-context engine stress tests omit the product guides to preserve their original stress conditions; the full product guides are independently exercised by the 64k multi-turn test. UI assertions were updated for the product identity and first-run validation shortcut.
