import { getTranslations } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import Link from 'next/link';
import { Montserrat, Playfair_Display } from 'next/font/google';
import { MagnifyingGlassIcon, ArrowRightIcon } from '@phosphor-icons/react/ssr';

import { StatusPage } from '@/components/layout/status-page';
import { Html } from '@/components/layout/html';
import { Body } from '@/components/layout/body';
import { Main } from '@/components/layout/main';
import { StateProvider } from '@/providers/state';
import { AnimationProvider } from '@/providers/animation';
import { ThemeProvider } from '@/providers/theme';
import { Footer } from '@/components/layout/footer';
import { SettingsPanel } from '@/components/theme/settings-panel';

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
});

export default async function RootNotFound() {
  const t = await getTranslations('common');

  return (
    <Html
      lang='en'
      dir='ltr'
      className={`${montserrat.className} ${playfairDisplay.variable}`}
    >
      <Body>
        <NextIntlClientProvider>
          <StateProvider>
            <AnimationProvider>
              <ThemeProvider>
                <Main>
                  <StatusPage
                    icon={
                      <MagnifyingGlassIcon
                        className='h-12 w-12'
                        weight='thin'
                      />
                    }
                    title={t('notFound.title')}
                    subtitle={t('notFound.subtitle')}
                    action={
                      <Link
                        href='/'
                        className='inline-flex items-center gap-2.5 rounded-xl border border-(--border-soft) px-6 py-3 text-sm transition-all hover:border-(--line-soft) hover:bg-(--surface-soft)'
                      >
                        <span className='text-(--text-muted)'>
                          {t('notFound.action')}
                        </span>
                        <ArrowRightIcon
                          className='h-4 w-4 text-(--text-soft)'
                          weight='light'
                        />
                      </Link>
                    }
                  />
                </Main>
                <Footer />
                <SettingsPanel />
              </ThemeProvider>
            </AnimationProvider>
          </StateProvider>
        </NextIntlClientProvider>
      </Body>
    </Html>
  );
}
