import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

import { routing } from './i18n/routing';
import { isMaintenanceActive } from './lib/maintenance';
import { getHostFromHeaders } from './utils/host';
import {
  getDomainDefaultLocale,
  domains,
  localePrefix,
  pathnames,
  type Locale,
} from './config/i18n';
import { MAINTENANCE_ROUTE, type RoutePath } from './config/routes';

const handleI18nRouting = createMiddleware(routing);

const knownDomains = domains.map((d) => d.domain);

function normalizeHostForRouting(request: NextRequest): NextRequest {
  const hostname = getHostFromHeaders(request.headers);
  const matchedDomain = knownDomains.find(
    (d) => hostname === d || hostname.endsWith(`.${d}`),
  );

  if (matchedDomain && hostname !== matchedDomain) {
    const headers = new Headers(request.headers);
    headers.set('host', matchedDomain);
    if (request.headers.has('x-forwarded-host')) {
      headers.set('x-forwarded-host', matchedDomain);
    }
    return new NextRequest(request.url, {
      headers,
      method: request.method,
      body: request.body,
    });
  }

  return request;
}

function getLocalizedMaintenancePath(locale: string): string {
  const maintenancePathnames = pathnames[MAINTENANCE_ROUTE];
  if (typeof maintenancePathnames === 'string') return maintenancePathnames;
  return (
    (maintenancePathnames as Record<string, string>)[locale] ??
    MAINTENANCE_ROUTE
  );
}

function getLocalizedPublicPath(
  route: RoutePath,
  locale: Locale,
  host: string,
): string {
  const localizedPath =
    route === MAINTENANCE_ROUTE ? getLocalizedMaintenancePath(locale) : '/';
  const isDefaultLocale = locale === getDomainDefaultLocale(host);

  if (isDefaultLocale) {
    return localizedPath;
  }

  const prefix = localePrefix.prefixes[locale];
  return localizedPath === '/' ? prefix : `${prefix}${localizedPath}`;
}

export function proxy(request: NextRequest) {
  const normalizedRequest = normalizeHostForRouting(request);
  const response = handleI18nRouting(normalizedRequest);

  if (!response.ok) {
    return response;
  }

  const maintenanceActive = isMaintenanceActive();

  const rewriteHeader = response.headers.get('x-middleware-rewrite');
  const url = new URL(rewriteHeader ?? request.url);

  const [, locale, ...rest] = url.pathname.split('/');
  const host = getHostFromHeaders(request.headers);
  const currentPath = request.nextUrl.pathname;
  const maintenancePath = getLocalizedPublicPath(
    MAINTENANCE_ROUTE,
    locale as Locale,
    host,
  );
  const homePath = getLocalizedPublicPath('/', locale as Locale, host);
  const pathWithoutLocale = '/' + rest.join('/');
  const isMaintenancePath =
    currentPath === maintenancePath || pathWithoutLocale === MAINTENANCE_ROUTE;

  if (maintenanceActive && !isMaintenancePath) {
    return NextResponse.redirect(new URL(maintenancePath, request.url), {
      headers: response.headers,
    });
  }

  if (!maintenanceActive && isMaintenancePath) {
    return NextResponse.redirect(new URL(homePath, request.url), {
      headers: response.headers,
    });
  }

  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|icon[0-9].*|robots.txt|sitemap.xml|manifest.webmanifest).*)',
  ],
};
