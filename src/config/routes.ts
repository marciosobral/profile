export const routes = ['', 'maintenance'] as const;

export type Route = (typeof routes)[number];
