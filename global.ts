import 'next-intl';

import { routing } from '@/i18n/routing';
import type { Messages } from '@/dictionaries';

declare module 'next-intl' {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: Messages;
  }
}
