import type { RoutePath } from './routes';

export const locales = ['en-US', 'pt-BR'] as const;

export const defaultLocale = 'pt-BR' as const;

export const localePrefix = 'as-needed' as const;

export const localeDetection = true;

export const domains = [
  {
    domain: 'marciosobral.com.br',
    defaultLocale: 'pt-BR',
    locales: ['pt-BR', 'en-US'],
  },
] as const;

type LocalizedPathname = string | Record<(typeof locales)[number], string>;

export const pathnames: Record<RoutePath, LocalizedPathname> = {
  '/': '/',
  '/maintenance': {
    'en-US': '/maintenance',
    'pt-BR': '/manutencao',
  },
};

export const localeInfo = {
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
} as const;
