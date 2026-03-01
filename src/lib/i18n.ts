import { defaultLocale, localeInfo, locales } from '@/config/i18n';
import type { Locale } from '@/config/i18n';

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

export async function getLocaleFromCookie(): Promise<Locale> {
  const { cookies } = await import('next/headers');
  const cookieStore = await cookies();
  return normalizeLocale(cookieStore.get('NEXT_LOCALE')?.value);
}

export const localeConfig = localeInfo;
