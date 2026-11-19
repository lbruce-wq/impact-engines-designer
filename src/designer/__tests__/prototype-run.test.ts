// Copyright 2026 Impact Engines. Full product guidance must fit and survive an actual multi-turn agent run.
import 'fake-indexeddb/auto';
import { afterEach, expect, it } from 'vitest';
import { IDBFactory } from 'fake-indexeddb';
import { ScriptedModel, resolveProfile } from '@src/llm';
import { SHARED_PROMPT_BOUNDARY } from '@src/llm/prompt-cache';
import { createConversation, appendEntry } from '@src/store/conversations';
import { closeDb } from '@src/store/db';
import { AgentLoop } from '@src/agent/loop';
import { agentSystemPrompt } from '@src/agent/prompt';
import { toolsForRun } from '@src/agent/tools';
import { FakeHost, FakeLayer } from '@src/agent/testing/fake-layer';

afterEach(async () => {
  await closeDb();
  globalThis.indexedDB = new IDBFactory();
});

it('runs with the full Designer prompts and tool catalogue on a 64k model', async () => {
  const conversation = await createConversation({ mode: 'ask' });
  await appendEntry(conversation.id, {
    type: 'message',
    message: { role: 'user', parts: [{ type: 'text', text: 'Explain the selected age question. Do not edit.' }] },
  });
  const model = new ScriptedModel([
    { toolCalls: [{ name: 'snapshot', input: {}, id: 'observe' }] },
    {
      toolCalls: [
        { name: 'done', input: { outcome: 'success', summary: 'Inspected the selected question.' }, id: 'finish' },
      ],
    },
  ]);
  const system = agentSystemPrompt({ tools: toolsForRun({ vision: true }).map(t => t.name) });
  const loop = new AgentLoop({
    conversationId: conversation.id,
    runId: 'designer-test',
    model: {
      ref: { providerId: 'test', model: 'test' },
      chat: model.chat(),
      profile: resolveProfile({ kind: 'openai-compatible', modelName: 'test', overrides: { contextWindow: 65_536 } }),
      reasoning: 'none',
    },
    system,
    tools: toolsForRun({ vision: true }),
    layer: new FakeLayer(),
    host: new FakeHost(),
    signal: new AbortController().signal,
    emit: () => undefined,
    turnCap: 4,
  });
  expect(await loop.run()).toMatchObject({ status: 'done', turns: 2 });
  const prefix = system.split(SHARED_PROMPT_BOUNDARY)[0];
  for (const call of model.calls) {
    expect(call.prompt[0]).toMatchObject({ role: 'system', content: prefix });
    expect(prefix).toContain('Verified Designer operations');
    expect(prefix).toContain('Survey Solutions programming expertise');
  }
});
