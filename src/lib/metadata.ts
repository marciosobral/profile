import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { siteConfig } from '@/config/site';
import type { Locale } from '@/config/i18n';
import type { Namespace } from '@/config/namespaces';
import type { RawMetadata } from '@/types/metadata';

export async function getRawMetadata(
  namespace: Namespace,
  locale?: string,
): Promise<RawMetadata> {
  const t = await getTranslations({
    namespace,
    locale: locale as Locale,
  });
  return t.raw('metadata') as RawMetadata;
}

export async function generateMetadata(
  namespace: Namespace,
  locale?: string,
): Promise<Metadata> {
  const meta = await getRawMetadata(namespace, locale);

  const metadata: Metadata = {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    authors: [{ name: siteConfig.author }],
    creator: siteConfig.author,
    publisher: siteConfig.author,
  };

  if (meta.openGraph) {
    metadata.openGraph = {
      ...meta.openGraph,
      locale: locale?.replace('-', '_'),
    };
  }

  if (meta.noIndex) {
    metadata.robots = {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
        noarchive: true,
        nosnippet: true,
        noimageindex: true,
      },
    };
  }

  if (meta.noCache) {
    metadata.other = {
      'cache-control': 'no-cache, no-store, must-revalidate',
      pragma: 'no-cache',
      expires: '0',
      'x-robots-tag': 'noindex, nofollow, noarchive, nosnippet',
    };
  }

  return metadata;
}
