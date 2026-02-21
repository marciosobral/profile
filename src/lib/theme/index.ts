import {
  themes,
  modes,
  defaultTheme,
  defaultMode,
  type Theme,
  type Mode,
} from '@/config/themes';

export { themes, modes, defaultTheme, defaultMode, type Theme, type Mode };

export const THEME_COOKIE = 'NEXT_THEME';
export const MODE_COOKIE = 'NEXT_MODE';

export function isValidTheme(value: string | undefined): value is Theme {
  return (
    typeof value === 'string' && (themes as readonly string[]).includes(value)
  );
}

export function isValidMode(value: string | undefined): value is Mode {
  return (
    typeof value === 'string' && (modes as readonly string[]).includes(value)
  );
}

export function resolveTheme(value: string | undefined): Theme {
  return isValidTheme(value) ? value : defaultTheme;
}

export function resolveMode(value: string | undefined): Mode {
  return isValidMode(value) ? value : defaultMode;
}
