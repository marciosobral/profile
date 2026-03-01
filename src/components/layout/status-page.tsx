import type { ReactNode } from 'react';

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
    <div className='bg-background text-foreground flex min-h-screen items-center justify-center px-6'>
      <div className='mx-auto max-w-md text-center'>
        <div className='mx-auto mb-8 flex justify-center text-(--text-faint)'>
          {icon}
        </div>

        <h1 className='text-foreground mb-3 text-2xl font-semibold tracking-tight sm:text-4xl'>
          {title}
        </h1>

        <p className='mx-auto mb-10 max-w-sm text-sm leading-relaxed text-(--text-soft) sm:text-base'>
          {subtitle}
        </p>

        {children}

        {action && <div className='flex justify-center'>{action}</div>}

        {footer && (
          <p className='mt-16 text-center text-xs text-(--text-faint)'>
            {footer}
          </p>
        )}
      </div>
    </div>
  );
}
