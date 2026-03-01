import type { MetadataRoute } from 'next';

import { locales, defaultLocale, localePrefix, pathnames } from '@/config/i18n';
import { excludedRoutes } from '@/config/routes';
import { getUrl } from '@/utils/host';

function getLocalizedPaths(routePath: string): string[] {
  const localized = pathnames[routePath as keyof typeof pathnames];
  if (!localized) return [routePath];

  if (typeof localized === 'string') return [localized];

  return locales.map((locale) => {
    const path = localized[locale];
    const isDefault = locale === defaultLocale;
    if (isDefault) return path;
    const prefix = localePrefix.prefixes[locale];
    return `${prefix}${path}`;
  });
}

export default async function robots(): Promise<MetadataRoute.Robots> {
  const baseUrl = await getUrl();
  const disallowPaths = excludedRoutes.flatMap(getLocalizedPaths);

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/'],
        disallow: disallowPaths,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
