import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

import { routing } from './i18n/routing';
import { isMaintenanceActive } from './lib/maintenance';
import { getHostFromHeaders } from './utils/host';

const handleI18nRouting = createMiddleware(routing);

function getDomainDefaultLocale(host: string) {
  const domain = routing.domains?.find((d) => d.domain === host);
  return domain?.defaultLocale ?? routing.defaultLocale;
}

export function proxy(request: NextRequest) {
  const response = handleI18nRouting(request);

  if (!response.ok) {
    return response;
  }

  const maintenanceActive = isMaintenanceActive();

  const rewriteHeader = response.headers.get('x-middleware-rewrite');
  const url = new URL(rewriteHeader ?? request.url);

  const [, locale, ...rest] = url.pathname.split('/');
  const pathWithoutLocale = '/' + rest.join('/');

  const host = getHostFromHeaders(request.headers);
  const domainDefaultLocale = getDomainDefaultLocale(host);
  const isDefaultLocale = locale === domainDefaultLocale;

  const isMaintenancePath = pathWithoutLocale === '/maintenance';

  if (maintenanceActive && !isMaintenancePath) {
    const target = isDefaultLocale ? '/maintenance' : `/${locale}/maintenance`;

    return NextResponse.redirect(new URL(target, request.url), {
      headers: response.headers,
    });
  }

  if (!maintenanceActive && isMaintenancePath) {
    const target = isDefaultLocale ? '/' : `/${locale}`;

    return NextResponse.redirect(new URL(target, request.url), {
      headers: response.headers,
    });
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
