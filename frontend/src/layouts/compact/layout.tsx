import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export default function CompactLayout({ children }: Props) {
  return (
    <main className="py-12 px-2 md:px-0 flex min-h-screen relative items-center justify-center">
      <div className="w-[420px]">{children}</div>
    </main>
  );
}
