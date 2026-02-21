import { routes } from './routes';

export const namespaces = [
  'common',
  'home',
  ...routes.filter((route) => route !== ''),
] as const;

export type Namespace = (typeof namespaces)[number];
