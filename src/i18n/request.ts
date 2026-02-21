import { getRequestConfig } from 'next-intl/server';

import { loadMessages } from '@/i18n/messages';
import { normalizeLocale } from '@/lib/i18n';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = normalizeLocale(requested ?? undefined);
  const messages = await loadMessages(locale);

  return {
    locale,
    messages,
  };
});
