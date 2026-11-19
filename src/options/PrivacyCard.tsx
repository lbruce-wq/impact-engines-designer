// Modified by Impact Engines, 2026-11-19: prototype privacy information replaces telemetry controls.
import { t } from '@src/ui/i18n';
import { SettingsCard } from './SettingsCard';
export const PRIVACY_URL = '/prototype-privacy.html';
export function PrivacyCard() {
  return (
    <SettingsCard title={t('privacy.title')} className="flex flex-col gap-3 text-sm leading-relaxed">
      <p>Prototype telemetry is disabled. There is no Impact Engines account or model proxy.</p>
      <p>
        Your conversations and keys are stored in this browser. Page content and messages go to the model provider you
        choose.
      </p>
      <a className="self-start text-nb-link underline" href={PRIVACY_URL} target="_blank" rel="noreferrer">
        {t('privacy.policy')}
      </a>
    </SettingsCard>
  );
}
