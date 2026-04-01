'use client';

import {
  createContext,
  useCallback,
  useMemo,
  useRef,
  type ReactNode,
} from 'react';

import { useMountEffect } from '@/hooks/use-mount-effect';
import { consumeAnimationSkip } from '@/lib/loader-state';

type AnimationMode = 'page-load' | 'transition';

const BASE_DELAYS: Record<AnimationMode, number> = {
  'page-load': 1000,
  transition: 0,
};

const STAGGER_OFFSETS: Record<AnimationMode, number> = {
  'page-load': 150,
  transition: 60,
};

export interface AnimationContextValue {
  getDelay: (order: number) => number;
}

export const AnimationContext = createContext<AnimationContextValue | null>(
  null,
);

export function AnimationProvider({ children }: { children: ReactNode }) {
  const isInitialLoad = useRef(!consumeAnimationSkip());

  useMountEffect(() => {
    isInitialLoad.current = false;
  });

  const getDelay = useCallback((order: number) => {
    const mode = isInitialLoad.current ? 'page-load' : 'transition';
    return BASE_DELAYS[mode] + order * STAGGER_OFFSETS[mode];
  }, []);

  const value = useMemo(() => ({ getDelay }), [getDelay]);

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
}
