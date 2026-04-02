'use client';

import { useCallback } from 'react';
import { useContext } from 'react';
import { StateContext } from '@/providers/state';

export function useOpenState(key: string) {
  const context = useContext(StateContext);
  if (!context) {
    throw new Error('useOpenState must be used within a StateProvider');
  }

  const isOpen = context.isOpen(key);
  const setOpen = useCallback(
    (value: boolean) => context.setOpen(key, value),
    [context, key],
  );
  const toggle = useCallback(() => context.toggle(key), [context, key]);

  return [isOpen, setOpen, toggle] as const;
}
