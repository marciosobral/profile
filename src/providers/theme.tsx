'use client';

import {
  createContext,
  useCallback,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

import {
  themes,
  modes,
  defaultTheme,
  defaultMode,
  resolveTheme,
  resolveMode,
  THEME_COOKIE,
  MODE_COOKIE,
  type Theme,
  type Mode,
} from '@/lib/theme';
import {
  runRadialRevealTransition,
  type TransitionOrigin,
} from '@/lib/theme/radial-reveal';

interface ThemeContextValue {
  theme: Theme;
  mode: Mode;
  setTheme: (theme: Theme, origin?: TransitionOrigin) => void;
  toggleMode: (origin?: TransitionOrigin) => void;
  themes: readonly Theme[];
  modes: readonly Mode[];
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

function getInitialTheme(): Theme {
  const attr = document.documentElement.getAttribute('data-theme');
  return resolveTheme(attr ?? undefined);
}

function getInitialMode(): Mode {
  const attr = document.documentElement.getAttribute('data-mode');
  if (attr) return resolveMode(attr);

  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return defaultMode;
}

const ONE_YEAR = 60 * 60 * 24 * 365;

function setCookie(name: string, value: string) {
  document.cookie = `${name}=${value};path=/;max-age=${ONE_YEAR};SameSite=Lax`;
}

function applyAttributes(theme: Theme, mode: Mode) {
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.setAttribute('data-mode', mode);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [mode, setModeState] = useState<Mode>(defaultMode);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setThemeState(getInitialTheme());
    setModeState(getInitialMode());
    setMounted(true);
  }, []);

  const setTheme = useCallback(
    (newTheme: Theme, origin?: TransitionOrigin) => {
      if (newTheme === theme) return;

      runRadialRevealTransition(() => {
        setThemeState(newTheme);
        setCookie(THEME_COOKIE, newTheme);
        applyAttributes(newTheme, mode);
      }, origin);
    },
    [mode, theme],
  );

  const toggleMode = useCallback(
    (origin?: TransitionOrigin) => {
      const newMode = mode === 'light' ? 'dark' : 'light';
      runRadialRevealTransition(() => {
        setModeState(newMode);
        setCookie(MODE_COOKIE, newMode);
        applyAttributes(theme, newMode);
      }, origin);
    },
    [theme, mode],
  );

  useEffect(() => {
    if (!mounted) return;
    setCookie(THEME_COOKIE, theme);
    setCookie(MODE_COOKIE, mode);
    applyAttributes(theme, mode);
  }, [mounted, theme, mode]);

  return (
    <ThemeContext.Provider
      value={{ theme, mode, setTheme, toggleMode, themes, modes }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
