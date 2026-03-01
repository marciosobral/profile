import { getTranslations } from 'next-intl/server';
import { MagnifyingGlassIcon, ArrowLeftIcon } from '@phosphor-icons/react/ssr';
import Link from 'next/link';
import { StatusPage } from '@/components/layout/status-page';

export default async function RootNotFound() {
  const t = await getTranslations('common');

  return (
    <html>
      <body>
        <StatusPage
          icon={<MagnifyingGlassIcon className='h-12 w-12' weight='thin' />}
          title={t('notFound.title')}
          subtitle={t('notFound.subtitle')}
          action={
            <Link
              href='/'
              className='inline-flex items-center gap-2.5 rounded-xl border border-(--border-soft) px-6 py-3 text-sm transition-all hover:border-(--line-soft) hover:bg-(--surface-soft)'
            >
              <ArrowLeftIcon
                className='h-4 w-4 text-(--text-soft)'
                weight='light'
              />
              <span className='text-(--text-muted)'>
                {t('notFound.action')}
              </span>
            </Link>
          }
        />
      </body>
    </html>
  );
}
