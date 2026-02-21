import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { siteConfig } from '@/config/site';

export async function generateMetadata(
  namespace: string,
  locale?: string,
): Promise<Metadata> {
  const t = await getTranslations({
    namespace: namespace as any,
    locale: locale as any,
  });
  const meta = (t as any).raw('metadata') as any;

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
