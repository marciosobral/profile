'use client';

import { useTranslations } from 'next-intl';
import {
  WarningCircleIcon,
  ArrowCounterClockwiseIcon,
} from '@phosphor-icons/react';
import { StatusPage } from '@/components/layout/status-page';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('common');

  return (
    <StatusPage
      icon={<WarningCircleIcon className='h-12 w-12' weight='thin' />}
      title={t('error.title')}
      subtitle={t('error.subtitle')}
      action={
        <button
          onClick={reset}
          className='border-foreground/8 hover:border-foreground/20 hover:bg-foreground/3 inline-flex items-center gap-2.5 rounded-xl border px-6 py-3 text-sm transition-all'
        >
          <ArrowCounterClockwiseIcon
            className='text-foreground/40 h-4 w-4'
            weight='light'
          />
          <span className='text-foreground/60'>{t('error.action')}</span>
        </button>
      }
    />
  );
}
