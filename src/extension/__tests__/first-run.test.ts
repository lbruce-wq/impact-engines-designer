// Modified by Impact Engines, 2026-11-19: the first shortcut drafts a Designer validation.
import 'fake-indexeddb/auto';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { IDBFactory } from 'fake-indexeddb';
import { closeDb, listShortcuts } from '@src/store';
import { addFirstShortcuts } from '../first-run';

afterEach(async () => {
  vi.unstubAllGlobals();
  await closeDb();
  globalThis.indexedDB = new IDBFactory();
});

describe('first run', () => {
  it('adds an unpinned /validation shortcut', async () => {
    vi.stubGlobal('navigator', { language: 'en-US' });
    await addFirstShortcuts();
    const [only, ...rest] = await listShortcuts();
    expect(rest).toEqual([]);
    expect(only).toMatchObject({
      name: 'validation',
      description: 'Draft a validation',
      text: 'Inspect the selected Designer question and its existing validations. Help me draft a validation and a clear message. Ask what rule I need if it is not specified, and show the proposed change before editing.',
      pinned: false,
    });
  });

  it("writes it in the browser's language", async () => {
    vi.stubGlobal('navigator', { language: 'zh-CN' });
    await addFirstShortcuts();
    const [only] = await listShortcuts();
    expect(only).toMatchObject({
      description: '起草验证条件',
      text: '查看选中问题及其验证条件，帮助起草验证条件和消息。先确认所需规则，编辑前展示建议。',
    });
  });
});
