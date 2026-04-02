import type { ReactNode } from 'react';
import type { Icon } from '@phosphor-icons/react';

import { cn } from '@/utils/cn';

interface BaseCardProps {
  icon: Icon;
  label: string;
  handle?: string;
  className?: string;
  children?: ReactNode;
}

export function BaseCard({
  icon: IconComponent,
  label,
  handle,
  className,
  children,
}: BaseCardProps) {
  return (
    <>
      <div className={cn('flex items-center gap-3', className)}>
        <span className='group-hover:text-foreground flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-(--surface-soft) text-(--text-soft) transition-colors'>
          <IconComponent size={18} />
        </span>
        <span className='flex min-w-0 flex-1 flex-col gap-0.5'>
          <span className='text-foreground text-sm font-medium'>{label}</span>
          {handle && (
            <span className='truncate text-xs text-(--text-faint)'>
              {handle}
            </span>
          )}
        </span>
      </div>
      {children}
    </>
  );
}
