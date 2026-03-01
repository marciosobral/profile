import { siteConfig } from '@/config/site';
import { getUrl } from '@/utils/host';
import type { Locale } from '@/config/i18n';
import { getRawMetadata } from '@/lib/metadata';

interface JsonLdProps {
  locale: Locale;
}

export async function JsonLd({ locale }: JsonLdProps) {
  const meta = await getRawMetadata('common', locale);
  const jsonLdData = meta.jsonLd;

  const url = await getUrl();

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: siteConfig.author,
    jobTitle: jsonLdData?.jobTitle,
    description: jsonLdData?.description,
    url,
    knowsAbout: jsonLdData?.knowsAbout,
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
