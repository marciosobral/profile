import type { Metadata } from 'next';

import { generateMetadata as generateMeta } from '@/lib/metadata';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generateMeta('maintenance', locale);
}

export default async function LocaleLayout({ children }: LocaleLayoutProps) {
  return children;
}
