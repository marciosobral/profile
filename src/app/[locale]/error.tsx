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
          className='inline-flex items-center gap-2.5 rounded-xl border border-(--border-soft) px-6 py-3 text-sm transition-all hover:border-(--line-soft) hover:bg-(--surface-soft)'
        >
          <ArrowCounterClockwiseIcon
            className='h-4 w-4 text-(--text-soft)'
            weight='light'
          />
          <span className='text-(--text-muted)'>{t('error.action')}</span>
        </button>
      }
    />
  );
}
