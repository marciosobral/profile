'use client';

import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';

import { Page } from '@/components/layout/page';
import { Section } from '@/components/layout/section';
import { Content } from '@/components/layout/content';
import { AnimatedText } from '@/components/ui/animated-text';
import { LinkCard } from '@/components/ui/link-card';
import { CopyCard } from '@/components/ui/copy-card';
import { socialIcons } from '@/components/ui/social-icons';
import {
  getSocialLinks,
  SocialPlatform,
  type ResolvedSocialConfig,
} from '@/config/social';
import { siteConfig } from '@/config/site';
import type { Locale } from '@/config/i18n';

import ProfilePicture from '@assets/images/profile-picture.jpeg';

type CardType = 'link' | 'copy';

type GridItem = {
  platform: SocialPlatform;
  type?: CardType;
  disabled?: boolean;
};

const gridItems: GridItem[] = [
  { platform: SocialPlatform.GitHub },
  { platform: SocialPlatform.LinkedIn },
  { platform: SocialPlatform.X },
  { platform: SocialPlatform.Instagram },
  { platform: SocialPlatform.Discord },
  { platform: SocialPlatform.Email, type: 'copy' },
  { platform: SocialPlatform.Portfolio, disabled: true },
];

const rowSpanByType: Partial<Record<CardType, string>> = {
  copy: 'sm:row-span-2 h-full',
};

export default function Home() {
  const t = useTranslations('home');
  const locale = useLocale() as Locale;
  const socialLinks = new Map<SocialPlatform, ResolvedSocialConfig>(
    getSocialLinks('home', locale).map((s) => [s.name, s]),
  );

  return (
    <Page>
      <Section className='flex-1'>
        <Content className='max-w-xl gap-8 pt-8 pb-16 md:py-16'>
          <AnimatedText order={0} className='w-full'>
            <div className='flex items-center gap-5'>
              <Image
                src={ProfilePicture}
                alt={siteConfig.author}
                width={96}
                height={96}
                className='shrink-0 rounded-full object-cover'
              />
              <div className='flex flex-col gap-2'>
                <div className='bg-foreground h-px w-10' />
                <h1 className='text-2xl font-semibold tracking-tight'>
                  {siteConfig.author}
                </h1>
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

          <div className='grid w-full grid-cols-1 gap-2.5 sm:auto-rows-fr sm:grid-cols-2'>
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
                      disabled={item.disabled}
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
