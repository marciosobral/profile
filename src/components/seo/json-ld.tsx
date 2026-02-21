import { getTranslations } from 'next-intl/server';

import { siteConfig } from '@/config/site';
import { getUrl } from '@/utils/host';

interface JsonLdProps {
  locale: string;
}

export async function JsonLd({ locale }: JsonLdProps) {
  const t = await getTranslations({
    namespace: 'common' as any,
    locale: locale as any,
  });

  const meta = (t as any).raw('metadata') as any;
  const jsonLdData = meta.jsonLd;

  const url = await getUrl();

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.author,
    jobTitle: jsonLdData.jobTitle,
    description: jsonLdData.description,
    url,
    knowsAbout: jsonLdData.knowsAbout,
    sameAs: siteConfig.socialLinks,
  };

  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: siteConfig.author,
    url,
    inLanguage: locale,
  };

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
    </>
  );
}
