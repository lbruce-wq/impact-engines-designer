// Copyright 2026 Impact Engines. Shared instructions precede user settings and live conversation state.
import type { SystemModelMessage } from 'ai';

export const SHARED_PROMPT_BOUNDARY = '\n\n<!-- End of shared application instructions -->\n\n';
export const PROMPT_CACHE_KEY = 'impact-engines-designer-v0.1';

/** Split at an application-owned boundary; untrusted page content never enters this system string. */
export function cacheableSystem(system: string, provider: string): SystemModelMessage[] {
  if (!system) return [];
  const index = system.indexOf(SHARED_PROMPT_BOUNDARY);
  const prefix = index < 0 ? system : system.slice(0, index);
  const tail = index < 0 ? '' : system.slice(index + SHARED_PROMPT_BOUNDARY.length);
  return [
    {
      role: 'system',
      content: prefix,
      ...(provider === 'anthropic' ? { providerOptions: { anthropic: { cacheControl: { type: 'ephemeral' } } } } : {}),
    },
    ...(tail ? [{ role: 'system' as const, content: tail }] : []),
  ];
}
