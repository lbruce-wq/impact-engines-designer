// Modified by Impact Engines, 2026-11-19. See NOTICE for attribution and modification scope.
// What a new install starts with: one shortcut, `/summarize`, in the browser's language. It is not pinned, so the
// panel's new-chat page keeps its fixed starters. An update from the old version adds it too, under a fixed id so a
// second run of that update does not add it twice.
import { saveShortcut } from '@src/store';
import { setLanguage, t } from '@src/ui/i18n';

export async function addFirstShortcuts(id?: string): Promise<void> {
  await setLanguage('auto');
  await saveShortcut({
    ...(id ? { id } : {}),
    name: 'validation',
    description: t('panel.starter.summarize'),
    text: t('panel.starter.summarizeText'),
  });
}
