import { namespaces } from '@/config/namespaces';

export async function loadMessages(locale: string) {
  const entries = await Promise.all(
    namespaces.map(async (namespace) => {
      const message = (
        await import(`@/dictionaries/${namespace}/${locale}.json`)
      ).default;
      return [namespace, message[namespace] ?? message];
    }),
  );
  return Object.fromEntries(entries);
}
