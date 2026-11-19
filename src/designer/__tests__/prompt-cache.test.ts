// Copyright 2026 Impact Engines. Checks actual provider request serialization without making paid API calls.
import { describe, expect, it, vi } from 'vitest';
import { agentSystemPrompt } from '@src/agent/prompt';
import { cacheableSystem, PROMPT_CACHE_KEY, SHARED_PROMPT_BOUNDARY } from '@src/llm/prompt-cache';
import { createModel } from '@src/llm/providers';
import { streamTurn } from '@src/llm/stream';

describe('shared prompt caching', () => {
  it('keeps the full shared prefix identical when language, tools and custom memory change', () => {
    const a = agentSystemPrompt({
      tools: ['snapshot', 'click'],
      responseLanguage: 'English',
      customInstructions: 'Project A',
    });
    const b = agentSystemPrompt({
      tools: ['snapshot', 'screenshot'],
      responseLanguage: 'French',
      customInstructions: 'Project B',
    });
    const [prefixA, tailA] = a.split(SHARED_PROMPT_BOUNDARY);
    const [prefixB, tailB] = b.split(SHARED_PROMPT_BOUNDARY);
    expect(prefixA).toBe(prefixB);
    expect(prefixA).toContain('Survey Solutions programming expertise');
    expect(prefixA).toContain('Verified Designer operations');
    expect(prefixA).not.toContain('Project A');
    expect(tailA).not.toBe(tailB);
  });

  it.each(['anthropic', 'openai', 'gemini'] as const)(
    '%s sends shared instructions before varying user/page content',
    async kind => {
      const bodies: Record<string, unknown>[] = [];
      const fetch = vi.fn(async (_url: unknown, init?: RequestInit) => {
        bodies.push(JSON.parse(String(init?.body)) as Record<string, unknown>);
        return new Response(JSON.stringify({ error: { message: 'captured' } }), {
          status: 400,
          headers: { 'content-type': 'application/json' },
        });
      }) as typeof globalThis.fetch;
      const system = agentSystemPrompt({
        tools: ['snapshot', 'ask_user', 'done'],
        customInstructions: 'Private project preference',
      });
      await streamTurn({
        chat: createModel(
          {
            kind,
            modelName: kind === 'openai' ? 'gpt-6.2' : kind === 'anthropic' ? 'claude-sonnet-5-5' : 'gemini-3.8-flash',
            apiKey: 'test-key',
          },
          { fetch },
        ),
        system,
        messages: [{ role: 'user', content: 'Live page state: question age' }],
        retry: { attempts: 1, baseMs: 0, maxMs: 0 },
      });
      const body = bodies[0];
      expect(body).toBeDefined();
      if (kind === 'anthropic') {
        const blocks = body.system as Array<{ text: string; cache_control?: unknown }>;
        expect(blocks[0].cache_control).toEqual({ type: 'ephemeral' });
        expect(blocks[0].text).not.toContain('Private project preference');
        expect(blocks[1].text).toContain('Private project preference');
      } else if (kind === 'openai') {
        expect(body.prompt_cache_key).toBe(PROMPT_CACHE_KEY);
        expect(body).not.toHaveProperty('instructions');
        const input = body.input as Array<{ role: string; content: unknown }>;
        expect(input[0].role).toBe('developer');
        expect(JSON.stringify(input[0].content)).toContain('Verified Designer operations');
        expect(JSON.stringify(input[0].content)).not.toContain('Private project preference');
      } else {
        expect(JSON.stringify(body.systemInstruction)).toContain('Verified Designer operations');
        expect(JSON.stringify(body.contents)).toContain('Live page state');
      }
    },
  );

  it('does not attach Anthropic-specific options to other providers or invent paid explicit Gemini caches', () => {
    expect(cacheableSystem('stable', 'gemini')).toEqual([{ role: 'system', content: 'stable' }]);
    expect(cacheableSystem('', 'openai')).toEqual([]);
  });
});
