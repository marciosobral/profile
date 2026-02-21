'use client';

import { useLocale } from 'next-intl';
import { useState, useTransition } from 'react';

import { usePathname, useRouter } from '@/i18n/navigation';
import { getAvailableLocales, getLocaleInfo, Locale } from '@/lib/i18n';

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale() as Locale;

  const [isPending, startTransition] = useTransition();
  const [pendingLocale, setPendingLocale] = useState<Locale | null>(null);

  const availableLocales = getAvailableLocales();

  const handleLocaleSwitch = (newLocale: Locale) => {
    if (newLocale === currentLocale || isPending) return;

    setPendingLocale(newLocale);

    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });

    setTimeout(() => setPendingLocale(null), 300);
  };

  return (
    <div className='border-foreground/20 bg-foreground/5 inline-flex rounded-lg border p-1'>
      {availableLocales.map((locale) => {
        const localeData = getLocaleInfo(locale);
        const isActive = currentLocale === locale;
        const isLoading = isPending && pendingLocale === locale;

        return (
          <button
            key={locale}
            onClick={() => handleLocaleSwitch(locale)}
            disabled={isPending}
            className={`relative flex cursor-pointer items-center justify-center gap-2 rounded-md px-4 py-2 text-2xl font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${
              isActive
                ? 'bg-foreground text-background shadow-sm'
                : 'text-foreground hover:bg-foreground/10 active:bg-foreground/20'
            } ${isLoading ? 'animate-pulse' : ''} `}
            aria-pressed={isActive}
          >
            {localeData.flag}
            {isLoading && (
              <div className='absolute inset-0 flex items-center justify-center rounded-md bg-inherit'>
                <div className='h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent' />
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
