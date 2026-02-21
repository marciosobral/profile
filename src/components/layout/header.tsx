export function Header({ children }: { children: React.ReactNode }) {
  return (
    <header className='bg-(--header-color)'>
      <div className='relative mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8'>
        {children}
      </div>
    </header>
  );
}
