'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';

import { Page } from '@/components/layout/page';
import { Section } from '@/components/layout/section';
import { Content } from '@/components/layout/content';
import { AnimatedText } from '@/components/ui/animated-text';
import { LinkCard } from '@/components/ui/link-card';
import { CopyCard } from '@/components/ui/copy-card';
import { useTheme } from '@/hooks/use-theme';
import { socialIcons } from '@/components/ui/social-icons';
import {
  getSocialLinks,
  SocialPlatform,
  type ResolvedSocialConfig,
} from '@/config/social';
import { siteConfig } from '@/config/site';
import type { Locale } from '@/config/i18n';

import FullNameSvg from '@assets/logos/full-name.svg';
import ProfilePicture from '@assets/images/profile-picture.jpeg';

type CardType = 'link' | 'copy';

type GridItem = {
  platform: SocialPlatform;
  type?: CardType;
};

const gridItems: GridItem[] = [
  { platform: SocialPlatform.GitHub },
  { platform: SocialPlatform.LinkedIn },
  { platform: SocialPlatform.X },
  { platform: SocialPlatform.Instagram },
  { platform: SocialPlatform.Discord },
  { platform: SocialPlatform.Email, type: 'copy' },
];

const rowSpanByType: Partial<Record<CardType, string>> = {
  copy: 'sm:row-span-2 h-full',
};

export default function Home() {
  const t = useTranslations('home');
  const locale = useLocale() as Locale;
  const { mode } = useTheme();

  const socialLinks = new Map<SocialPlatform, ResolvedSocialConfig>(
    getSocialLinks('home', locale).map((s) => [s.name, s]),
  );

  return (
    <Page>
      <Section>
        <Content className='min-h-screen max-w-xl justify-start gap-8 py-16'>
          <AnimatedText order={0} className='w-full'>
            <div className='flex items-center gap-5'>
              <Image
                src={ProfilePicture}
                alt={siteConfig.author}
                width={96}
                height={96}
                className='shrink-0 rounded-full object-cover'
              />
              <div className='flex flex-col gap-1.5'>
                <Image
                  src={FullNameSvg}
                  alt={siteConfig.author}
                  className={`h-7 w-auto ${mode === 'dark' ? 'invert' : ''}`}
                />
                <p className='text-sm text-(--text-soft)'>{t('greeting')}</p>
              </div>
            </div>
          </AnimatedText>

          <AnimatedText order={1} className='w-full'>
            <p className='text-sm leading-relaxed text-(--text-soft)'>
              {t.rich('description', {
                project: (chunks) => (
                  <a
                    href={t('project.link')}
                    // target='_blank'
                    rel='noopener noreferrer'
                    className='hover:text-foreground hover:decoration-foreground underline decoration-(--border-soft) underline-offset-2 transition-colors'
                  >
                    {chunks}
                  </a>
                ),
              })}
            </p>
          </AnimatedText>

          <div className='grid w-full grid-cols-1 gap-2.5 sm:grid-cols-2'>
            {gridItems.map((item, i) => {
              const social = socialLinks.get(item.platform);
              if (!social) return null;

              const icon = socialIcons[item.platform];
              const label = item.platform as string;

              return (
                <AnimatedText
                  key={item.platform}
                  order={2 + i}
                  className={item.type ? rowSpanByType[item.type] : undefined}
                >
                  {item.type === 'copy' ? (
                    <CopyCard
                      icon={icon}
                      label={label}
                      handle={social.handle}
                    />
                  ) : (
                    <LinkCard
                      href={social.url}
                      icon={icon}
                      label={label}
                      handle={social.handle}
                    />
                  )}
                </AnimatedText>
              );
            })}
          </div>
        </Content>
      </Section>
    </Page>
  );
}
