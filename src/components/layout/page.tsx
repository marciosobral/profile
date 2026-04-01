import { cn } from '@/utils/cn';

interface PageProps {
  children: React.ReactNode;
  className?: string;
}

export function Page({ children, className }: PageProps) {
  return (
    <div className={cn('relative flex flex-1 flex-col', className)}>
      {children}
    </div>
  );
}
