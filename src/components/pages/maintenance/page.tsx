import { useTranslations } from 'next-intl';
import {
  WrenchIcon,
  EnvelopeSimpleIcon,
  LinkedinLogoIcon,
} from '@phosphor-icons/react/ssr';
import { StatusPage } from '@/components/layout/status-page';

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
        <div className='bg-foreground/10 h-px flex-1' />
      </div>

      <p className='text-foreground/30 mb-5 text-xs font-medium tracking-[0.2em] uppercase'>
        {t('maintenance.contact')}
      </p>

      <div className='flex justify-center gap-4'>
        <a
          href='mailto:contato@marciosobral.com.br'
          className='border-foreground/8 hover:border-foreground/20 hover:bg-foreground/3 flex items-center gap-2.5 rounded-xl border px-5 py-3 text-sm transition-all'
        >
          <EnvelopeSimpleIcon
            className='text-foreground/40 h-4 w-4'
            weight='light'
          />
          <span className='text-foreground/60'>Email</span>
        </a>
        <a
          href='https://linkedin.com/in/marciosobral'
          className='border-foreground/8 hover:border-foreground/20 hover:bg-foreground/3 flex items-center gap-2.5 rounded-xl border px-5 py-3 text-sm transition-all'
          target='_blank'
          rel='noopener noreferrer'
        >
          <LinkedinLogoIcon
            className='text-foreground/40 h-4 w-4'
            weight='light'
          />
          <span className='text-foreground/60'>LinkedIn</span>
        </a>
      </div>
    </StatusPage>
  );
}
