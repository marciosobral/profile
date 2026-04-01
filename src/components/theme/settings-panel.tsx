'use client';

import { useEffect, useRef, type MouseEvent } from 'react';
import { useTranslations } from 'next-intl';
import { GearSixIcon } from '@phosphor-icons/react/ssr';

import { useTheme } from '@/hooks/use-theme';
import { useOpenState } from '@/hooks/use-open-state';
import {
  type TransitionOrigin,
} from '@/lib/theme/radial-reveal';
import type { Mode } from '@/lib/theme';

export function SettingsPanel() {
  const [open, setOpen, toggle] = useOpenState('settings-panel');
  const { theme, mode, setTheme, toggleMode, themes } = useTheme();
  const t = useTranslations('common.settings');
  const panelRef = useRef<HTMLDivElement | null>(null);

  const getTransitionOrigin = (
    event: MouseEvent<HTMLButtonElement>,
  ): TransitionOrigin => ({
    x: event.clientX,
    y: event.clientY,
  });

  const handleModeSwitch = (
    newMode: Mode,
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    if (newMode !== mode) {
      toggleMode(getTransitionOrigin(event));
    }
  };

  const modeOptions = [
    { value: 'dark' as Mode, label: t('dark') },
    { value: 'light' as Mode, label: t('light') },
  ];

  const themeOptions = themes.map((th) => ({
    value: th,
    label: th.charAt(0).toUpperCase() + th.slice(1),
  }));

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (panelRef.current?.contains(target)) return;
      setOpen(false);
    };

    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [open, setOpen]);

  return (
    <div
      ref={panelRef}
      className='fixed right-4 bottom-4 z-50 flex flex-col items-end'
    >
      {open && (
        <div className='bg-background mb-2 min-w-40 overflow-hidden rounded-lg border border-(--border-soft) shadow-lg'>
          <div className='border-b border-(--border-soft) px-3 pt-3 pb-1'>
            <p className='mb-1 text-xs font-medium tracking-wide text-(--text-soft) uppercase'>
              {t('mode')}
            </p>
          </div>
          {modeOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={(event) => handleModeSwitch(opt.value, event)}
              className={`w-full px-3 py-2 text-left text-sm transition-colors ${
                mode === opt.value
                  ? 'bg-(--surface-soft) font-medium'
                  : 'hover:bg-(--surface-soft)'
              }`}
            >
              {opt.label}
            </button>
          ))}

          <div className='border-b border-(--border-soft) px-3 pt-3 pb-1'>
            <p className='mb-1 text-xs font-medium tracking-wide text-(--text-soft) uppercase'>
              {t('theme')}
            </p>
          </div>
          {themeOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={(event) =>
                setTheme(opt.value, getTransitionOrigin(event))
              }
              className={`w-full px-3 py-2 text-left text-sm transition-colors ${
                theme === opt.value
                  ? 'bg-(--surface-soft) font-medium'
                  : 'hover:bg-(--surface-soft)'
              }`}
            >
              {opt.label}
            </button>
          ))}

        </div>
      )}

      <button
        onClick={toggle}
        aria-label={t('toggle')}
        className='bg-background text-foreground flex h-10 w-10 items-center justify-center rounded-full border border-(--border-soft) shadow-md'
      >
        <GearSixIcon size={18} weight='light' />
      </button>
    </div>
  );
}
