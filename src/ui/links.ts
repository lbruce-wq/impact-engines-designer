// Modified by Impact Engines, 2026-11-19. See NOTICE for attribution and modification scope.
// Links to the Nanobrowser website. The tag names only the place in the extension the link is on, so the site can
// count the visits that came from the extension; it carries no identifier.

/** A page of the website (`/docs` is the help pages), tagged with the place that links to it. */
export const websiteUrl = (path: '/' | '/docs', _place: 'side-panel' | 'settings' | 'about') =>
  path === '/docs' ? 'https://docs.mysurvey.solutions/' : 'https://impactengines.ai/';

/** The same Terms of use destination linked by the Survey Solutions AI web assistant. */
export const TERMS_URL = 'https://impactengines.ai/survey-solutions-ai-agent-user-agreement/';
