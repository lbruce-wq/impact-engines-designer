// Modified by Impact Engines, 2026-11-19. See NOTICE for attribution and modification scope.
// Settings → About: the version, the project's licence, the website, and the open-source packages the extension ships with theirs.
import { SettingsCard } from './SettingsCard';
import { t } from '@src/ui/i18n';
import { LICENCES } from './licences';
import { websiteUrl } from '@src/ui/links';

export function AboutSection() {
  const manifest = chrome.runtime.getManifest();
  return (
    <div className="flex flex-col gap-6">
      <h2 className="sr-only">{t('settings.nav.about')}</h2>
      <SettingsCard title="Impact Engines Designer" className="flex flex-col gap-2">
        <p className="text-sm">{t('about.version', { version: manifest.version })}</p>
        <p className="text-sm text-nb-muted">{t('about.license', { license: 'Apache-2.0' })}</p>
        <p className="text-sm">
          {t('about.website')}{' '}
          <a className="text-nb-link underline" href={websiteUrl('/', 'about')} target="_blank" rel="noreferrer">
            impactengines.ai
          </a>
        </p>
        <p className="text-sm leading-relaxed text-nb-muted">
          Built on{' '}
          <a
            className="text-nb-link underline"
            href="https://github.com/nanobrowser/nanobrowser"
            target="_blank"
            rel="noreferrer">
            NanoBrowser
          </a>{' '}
          (Apache-2.0), with the Impact Engines Survey Solutions master prompt (MIT).
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
          <a className="text-nb-link underline" href="/licenses/NOTICE.txt" target="_blank" rel="noreferrer">
            Copyright and modifications
          </a>
          <a
            className="text-nb-link underline"
            href="/licenses/nanobrowser-Apache-2.0.txt"
            target="_blank"
            rel="noreferrer">
            Apache 2.0
          </a>
          <a
            className="text-nb-link underline"
            href="/licenses/survey-solutions-prompt-MIT.txt"
            target="_blank"
            rel="noreferrer">
            Prompt licence
          </a>
          <a className="text-nb-link underline" href="/licenses/Inter-OFL.txt" target="_blank" rel="noreferrer">
            Inter font licence
          </a>
          <a
            className="text-nb-link underline"
            href="/licenses/third-party-licenses.txt"
            target="_blank"
            rel="noreferrer">
            Third-party notices
          </a>
        </div>
      </SettingsCard>
      <SettingsCard title={t('about.licences')}>
        <ul className="flex flex-col gap-1 text-sm">
          {LICENCES.map(l => (
            <li key={l.name} className="flex flex-wrap gap-x-2">
              <a className="break-all font-mono text-nb-link underline" href={l.url} target="_blank" rel="noreferrer">
                {l.name}
              </a>
              <span className="text-nb-muted">{l.licence}</span>
            </li>
          ))}
        </ul>
      </SettingsCard>
    </div>
  );
}
