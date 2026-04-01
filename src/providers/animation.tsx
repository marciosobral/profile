'use client';

import {
  createContext,
  useCallback,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import { useMountEffect } from '@/hooks/use-mount-effect';

type AnimationMode = 'page-load' | 'transition';

const BASE_DELAYS: Record<AnimationMode, number> = {
  'page-load': 1000,
  transition: 250,
};

const STAGGER_OFFSET = 150;

export interface AnimationContextValue {
  getDelay: (order: number) => number;
  setTransitionMode: () => void;
}

export const AnimationContext = createContext<AnimationContextValue | null>(
  null,
);

export function AnimationProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<AnimationMode>('page-load');
  const resetTimerRef = useRef<ReturnType<typeof setTimeout>>(null);

  const setTransitionMode = useCallback(() => {
    setMode('transition');

    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
    }

    resetTimerRef.current = setTimeout(() => {
      setMode('page-load');
    }, 2000);
  }, []);

  useMountEffect(() => {
    return () => {
      if (resetTimerRef.current) {
        clearTimeout(resetTimerRef.current);
      }
    };
  });

  const getDelay = useCallback(
    (order: number) => BASE_DELAYS[mode] + order * STAGGER_OFFSET,
    [mode],
  );

  const value = useMemo(
    () => ({ getDelay, setTransitionMode }),
    [getDelay, setTransitionMode],
  );

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
}
