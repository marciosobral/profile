'use client';

import { useState } from 'react';
import type { Icon } from '@phosphor-icons/react';
import { CopyIcon, CheckCircleIcon } from '@phosphor-icons/react/ssr';
import { useTranslations } from 'next-intl';

import { cn } from '@/utils/cn';
import { BaseCard } from '@/components/ui/base-card';

interface CopyCardProps {
  icon: Icon;
  label: string;
  handle: string;
}

export function CopyCard({ icon, label, handle }: CopyCardProps) {
  const t = useTranslations('common');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(handle);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className='group flex h-full w-full flex-col justify-between rounded-xl border border-(--border-soft) px-3 py-3 text-left transition-colors hover:border-(--border-muted)'>
      <BaseCard icon={icon} label={label} handle={handle} />

      <button
        onClick={handleCopy}
        className={cn(
          'mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-all duration-200',
          copied
            ? 'text-foreground scale-[1.02] bg-(--surface-soft)'
            : 'hover:text-foreground bg-(--surface-soft) text-(--text-soft) active:scale-95',
        )}
      >
        <span
          className={cn(
            'transition-transform duration-200',
            copied && 'animate-bounce-once',
          )}
        >
          {copied ? (
            <CheckCircleIcon size={14} weight='fill' />
          ) : (
            <CopyIcon size={14} weight='fill' />
          )}
        </span>
        {copied ? t('social.copied') : t('social.copy')}
      </button>
    </div>
  );
}
