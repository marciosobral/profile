'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';
import { siteConfig } from '@/config/site';
import { getEmailUrl } from '@/config/social';
import type { Locale } from '@/config/i18n';

import LogoSvg from '@assets/logos/last-name.svg';

export function Header() {
  const t = useTranslations('common');
  const locale = useLocale() as Locale;
  const emailUrl = getEmailUrl(locale);

  return (
    <header className='relative mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8'>
      <div className='flex items-center justify-between'>
        <Link href='/'>
          <Image
            src={LogoSvg}
            alt={siteConfig.author}
            priority
            className='header-logo h-6 w-auto'
          />
        </Link>
        <nav className='flex items-center gap-4'>
          <a
            href={emailUrl}
            className='bg-foreground text-background rounded-full px-4 py-2 text-sm font-medium transition-opacity hover:opacity-80'
          >
            {t('header.contact')}
          </a>
        </nav>
      </div>
    </header>
  );
}
