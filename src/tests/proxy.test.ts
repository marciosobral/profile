import { createElement, type ReactNode } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { NextRequest, NextResponse } from 'next/server';
import { beforeEach, describe, expect, it, vi } from 'vitest';

type AppLocale = 'en-US' | 'pt-BR';

const handleI18nRouting = vi.hoisted(() => vi.fn());
const isMaintenanceActive = vi.hoisted(() => vi.fn());
const routeLocale = vi.hoisted(() => ({ current: 'en-US' as AppLocale }));

const messages = {
  'en-US': {
    common: {
      error: {
        title: 'Something went wrong',
        subtitle: 'An unexpected error occurred. Please try again.',
        action: 'Try again',
      },
      notFound: {
        title: 'Page not found',
        subtitle:
          "The page you're looking for doesn't exist or has been moved.",
        action: 'Go home',
      },
    },
  },
  'pt-BR': {
    common: {
      error: {
        title: 'Algo deu errado',
        subtitle: 'Ocorreu um erro inesperado. Por favor, tente novamente.',
        action: 'Tentar novamente',
      },
      notFound: {
        title: 'Página não encontrada',
        subtitle: 'A página que você procura não existe ou foi movida.',
        action: 'Ir para o início',
      },
    },
  },
} as const;

function getMessageValue(
  dictionary: Record<string, unknown>,
  key: string,
): string {
  const value = key.split('.').reduce<unknown>((current, segment) => {
    if (typeof current !== 'object' || current === null) {
      return undefined;
    }

    return (current as Record<string, unknown>)[segment];
  }, dictionary);

  if (typeof value !== 'string') {
    throw new Error(`Could not resolve translation key: ${key}`);
  }

  return value;
}

vi.mock('next-intl/middleware', () => ({
  default: vi.fn(() => handleI18nRouting),
}));

vi.mock('next-intl', () => ({
  useTranslations: (namespace: keyof (typeof messages)[AppLocale]) => {
    return (key: string) => {
      const dictionary = messages[routeLocale.current][namespace];

      return getMessageValue(dictionary as Record<string, unknown>, key);
    };
  },
}));

vi.mock('@/components/layout/status-page', () => ({
  StatusPage: ({
    title,
    subtitle,
    action,
  }: {
    title: string;
    subtitle: string;
    action: ReactNode;
  }) =>
    createElement(
      'section',
      null,
      createElement('h1', null, title),
      createElement('p', null, subtitle),
      action,
    ),
}));

vi.mock('@/i18n/navigation', () => ({
  Link: ({ href, children, ...props }: { href: string; children: ReactNode }) =>
    createElement('a', { href, ...props }, children),
}));

vi.mock('../lib/maintenance', () => ({
  isMaintenanceActive,
}));

function createRewriteResponse(pathname: string) {
  return new NextResponse(null, {
    headers: {
      'x-middleware-rewrite': `http://localhost:3000${pathname}`,
    },
  });
}

function createRedirectResponse(location: string) {
  return new NextResponse(null, {
    status: 307,
    headers: {
      location,
    },
  });
}

function createRequest(pathname: string, host = 'localhost:3000') {
  return new NextRequest(`http://${host}${pathname}`, {
    headers: {
      host,
    },
  });
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#x27;');
}

describe('proxy routing', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it('passes through next-intl pathname redirects unchanged', async () => {
    const redirectResponse = createRedirectResponse('/en/cookies');
    handleI18nRouting.mockReturnValue(redirectResponse);

    const { proxy } = await import('../proxy');
    const request = createRequest('/cookies');

    const response = proxy(request);

    expect(response).toBe(redirectResponse);
    expect(response.status).toBe(307);
    expect(response.headers.get('location')).toBe('/en/cookies');
  });

  it('redirects to the localized maintenance page when maintenance mode is on', async () => {
    const scenarios = [
      {
        label: 'default locale requests',
        requestPath: '/projects',
        rewrittenPath: '/pt-BR/projects',
        expectedLocation: 'http://localhost:3000/manutencao',
      },
      {
        label: 'english requests',
        requestPath: '/en/projects',
        rewrittenPath: '/en-US/projects',
        expectedLocation: 'http://localhost:3000/en/maintenance',
      },
      {
        label: 'malformed english maintenance paths',
        requestPath: '/en/en-US/maintenance',
        rewrittenPath: '/en-US/en-US/maintenance',
        expectedLocation: 'http://localhost:3000/en/maintenance',
      },
    ];

    const { proxy } = await import('../proxy');
    isMaintenanceActive.mockReturnValue(true);

    for (const scenario of scenarios) {
      handleI18nRouting.mockReturnValueOnce(
        createRewriteResponse(scenario.rewrittenPath),
      );

      const response = proxy(createRequest(scenario.requestPath));

      expect(response.status, scenario.label).toBe(307);
      expect(response.headers.get('location'), scenario.label).toBe(
        scenario.expectedLocation,
      );
    }
  });

  it('leaves the localized maintenance page alone when maintenance mode is on', async () => {
    const middlewareResponse = createRewriteResponse('/en-US/maintenance');
    handleI18nRouting.mockReturnValue(middlewareResponse);
    isMaintenanceActive.mockReturnValue(true);

    const { proxy } = await import('../proxy');
    const response = proxy(createRequest('/en/maintenance'));

    expect(response).toBe(middlewareResponse);
    expect(response.status).toBe(200);
    expect(response.headers.get('location')).toBeNull();
  });

  it('redirects away from the maintenance page when maintenance mode is off', async () => {
    const scenarios = [
      {
        label: 'default locale maintenance page',
        requestPath: '/manutencao',
        rewrittenPath: '/pt-BR/maintenance',
        expectedLocation: 'http://localhost:3000/',
      },
      {
        label: 'english maintenance page',
        requestPath: '/en/maintenance',
        rewrittenPath: '/en-US/maintenance',
        expectedLocation: 'http://localhost:3000/en',
      },
    ];

    const { proxy } = await import('../proxy');
    isMaintenanceActive.mockReturnValue(false);

    for (const scenario of scenarios) {
      handleI18nRouting.mockReturnValueOnce(
        createRewriteResponse(scenario.rewrittenPath),
      );

      const response = proxy(createRequest(scenario.requestPath));

      expect(response.status, scenario.label).toBe(307);
      expect(response.headers.get('location'), scenario.label).toBe(
        scenario.expectedLocation,
      );
    }
  });

  it('passes through regular routes when maintenance mode is off', async () => {
    const middlewareResponse = createRewriteResponse('/pt-BR/missing');
    handleI18nRouting.mockReturnValue(middlewareResponse);
    isMaintenanceActive.mockReturnValue(false);

    const { proxy } = await import('../proxy');
    const response = proxy(createRequest('/missing'));

    expect(response).toBe(middlewareResponse);
    expect(response.status).toBe(200);
    expect(response.headers.get('location')).toBeNull();
  });
});

describe('route state pages', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.clearAllMocks();
  });

  it('renders the localized not-found page copy for every locale', async () => {
    const scenarios = [
      {
        locale: 'en-US' as const,
        title: 'Page not found',
        subtitle:
          "The page you're looking for doesn't exist or has been moved.",
        action: 'Go home',
      },
      {
        locale: 'pt-BR' as const,
        title: 'Página não encontrada',
        subtitle: 'A página que você procura não existe ou foi movida.',
        action: 'Ir para o início',
      },
    ];

    const { default: NotFoundPage } = await import('../app/[locale]/not-found');

    for (const scenario of scenarios) {
      routeLocale.current = scenario.locale;

      const markup = renderToStaticMarkup(createElement(NotFoundPage));

      expect(markup, scenario.locale).toContain(scenario.title);
      expect(markup, scenario.locale).toContain(escapeHtml(scenario.subtitle));
      expect(markup, scenario.locale).toContain(scenario.action);
    }
  });

  it('renders the localized error page copy for every locale', async () => {
    const scenarios = [
      {
        locale: 'en-US' as const,
        title: 'Something went wrong',
        subtitle: 'An unexpected error occurred. Please try again.',
        action: 'Try again',
      },
      {
        locale: 'pt-BR' as const,
        title: 'Algo deu errado',
        subtitle: 'Ocorreu um erro inesperado. Por favor, tente novamente.',
        action: 'Tentar novamente',
      },
    ];

    const { default: ErrorPage } = await import('../app/[locale]/error');

    for (const scenario of scenarios) {
      routeLocale.current = scenario.locale;

      const markup = renderToStaticMarkup(
        createElement(ErrorPage, {
          error: new Error('boom'),
          reset: vi.fn(),
        }),
      );

      expect(markup, scenario.locale).toContain(scenario.title);
      expect(markup, scenario.locale).toContain(escapeHtml(scenario.subtitle));
      expect(markup, scenario.locale).toContain(scenario.action);
    }
  });
});
