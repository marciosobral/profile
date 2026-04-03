'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useTransition } from 'react';
import { GlobeIcon } from '@phosphor-icons/react/ssr';

import { Link as NavLink, usePathname, useRouter } from '@/i18n/navigation';
import { type Locale } from '@/config/i18n';
import { getAvailableLocales, getLocaleInfo } from '@/lib/i18n';
import { useTheme } from '@/hooks/use-theme';
import { flagLoaderSkip } from '@/lib/loader-state';
import { Section } from '@/components/layout/section';
import { Content } from '@/components/layout/content';

export function Footer() {
  const t = useTranslations('common');
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const availableLocales = getAvailableLocales();

  const handleLocaleSwitch = (newLocale: Locale) => {
    if (newLocale === locale || isPending) return;
    flagLoaderSkip();
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  return (
    <footer className='sticky bottom-0 bg-(--footer-color)'>
      <div className='h-px w-full bg-(--line-soft)' />

      <Section>
        <Content className='flex-col justify-between gap-3 py-4 sm:flex-row sm:gap-6 sm:py-6'>
          <p className='text-center text-sm text-(--text-faint)'>
            &copy; 2026 &middot; {''}
            {t('footer.rights')} {''}
            &middot; {''}
            <NavLink
              href='/cookies'
              className='hover:text-foreground text-sm text-nowrap text-(--text-soft) transition-colors'
            >
              {t('footer.cookies')}
            </NavLink>
          </p>

          <div className='flex items-center gap-6'>
            <GlobeIcon size={18} className='text-(--text-faint)' />
            {availableLocales.map((loc) => {
              const info = getLocaleInfo(loc);
              const isActive = loc === locale;
              return (
                <button
                  key={loc}
                  onClick={() => handleLocaleSwitch(loc)}
                  disabled={isPending}
                  className={`text-sm transition-colors disabled:opacity-50 ${
                    isActive
                      ? 'text-foreground underline underline-offset-2'
                      : 'hover:text-foreground text-(--text-soft)'
                  }`}
                >
                  {info.name}
                </button>
              );
            })}
          </div>
        </Content>
      </Section>
    </footer>
  );
}
