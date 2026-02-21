import { getServerThemeProps } from '@/lib/theme/server';

interface HtmlProps {
  lang: string;
  dir: string;
  className?: string;
  children: React.ReactNode;
}

export async function Html({ lang, dir, className, children }: HtmlProps) {
  const { theme, mode } = await getServerThemeProps();

  return (
    <html
      lang={lang}
      dir={dir}
      className={className}
      data-theme={theme}
      data-mode={mode}
    >
      {children}
    </html>
  );
}
