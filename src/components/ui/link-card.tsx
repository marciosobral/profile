import type { ComponentPropsWithoutRef, ElementType } from 'react';
import type { Icon } from '@phosphor-icons/react';

import { cn } from '@/utils/cn';
import { BaseCard } from '@/components/ui/base-card';

interface LinkCardProps {
  href: string;
  icon: Icon;
  label: string;
  handle?: string;
  disabled?: boolean;
}

export function LinkCard({
  href,
  icon,
  label,
  handle,
  disabled,
}: LinkCardProps) {
  const Component = disabled ? 'div' : 'a';
  const linkProps = disabled
    ? {}
    : ({
        href,
        target: '_blank',
        rel: 'noopener noreferrer',
      } satisfies ComponentPropsWithoutRef<'a'>);

  return (
    <Component
      {...(linkProps as ComponentPropsWithoutRef<ElementType>)}
      className={cn(
        'group flex h-full w-full items-center gap-3 rounded-xl border border-(--border-soft) px-3 py-3 text-left transition-colors',
        disabled
          ? 'cursor-not-allowed opacity-40'
          : 'hover:border-(--border-muted) hover:bg-(--surface-soft)',
      )}
    >
      <BaseCard icon={icon} label={label} handle={handle} />
    </Component>
  );
}
