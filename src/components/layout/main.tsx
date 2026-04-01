export function Main({ children }: { children: React.ReactNode }) {
  return (
    <main className='bg-background text-foreground relative z-1 flex flex-1 flex-col overflow-hidden'>
      {children}
    </main>
  );
}
