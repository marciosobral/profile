export function Footer({ children }: { children: React.ReactNode }) {
  return (
    <footer className='bg-(--footer-color)'>
      <div className='relative mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8'>
        {children}
      </div>
    </footer>
  );
}
