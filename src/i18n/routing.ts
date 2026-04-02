import { defineRouting } from 'next-intl/routing';

import {
  locales,
  defaultLocale,
  domains,
  localeDetection,
  localePrefix,
  pathnames,
} from '@/config/i18n';

const expandedDomains = domains.flatMap((d) => [
  d,
  { ...d, domain: `www.${d.domain}` },
  { ...d, domain: `preview.${d.domain}` },
]);

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix,
  localeDetection,
  domains: expandedDomains,
  pathnames,
});
