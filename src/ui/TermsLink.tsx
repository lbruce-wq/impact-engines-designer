// Copyright 2026 Impact Engines. Shared legal destination for the plugin surfaces.
import { TERMS_URL } from './links';

export function TermsLink() {
  return (
    <a className="text-nb-link underline underline-offset-2" href={TERMS_URL} target="_blank" rel="noreferrer">
      Terms of use
    </a>
  );
}
