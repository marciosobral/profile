import { defineRouting } from 'next-intl/routing';

import {
  locales,
  defaultLocale,
  domains,
  localeDetection,
  localePrefix,
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
});
