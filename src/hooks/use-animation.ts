'use client';

import { useContext } from 'react';
import {
  AnimationContext,
  type AnimationContextValue,
} from '@/providers/animation';

const fallback: AnimationContextValue = {
  getDelay: () => 0,
};

export function useAnimation(): AnimationContextValue {
  return useContext(AnimationContext) ?? fallback;
}
