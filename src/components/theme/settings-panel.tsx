'use client';

import { useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { GearSixIcon } from '@phosphor-icons/react';
import { useTheme } from './use-theme';
import { useOpenState } from '@/components/state/use-open-state';
import { usePathname, useRouter } from '@/i18n/navigation';
import { getAvailableLocales, getLocaleInfo, type Locale } from '@/lib/i18n';
import type { Mode } from '@/lib/theme';

export function SettingsPanel() {
  const [open, , toggle] = useOpenState('settings-panel');
  const { theme, mode, setTheme, toggleMode, themes } = useTheme();
  const t = useTranslations('common.settings');

  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale() as Locale;
  const [isPending, startTransition] = useTransition();
  const availableLocales = getAvailableLocales();

  const handleLocaleSwitch = (newLocale: Locale) => {
    if (newLocale === currentLocale || isPending) return;
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  };

  const handleModeSwitch = (newMode: Mode) => {
    if (newMode !== mode) toggleMode();
  };

  const modeOptions = [
    { value: 'dark' as Mode, label: t('dark') },
    { value: 'light' as Mode, label: t('light') },
  ];

  const themeOptions = themes.map((th) => ({
    value: th,
    label: th.charAt(0).toUpperCase() + th.slice(1),
  }));

  const localeOptions = availableLocales.map((locale) => ({
    value: locale,
    label: getLocaleInfo(locale).name,
  }));

  return (
    <div className='fixed right-4 bottom-4 z-50 flex flex-col items-end'>
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
              onClick={() => handleModeSwitch(opt.value)}
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
              onClick={() => setTheme(opt.value)}
              className={`w-full px-3 py-2 text-left text-sm transition-colors ${
                theme === opt.value
                  ? 'bg-(--surface-soft) font-medium'
                  : 'hover:bg-(--surface-soft)'
              }`}
            >
              {opt.label}
            </button>
          ))}

          <div className='border-b border-(--border-soft) px-3 pt-3 pb-1'>
            <p className='mb-1 text-xs font-medium tracking-wide text-(--text-soft) uppercase'>
              {t('language')}
            </p>
          </div>
          {localeOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => handleLocaleSwitch(opt.value)}
              disabled={isPending}
              className={`w-full px-3 py-2 text-left text-sm transition-colors disabled:opacity-50 ${
                currentLocale === opt.value
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
