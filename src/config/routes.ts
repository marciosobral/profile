export const routes = ['', 'maintenance', 'cookies'] as const;

export type Route = (typeof routes)[number];
export type RoutePath = `/${Route}`;

export const MAINTENANCE_ROUTE = '/maintenance' as const;

export const excludedRoutes: RoutePath[] = [MAINTENANCE_ROUTE];
