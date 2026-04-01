import type { Locale } from '@/config/i18n';

export enum SocialPlatform {
  GitHub = 'GitHub',
  LinkedIn = 'LinkedIn',
  Email = 'E-mail',
}

export type SocialConfigProps = {
  name: SocialPlatform;
  url: string | Record<Locale, string>;
  visibility?: {
    jsonLd?: boolean;
    contactForm?: boolean;
    maintenance?: boolean;
    footer?: boolean;
  };
};

export type ResolvedSocialConfig = Omit<SocialConfigProps, 'url'> & {
  url: string;
};

export const socialConfig: SocialConfigProps[] = [
  {
    name: SocialPlatform.GitHub,
    url: 'https://github.com/marciosobral',
    visibility: {
      jsonLd: true,
      contactForm: true,
      maintenance: false,
      footer: true,
    },
  },
  {
    name: SocialPlatform.LinkedIn,
    url: 'https://linkedin.com/in/marciosobral',
    visibility: {
      jsonLd: true,
      contactForm: true,
      maintenance: true,
      footer: true,
    },
  },
  {
    name: SocialPlatform.Email,
    url: {
      'en-US': 'mailto:hello@marciosobral.net',
      'pt-BR': 'mailto:contato@marciosobral.com.br',
    },
    visibility: {
      jsonLd: false,
      contactForm: true,
      maintenance: true,
      footer: true,
    },
  },
];

export type SocialConfig = SocialConfigProps;

type VisibilityContext = keyof NonNullable<SocialConfigProps['visibility']>;

function resolveUrl(
  url: string | Record<Locale, string>,
  locale: Locale,
): string {
  return typeof url === 'string' ? url : url[locale];
}

export function getSocialLinks(
  context: VisibilityContext,
  locale: Locale,
): ResolvedSocialConfig[] {
  return socialConfig
    .filter((s) => s.visibility?.[context])
    .map((s) => ({ ...s, url: resolveUrl(s.url, locale) }));
}

export function getEmailUrl(locale: Locale): string {
  const email = socialConfig.find((s) => s.name === SocialPlatform.Email);
  return email ? resolveUrl(email.url, locale) : '';
}
