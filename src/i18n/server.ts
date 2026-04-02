import { cookies, headers } from 'next/headers';

import { normalizeLocale } from '@/lib/i18n';
import { getHostFromHeaders } from '@/utils/host';
import type { Locale } from '@/config/i18n';

export async function getLocaleFromCookie(): Promise<Locale> {
  const cookieStore = await cookies();
  const headersList = await headers();
  const host = getHostFromHeaders(headersList);

  return normalizeLocale(cookieStore.get('NEXT_LOCALE')?.value, host);
}
