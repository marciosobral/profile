import { defineRouting } from 'next-intl/routing';

import {
  locales,
  defaultLocale,
  domains,
  localeDetection,
  localePrefix,
  pathnames,
} from '@/config/i18n';

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix,
  localeDetection,
  domains: domains.map((domain) => ({
    ...domain,
    locales: [...domain.locales],
  })),
  pathnames,
});
