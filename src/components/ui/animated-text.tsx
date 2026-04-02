'use client';

import { type ReactNode } from 'react';
import { useAnimation } from '@/hooks/use-animation';

interface AnimatedTextProps {
  order: number;
  children: ReactNode;
  className?: string;
}

export function AnimatedText({
  order,
  children,
  className,
}: AnimatedTextProps) {
  const { getDelay } = useAnimation();

  return (
    <div
      className={className ? `animate-fade-up ${className}` : 'animate-fade-up'}
      style={{ animationDelay: `${getDelay(order)}ms` }}
    >
      {children}
    </div>
  );
}
