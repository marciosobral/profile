'use client';

import { useState } from 'react';
import Image from 'next/image';

import { siteConfig } from '@/config/site';
import { consumeLoaderSkip } from '@/lib/loader-state';

import LogoSvg from '@assets/logos/last-name.svg';

export function PageLoader() {
  const [visible] = useState(() => !consumeLoaderSkip());

  if (!visible) return null;

  return (
    <div
      className='loader-overlay bg-background fixed inset-0 z-50 flex items-center justify-center'
      aria-hidden='true'
    >
      <Image
        src={LogoSvg}
        alt={siteConfig.author}
        priority
        className='loader-logo h-10 w-auto'
      />
    </div>
  );
}
