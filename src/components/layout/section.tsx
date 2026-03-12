import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/utils/cn';

type SectionProps = ComponentPropsWithoutRef<'section'>;

export function Section({ children, className, ...props }: SectionProps) {
  return (
    <section
      className={cn(
        'relative flex w-full items-center justify-center',
        className,
      )}
      {...props}
    >
      {children}
    </section>
  );
}
