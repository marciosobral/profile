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
  domains,
  pathnames,
});

export const clientRouting = defineRouting({
  locales,
  defaultLocale,
  localePrefix,
  localeDetection,
  pathnames,
});
