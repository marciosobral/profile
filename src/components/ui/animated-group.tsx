'use client';

import { Children, type ReactNode } from 'react';
import { useAnimation } from '@/hooks/use-animation';

interface AnimatedGroupProps {
  children: ReactNode;
  startOrder?: number;
}

export function AnimatedGroup({
  children,
  startOrder = 0,
}: AnimatedGroupProps) {
  const { getDelay } = useAnimation();

  return (
    <>
      {Children.map(children, (child, index) => (
        <div
          className='animate-fade-up'
          style={{ animationDelay: `${getDelay(startOrder + index)}ms` }}
        >
          {child}
        </div>
      ))}
    </>
  );
}
