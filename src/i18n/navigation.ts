import { createNavigation } from 'next-intl/navigation';

import { clientRouting } from './routing';

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(clientRouting);
