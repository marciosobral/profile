import { headers } from 'next/headers';

export function getHostFromHeaders(headersList: Headers): string {
  const host =
    headersList.get('x-forwarded-host') ??
    headersList.get('host') ??
    'localhost';

  return host.split(':')[0];
}

export function getProtocolFromHeaders(headersList: Headers): string {
  return headersList.get('x-forwarded-proto') ?? 'https';
}

export async function getUrl(): Promise<string> {
  const headersList = await headers();
  const host = getHostFromHeaders(headersList);
  const protocol = getProtocolFromHeaders(headersList);

  return `${protocol}://${host}`;
}
