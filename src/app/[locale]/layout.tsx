import type { Metadata } from 'next';
import { Montserrat, Playfair_Display } from 'next/font/google';
import { hasLocale } from 'next-intl';
import { NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

import { generateMetadata as generateMeta } from '@/lib/metadata';
import { routing } from '@/i18n/routing';
import { getLocaleInfo } from '@/lib/i18n';
import { Body } from '@/components/layout/body';
import { Html } from '@/components/layout/html';
import { Main } from '@/components/layout/main';
import { StateProvider } from '@/providers/state';
import { ThemeProvider } from '@/providers/theme';
import { AnimationProvider } from '@/providers/animation';
import { SettingsPanel } from '@/components/theme/settings-panel';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { JsonLd } from '@/components/seo/json-ld';
import { PageLoader } from '@/components/layout/page-loader';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateMeta('common', locale);
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const localeInfo = getLocaleInfo(locale);

  return (
    <Html
      lang={localeInfo.htmlLang}
      dir={localeInfo.direction}
      className={`${montserrat.className} ${playfairDisplay.variable}`}
    >
      <Body>
        <PageLoader />
        <JsonLd locale={locale} />
        <NextIntlClientProvider>
          <StateProvider>
            <AnimationProvider>
              <ThemeProvider>
                <Header />
                <Main>{children}</Main>
                <Footer />
                <SettingsPanel />
              </ThemeProvider>
            </AnimationProvider>
          </StateProvider>
        </NextIntlClientProvider>
        <Analytics />
        <SpeedInsights />
      </Body>
    </Html>
  );
}
