import { useTranslations } from 'next-intl';

import { Page } from '@/components/layout/page';
import { Section } from '@/components/layout/section';
import { Content } from '@/components/layout/content';
import { AnimatedGroup } from '@/components/ui/animated-group';

export default function Home() {
  const t = useTranslations('home');

  return (
    <Page>
      <Section>
        <Content className='min-h-screen text-center'>
          <AnimatedGroup>
            <p className='mb-4 text-xs font-medium tracking-[0.3em] text-(--text-muted) uppercase'>
              {t('greeting')}
            </p>

            <h1 className='text-foreground mb-6 text-4xl leading-[1.1] font-semibold tracking-tight sm:text-5xl lg:text-7xl'>
              {t('title')}
            </h1>

            <div className='bg-foreground mb-8 h-px w-16' />

            <p className='max-w-xl text-base leading-relaxed text-(--text-soft) sm:text-lg'>
              {t('description')}
            </p>
          </AnimatedGroup>
        </Content>
      </Section>
    </Page>
  );
}
