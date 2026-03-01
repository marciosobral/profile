import type { MetadataRoute } from 'next';
import { getTranslations } from 'next-intl/server';

import { siteConfig } from '@/config/site';
import { getLocaleFromCookie } from '@/lib/i18n';

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const locale = await getLocaleFromCookie();
  const t = await getTranslations({ locale, namespace: 'common' });

  return {
    name: t('metadata.title.default'),
    short_name: siteConfig.author,
    description: t('metadata.description'),
    start_url: '/',
    scope: '/',
    lang: locale,
    theme_color: siteConfig.color,
    background_color: siteConfig.color,
    display: 'standalone',
    display_override: ['standalone', 'browser'],
    orientation: 'any',
    categories: ['personalization', 'social'],
    icons: [
      {
        src: '/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  };
}
