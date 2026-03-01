import type { MetadataRoute } from 'next';

import { locales, defaultLocale, localePrefix, pathnames } from '@/config/i18n';
import { routes, excludedRoutes } from '@/config/routes';
import { getUrl } from '@/utils/host';
import type { RoutePath } from '@/config/routes';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = await getUrl();
  const entries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    const routePath = `/${route}` as RoutePath;

    if (excludedRoutes.includes(routePath)) continue;

    const localized = pathnames[routePath];

    for (const locale of locales) {
      const path =
        typeof localized === 'string' ? localized : localized[locale];
      const prefix = localePrefix.prefixes[locale];
      const isDefault = locale === defaultLocale;
      const url = isDefault
        ? `${baseUrl}${path}`
        : `${baseUrl}${prefix}${path}`;

      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: route === '' ? 1 : 0.8,
      });
    }
  }

  return entries;
}
