import { memo, useEffect } from 'react';

import { useLocation } from '@tanstack/react-router';
import clsx from 'clsx';
import { NavSectionVertical } from '~/components/nav-section';
import { useNavData } from './config-navigation';

interface NavProps {
  openNav: boolean;
  onCloseNav: VoidFunction;
}

function Nav({ openNav, onCloseNav }: NavProps) {
  const { pathname } = useLocation();
  const navData = useNavData();

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [pathname]);

  const renderContent = (
    <div className="h-full flex flex-col overflow-y-auto">
      <NavSectionVertical data={navData} />

      <div className="flex-1" />
    </div>
  );

  return (
    <nav className="w-[280px] lg:flex-shrink-0">
      <div className="hidden lg:block lg:w-[280px] h-full fixed border-r border-dashed border-gray-300 py-6">
        {renderContent}
      </div>

      <div className="block lg:hidden">
        {openNav && (
          <div
            className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            onClick={onCloseNav}
          />
        )}

        <div
          className={clsx(
            'w-[280px] fixed top-0 left-0 z-50 h-full bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:hidden py-6',
            { 'translate-x-0': openNav },
            { '-translate-x-full': !openNav }
          )}
        >
          {renderContent}
        </div>
      </div>
    </nav>
  );
}

export default memo(Nav);
