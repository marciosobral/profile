export const routes = ['', 'maintenance'] as const;

export type Route = (typeof routes)[number];
export type RoutePath = `/${Route}`;

export const MAINTENANCE_ROUTE = '/maintenance' as const;
