import type { Locale } from '@/config/i18n';

export enum SocialPlatform {
  GitHub = 'GitHub',
  LinkedIn = 'LinkedIn',
  Email = 'E-mail',
  X = 'X',
  Instagram = 'Instagram',
  Discord = 'Discord',
  WhatsApp = 'WhatsApp',
  Resume = 'Resume',
  Portfolio = 'Portfolio',
}

export type SocialConfigProps = {
  name: SocialPlatform;
  url: string | Record<Locale, string>;
  handle: string | Record<Locale, string>;
  visibility?: {
    jsonLd?: boolean;
    contactForm?: boolean;
    maintenance?: boolean;
    footer?: boolean;
    home?: boolean;
  };
};

export type ResolvedSocialConfig = Omit<SocialConfigProps, 'url' | 'handle'> & {
  url: string;
  handle: string;
};

export const socialConfig: SocialConfigProps[] = [
  {
    name: SocialPlatform.GitHub,
    url: 'https://github.com/marciosobral',
    handle: '@marciosobral',
    visibility: {
      jsonLd: true,
      home: true,
    },
  },
  {
    name: SocialPlatform.LinkedIn,
    url: 'https://linkedin.com/in/marciosobral',
    handle: '@marciosobral',
    visibility: {
      jsonLd: true,
      contactForm: true,
      maintenance: true,
      home: true,
    },
  },
  {
    name: SocialPlatform.Email,
    url: {
      'en-US': 'mailto:hello@marciosobral.net',
      'pt-BR': 'mailto:contato@marciosobral.com.br',
    },
    handle: {
      'en-US': 'hello@marciosobral.net',
      'pt-BR': 'contato@marciosobral.com.br',
    },
    visibility: {
      home: true,
    },
  },
  {
    name: SocialPlatform.X,
    url: 'https://x.com/marciosobral',
    handle: '@marciosobral',
    visibility: {
      jsonLd: true,
      home: true,
    },
  },
  {
    name: SocialPlatform.Instagram,
    url: 'https://instagram.com/marciosobral_',
    handle: '@marciosobral_',
    visibility: {
      jsonLd: true,
      home: true,
    },
  },
  {
    name: SocialPlatform.Discord,
    url: 'https://discord.com/users/marciosobral',
    handle: '@marciosobral',
    visibility: {
      contactForm: true,
      maintenance: true,
      home: true,
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

function resolveHandle(
  handle: string | Record<Locale, string>,
  locale: Locale,
): string {
  return typeof handle === 'string' ? handle : handle[locale];
}

export function getSocialLinks(
  context: VisibilityContext,
  locale: Locale,
): ResolvedSocialConfig[] {
  return socialConfig
    .filter((s) => s.visibility?.[context])
    .map((s) => ({
      ...s,
      url: resolveUrl(s.url, locale),
      handle: resolveHandle(s.handle, locale),
    }));
}

export function getEmailUrl(locale: Locale): string {
  const email = socialConfig.find((s) => s.name === SocialPlatform.Email);
  return email ? resolveUrl(email.url, locale) : '';
}
