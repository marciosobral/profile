import { defaultLocale, localeInfo, locales } from '@/config/i18n';

export type Locale = (typeof locales)[number];

const availableLocales = locales;

export function isValidLocale(locale: string): locale is Locale {
  return availableLocales.includes(locale as Locale);
}

export function normalizeLocale(locale?: string): Locale {
  return isValidLocale(locale ?? '') ? (locale as Locale) : defaultLocale;
}

export const validateLocale = normalizeLocale;

export function getAvailableLocales(): readonly Locale[] {
  return availableLocales;
}

export function getDefaultLocale(): Locale {
  return defaultLocale;
}

export function getLocaleInfo(locale: Locale) {
  return localeInfo[locale];
}

export const localeConfig = localeInfo;
