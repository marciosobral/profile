import { useTranslations } from 'next-intl';
import { getEmailUrl } from '@/config/social';

import { Page } from '@/components/layout/page';
import { Section } from '@/components/layout/section';
import { Content } from '@/components/layout/content';
import { AnimatedGroup } from '@/components/ui/animated-group';

export default function CookiePolicy() {
  const t = useTranslations('cookies');

  return (
    <Page>
      <Section>
        <Content className='items-start'>
          <AnimatedGroup>
            <p className='mb-4 text-xs font-medium tracking-[0.3em] text-(--text-muted) uppercase'>
              {t('lastUpdated')}
            </p>

            <h1 className='text-foreground mb-6 text-4xl leading-[1.1] font-semibold tracking-tight sm:text-5xl'>
              {t('title')}
            </h1>

            <div className='bg-foreground mb-8 h-px w-16' />

            <p className='mb-12 text-base leading-relaxed text-(--text-soft) sm:text-lg'>
              {t('intro')}
            </p>
          </AnimatedGroup>

          <div className='space-y-10'>
            <div>
              <h2 className='text-foreground mb-3 text-lg font-semibold'>
                {t('whatAreCookies.title')}
              </h2>
              <p className='text-base leading-relaxed text-(--text-soft)'>
                {t('whatAreCookies.description')}
              </p>
            </div>

            <div>
              <h2 className='text-foreground mb-3 text-lg font-semibold'>
                {t('cookiesWeUse.title')}
              </h2>

              <div className='space-y-6'>
                <div>
                  <h3 className='text-foreground mb-2 text-base font-medium'>
                    {t('cookiesWeUse.functional.title')}
                  </h3>
                  <p className='mb-3 text-base leading-relaxed text-(--text-soft)'>
                    {t('cookiesWeUse.functional.description')}
                  </p>
                  <ul className='list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-(--text-muted)'>
                    <li>{t('cookiesWeUse.functional.theme')}</li>
                    <li>{t('cookiesWeUse.functional.mode')}</li>
                    <li>{t('cookiesWeUse.functional.locale')}</li>
                  </ul>
                </div>

                <div>
                  <h3 className='text-foreground mb-2 text-base font-medium'>
                    {t('cookiesWeUse.analytics.title')}
                  </h3>
                  <p className='text-base leading-relaxed text-(--text-soft)'>
                    {t('cookiesWeUse.analytics.description')}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className='text-foreground mb-3 text-lg font-semibold'>
                {t('yourChoices.title')}
              </h2>
              <p className='text-base leading-relaxed text-(--text-soft)'>
                {t('yourChoices.description')}
              </p>
            </div>

            <div>
              <h2 className='text-foreground mb-3 text-lg font-semibold'>
                {t('contact.title')}
              </h2>
              <p className='text-base leading-relaxed text-(--text-soft)'>
                {t('contact.description', {
                  email: getEmailUrl().replace('mailto:', ''),
                })}
              </p>
            </div>
          </div>
        </Content>
      </Section>
    </Page>
  );
}
