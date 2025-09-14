import clsx from 'clsx';
import { ReactNode } from 'react';

interface MainProps {
  children: ReactNode;
  className?: string;
}

export default function Main({ children, className, ...other }: MainProps) {
  return (
    <main
      className={clsx(
        'flex-1 py-[72px] lg:px-4 lg:w-[calc(100%-280px)]',
        className
      )}
      {...other}
    >
      {children}
    </main>
  );
}
