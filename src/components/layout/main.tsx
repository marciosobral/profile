export function Main({ children }: { children: React.ReactNode }) {
  return (
    <main className='bg-background text-foreground relative z-1 overflow-hidden'>
      {children}
    </main>
  );
}
