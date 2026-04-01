'use client';

import type { ReactNode } from 'react';

import { Page } from '@/components/layout/page';
import { Section } from '@/components/layout/section';
import { Content } from '@/components/layout/content';
import { AnimatedGroup } from '@/components/ui/animated-group';
import { Header } from '@/components/layout/header';

interface StatusPageProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  action?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  showBack?: boolean;
}

export function StatusPage({
  icon,
  title,
  subtitle,
  action,
  children,
  footer,
  showBack = true,
}: StatusPageProps) {
  return (
    <Page className='min-h-screen'>
      <Header showBack={showBack} />
      <Section className='flex-1'>
        <Content className='max-w-lg pt-0 text-center'>
          <AnimatedGroup>
            <div className='mb-8 flex justify-center text-(--text-faint)'>
              {icon}
            </div>

            <h1 className='text-foreground mb-3 text-2xl font-semibold tracking-tight sm:text-4xl'>
              {title}
            </h1>

            <p className='mb-10 text-sm leading-relaxed text-(--text-soft) sm:text-base'>
              {subtitle}
            </p>

            {children && <div>{children}</div>}

            {action && <div className='flex justify-center'>{action}</div>}

            {footer && (
              <p className='mt-16 text-xs text-(--text-faint)'>{footer}</p>
            )}
          </AnimatedGroup>
        </Content>
      </Section>
    </Page>
  );
}
