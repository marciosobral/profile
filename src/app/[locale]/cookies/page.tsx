import type { Metadata } from 'next';
import { generateMetadata as generateMeta } from '@/lib/metadata';
import CookiePolicy from '@/components/pages/cookies/page';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateMeta('cookies', locale);
}

export default async function Page() {
  return <CookiePolicy />;
}
