import { cookies } from 'next/headers';

import {
  resolveTheme,
  resolveMode,
  THEME_COOKIE,
  MODE_COOKIE,
  type Theme,
  type Mode,
} from '.';

export async function getServerThemeProps(): Promise<{
  theme: Theme;
  mode: Mode;
}> {
  const cookieStore = await cookies();
  const theme = resolveTheme(cookieStore.get(THEME_COOKIE)?.value);
  const mode = resolveMode(cookieStore.get(MODE_COOKIE)?.value);
  return { theme, mode };
}
