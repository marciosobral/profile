'use client';

import Image from 'next/image';
import { ArrowLeftIcon } from '@phosphor-icons/react/ssr';
import { useTranslations } from 'next-intl';

import { Link } from '@/i18n/navigation';
import { siteConfig } from '@/config/site';
import { useTheme } from '@/hooks/use-theme';

import LogoSvg from '@assets/logos/last-name.svg';

interface PageHeaderProps {
  showBack?: boolean;
}

export function Header({ showBack = true }: PageHeaderProps) {
  const { mode } = useTheme();
  const t = useTranslations('common');

  return (
    <header className='relative mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8'>
      <div className='flex items-center justify-between'>
        <Image
          src={LogoSvg}
          alt={siteConfig.author}
          className={`h-6 w-auto ${mode === 'dark' ? 'invert' : ''}`}
        />
        {showBack && (
          <Link
            href='/'
            className='hover:text-foreground flex items-center gap-1.5 text-sm text-(--text-soft) transition-colors'
          >
            <ArrowLeftIcon size={16} weight='light' />
            {t('footer.home')}
          </Link>
        )}
      </div>
    </header>
  );
}
