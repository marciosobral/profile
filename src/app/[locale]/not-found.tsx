import { useTranslations } from 'next-intl';
import { MagnifyingGlassIcon, ArrowLeftIcon } from '@phosphor-icons/react/ssr';
import { Link } from '@/i18n/navigation';
import { StatusPage } from '@/components/layout/status-page';

export default function NotFound() {
  const t = useTranslations('common');

  return (
    <StatusPage
      icon={<MagnifyingGlassIcon className='h-12 w-12' weight='thin' />}
      title={t('notFound.title')}
      subtitle={t('notFound.subtitle')}
      action={
        <Link
          href='/'
          className='border-foreground/8 hover:border-foreground/20 hover:bg-foreground/3 inline-flex items-center gap-2.5 rounded-xl border px-6 py-3 text-sm transition-all'
        >
          <ArrowLeftIcon
            className='text-foreground/40 h-4 w-4'
            weight='light'
          />
          <span className='text-foreground/60'>{t('notFound.action')}</span>
        </Link>
      }
    />
  );
}
