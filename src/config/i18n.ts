import type { DomainsConfig, LocalePrefix } from 'next-intl/routing';
import type { RoutePath } from './routes';

export const locales = ['en-US', 'pt-BR'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale = 'pt-BR' satisfies Locale;

export const localePrefix = {
  mode: 'as-needed',
  prefixes: {
    'en-US': '/en',
    'pt-BR': '/br',
  },
} satisfies LocalePrefix<typeof locales, 'as-needed'>;

export const localeDetection = true;

export const domains = [
  {
    domain: 'marciosobral.com.br',
    defaultLocale: 'pt-BR',
    locales: ['pt-BR', 'en-US'],
  },
] satisfies DomainsConfig<typeof locales>;

export const pathnames = {
  '/': '/',
  '/maintenance': {
    'en-US': '/maintenance',
    'pt-BR': '/manutencao',
  },
  '/cookies': {
    'en-US': '/cookies',
    'pt-BR': '/politica-de-cookies',
  },
} satisfies Record<RoutePath, string | Record<Locale, string>>;

export type LocaleInfo = {
  name: string;
  flag: string;
  htmlLang: string;
  openGraphLocale: string;
  direction: 'ltr' | 'rtl';
};

export const localeInfo: Record<Locale, LocaleInfo> = {
  'en-US': {
    name: 'English',
    flag: '🇺🇸',
    htmlLang: 'en-US',
    openGraphLocale: 'en_US',
    direction: 'ltr',
  },
  'pt-BR': {
    name: 'Português',
    flag: '🇧🇷',
    htmlLang: 'pt-BR',
    openGraphLocale: 'pt_BR',
    direction: 'ltr',
  },
};
