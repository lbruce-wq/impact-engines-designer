// Copyright 2026 Impact Engines.
import { describe, expect, it } from 'vitest';
import { agentSystemPrompt, chatSystemPrompt, CONTRACT } from '@src/agent/prompt';
import expert from '../survey-solutions-master.md?raw';
import navigation from '../designer-navigation.md?raw';

describe('Designer instruction integration', () => {
  it('retains both complete guides in an agent run alongside its browser contract and tools', () => {
    const prompt = agentSystemPrompt({ tools: ['snapshot', 'click', 'ask_user', 'done'] });
    expect(prompt).toContain(expert);
    expect(prompt).toContain(navigation);
    expect(prompt).toContain(CONTRACT);
    expect(prompt).toContain('You have: snapshot, click, ask_user, done.');
    expect(prompt).toContain('All drag-and-drop operations are handed to the user');
  });

  it('keeps expertise available for advice-only chat and separate from capped custom instructions', () => {
    expect(chatSystemPrompt()).toContain(expert);
    const prompt = agentSystemPrompt({ customInstructions: 'x'.repeat(50_000) });
    expect(prompt).toContain(navigation);
    expect(prompt).toContain(expert);
    expect(prompt).toContain('<custom-instructions>');
  });
});
