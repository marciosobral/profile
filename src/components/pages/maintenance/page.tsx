import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { WrenchIcon } from '@phosphor-icons/react/ssr';

import { StatusPage } from '@/components/layout/status-page';
import { socialIcons } from '@/components/ui/social-icons';
import { getSocialLinks } from '@/config/social';

export default function Maintenance() {
  const t = useTranslations();

  return (
    <StatusPage
      icon={<WrenchIcon className='h-12 w-12' weight='thin' />}
      title={t('maintenance.title')}
      subtitle={t('maintenance.subtitle')}
    >
      <div className='mb-10 flex w-16 items-center gap-2'>
        <div className='bg-foreground h-px flex-1' />
      </div>

      <p className='mb-5 text-xs font-medium tracking-[0.2em] text-(--text-muted) uppercase'>
        {t('maintenance.contact')}
      </p>

      <div className='flex justify-center gap-4'>
        {getSocialLinks('maintenance').map((social) => {
          const IconComponent = socialIcons[social.name];
          const isEmail = social.url.startsWith('mailto:');
          return (
            <Link
              key={social.name}
              href={social.url}
              className='flex items-center gap-2.5 rounded-xl border border-(--border-soft) px-5 py-3 text-sm transition-all hover:border-(--line-soft) hover:bg-(--surface-soft)'
              {...(!isEmail && {
                target: '_blank',
                rel: 'noopener noreferrer',
              })}
            >
              <IconComponent
                className='h-4 w-4 text-(--text-soft)'
                weight='light'
              />
              <span className='text-(--text-muted)'>{social.name}</span>
            </Link>
          );
        })}
      </div>
    </StatusPage>
  );
}
