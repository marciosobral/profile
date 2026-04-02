import { getRequestConfig } from 'next-intl/server';
import { headers } from 'next/headers';

import { loadMessages } from '@/i18n/messages';
import { normalizeLocale } from '@/lib/i18n';
import { getHostFromHeaders } from '@/utils/host';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const headersList = await headers();
  const host = getHostFromHeaders(headersList);
  const locale = normalizeLocale(requested ?? undefined, host);
  console.log('[i18n:request] requestLocale=%s host=%s resolved=%s', requested ?? 'undefined', host, locale);
  const messages = await loadMessages(locale);

  return {
    locale,
    messages,
  };
});
