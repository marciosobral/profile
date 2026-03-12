import type { ReactNode } from 'react';

import { Page } from '@/components/layout/page';
import { Section } from '@/components/layout/section';
import { Content } from '@/components/layout/content';

interface StatusPageProps {
  icon: ReactNode;
  title: string;
  subtitle: string;
  action?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
}

export function StatusPage({
  icon,
  title,
  subtitle,
  action,
  children,
  footer,
}: StatusPageProps) {
  return (
    <Page>
      <Section>
        <Content className='min-h-screen max-w-lg text-center'>
          <div className='mb-8 flex justify-center text-(--text-faint)'>
            {icon}
          </div>

          <h1 className='text-foreground mb-3 text-2xl font-semibold tracking-tight sm:text-4xl'>
            {title}
          </h1>

          <p className='mb-10 text-sm leading-relaxed text-(--text-soft) sm:text-base'>
            {subtitle}
          </p>

          {children}

          {action && <div className='flex justify-center'>{action}</div>}

          {footer && (
            <p className='mt-16 text-xs text-(--text-faint)'>{footer}</p>
          )}
        </Content>
      </Section>
    </Page>
  );
}
