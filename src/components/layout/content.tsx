import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/utils/cn';

type ContentProps = ComponentPropsWithoutRef<'div'>;

export function Content({ children, className, ...props }: ContentProps) {
  return (
    <div
      className={cn(
        'relative mx-auto flex h-full w-full max-w-6xl flex-col items-center justify-center px-4 sm:px-6 lg:px-8',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
