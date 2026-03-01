import { useTranslations } from 'next-intl';
import {
  WrenchIcon,
  EnvelopeSimpleIcon,
  LinkedinLogoIcon,
} from '@phosphor-icons/react/ssr';
import { StatusPage } from '@/components/layout/status-page';
import { siteConfig } from '@/config/site';

export default function Maintenance() {
  const t = useTranslations();

  return (
    <StatusPage
      icon={<WrenchIcon className='h-12 w-12' weight='thin' />}
      title={t('maintenance.title')}
      subtitle={t('maintenance.subtitle')}
      // footer={t('common.footer.rights')}
    >
      <div className='mx-auto mb-10 flex w-16 items-center gap-2'>
        <div className='h-px flex-1 bg-(--line-soft)' />
      </div>

      <p className='mb-5 text-xs font-medium tracking-[0.2em] text-(--text-muted) uppercase'>
        {t('maintenance.contact')}
      </p>

      <div className='flex justify-center gap-4'>
        <a
          href={`mailto:${siteConfig.email}`}
          className='flex items-center gap-2.5 rounded-xl border border-(--border-soft) px-5 py-3 text-sm transition-all hover:border-(--line-soft) hover:bg-(--surface-soft)'
        >
          <EnvelopeSimpleIcon
            className='h-4 w-4 text-(--text-soft)'
            weight='light'
          />
          <span className='text-(--text-muted)'>Email</span>
        </a>
        <a
          href='https://linkedin.com/in/marciosobral'
          className='flex items-center gap-2.5 rounded-xl border border-(--border-soft) px-5 py-3 text-sm transition-all hover:border-(--line-soft) hover:bg-(--surface-soft)'
          target='_blank'
          rel='noopener noreferrer'
        >
          <LinkedinLogoIcon
            className='h-4 w-4 text-(--text-soft)'
            weight='light'
          />
          <span className='text-(--text-muted)'>LinkedIn</span>
        </a>
      </div>
    </StatusPage>
  );
}
