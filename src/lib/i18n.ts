import { getDomainDefaultLocale, localeInfo, locales } from '@/config/i18n';
import type { Locale } from '@/config/i18n';

const availableLocales = locales;

export function isValidLocale(locale: string): locale is Locale {
  return availableLocales.includes(locale as Locale);
}

export function normalizeLocale(locale?: string, host?: string): Locale {
  const valid = isValidLocale(locale ?? '');
  const resolved = valid ? (locale as Locale) : getDomainDefaultLocale(host);
  console.log('[i18n:normalize] input=%s valid=%s host=%s resolved=%s', locale ?? 'undefined', valid, host ?? 'undefined', resolved);
  return resolved;
}

export const validateLocale = normalizeLocale;

export function getAvailableLocales(): readonly Locale[] {
  return availableLocales;
}

export function getDefaultLocale(host?: string): Locale {
  return getDomainDefaultLocale(host);
}

export function getLocaleInfo(locale: Locale) {
  return localeInfo[locale];
}

export const localeConfig = localeInfo;
