'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { useTransition } from 'react';
import { GlobeIcon } from '@phosphor-icons/react/ssr';

import { Link as NavLink, usePathname, useRouter } from '@/i18n/navigation';
import { siteConfig } from '@/config/site';
import { getSocialLinks } from '@/config/social';
import { socialIcons } from '@/components/ui/social-icons';
import { type Locale } from '@/config/i18n';
import { getAvailableLocales, getLocaleInfo } from '@/lib/i18n';
import { useTheme } from '@/hooks/use-theme';
import { Section } from '@/components/layout/section';
import { Content } from '@/components/layout/content';

import LogoSvg from '@assets/logos/last-name.svg';

export function Footer() {
  const t = useTranslations('common');
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const { mode } = useTheme();
  const [isPending, startTransition] = useTransition();

  const availableLocales = getAvailableLocales();

  const handleLocaleSwitch = (newLocale: Locale) => {
    if (newLocale === locale || isPending) return;
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  return (
    <footer className='sticky bottom-0 bg-(--footer-color)'>
      <Section>
        <Content className='justify-between gap-3 py-3 sm:flex-row sm:gap-6'>
          <div className='flex flex-col items-center gap-4 py-6 sm:items-start'>
            <Image
              src={LogoSvg}
              alt={siteConfig.author}
              className={`h-8 w-auto ${mode === 'dark' ? 'invert' : ''}`}
            />
            <div className='flex items-center gap-2'>
              {getSocialLinks('footer', locale).map((social) => {
                const IconComponent = socialIcons[social.name];
                return (
                  <Link
                    key={social.name}
                    href={social.url}
                    target='_blank'
                    rel='noopener noreferrer'
                    aria-label={social.name}
                    className='hover:text-foreground text-(--text-soft) transition-colors'
                  >
                    <IconComponent size={22} weight='fill' />
                  </Link>
                );
              })}
            </div>
          </div>

          <div className='flex flex-col items-center gap-3 pt-0 pb-6 sm:flex-row sm:gap-6 sm:pt-6'>
            <NavLink
              href='/'
              className='hover:text-foreground text-sm text-(--text-soft) transition-colors'
            >
              {t('footer.home')}
            </NavLink>
            <NavLink
              href='/cookies'
              className='hover:text-foreground text-sm text-(--text-soft) transition-colors'
            >
              {t('footer.cookies')}
            </NavLink>
            {/* <a
              href={getEmailUrl(locale)}
              className='rounded-full border border-(--border-soft) px-4 py-1.5 text-sm transition-colors hover:bg-(--surface-soft)'
            >
              {t('footer.contact')}
            </a> */}
          </div>
        </Content>
      </Section>

      <div className='h-px w-full bg-(--line-soft)' />

      <Section>
        <Content className='flex-col-reverse justify-between gap-3 py-4 sm:flex-row sm:gap-6 sm:py-6'>
          <p className='text-sm text-(--text-faint)'>
            &copy; 2026 &middot; {t('footer.rights')}
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
