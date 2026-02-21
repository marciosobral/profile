import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('home');

  return (
    <section className='flex min-h-[80vh] flex-col justify-center px-6 sm:px-12 lg:px-24'>
      <div className='max-w-3xl'>
        <p className='text-foreground/40 mb-4 text-xs font-medium tracking-[0.3em] uppercase'>
          {t('greeting')}
        </p>

        <h1 className='text-foreground mb-6 text-5xl leading-[1.1] font-semibold tracking-tight sm:text-6xl lg:text-7xl'>
          {t('title')}
        </h1>

        <div className='bg-foreground mb-8 h-px w-16' />

        <p className='text-foreground/60 max-w-xl text-lg leading-relaxed'>
          {t('description')}
        </p>
      </div>
    </section>
  );
}
