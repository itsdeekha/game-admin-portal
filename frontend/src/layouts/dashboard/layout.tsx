import { ReactNode } from 'react';
import { useBoolean } from '~/hooks/use-boolean';
import Header from './header';
import Main from './main';
import NavVertical from './nav';

interface Props {
  children: ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  const nav = useBoolean();

  return (
    <>
      <Header onOpenNav={nav.onTrue} />
      <div className="lg:flex lg:min-h-full">
        <NavVertical openNav={nav.value} onCloseNav={nav.onFalse} />
        <Main>{children}</Main>
      </div>
    </>
  );
}
