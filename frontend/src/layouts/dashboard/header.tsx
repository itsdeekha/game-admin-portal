import Iconify from '~/components/iconify/iconify';

import { useNavigate } from '@tanstack/react-router';
import clsx from 'clsx';
import { memo } from 'react';
import { authAction } from '~/auth/context';
import { useAuthContext } from '~/auth/hooks';
import { Button } from '~/components/button';
import { paths } from '~/routes/paths';

export interface HeaderProps {
  onOpenNav?: VoidFunction;
  className?: string;
}

function Header({ onOpenNav, className }: HeaderProps) {
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  async function handleSignOut() {
    dispatch(authAction.signOut());
    navigate({ to: paths.auth.signIn, replace: true });
  }

  return (
    <header
      role="banner"
      data-testid="header"
      className={clsx(
        'fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white transition-all duration-200 lg:left-[280px] h-[64px]',
        className
      )}
    >
      <div className="h-full px-4 sm:px-6 lg:px-10 flex items-center">
        <Button
          type="button"
          onClick={onOpenNav}
          className="block lg:hidden w-[44px]! h-[44px]! p-0!"
          data-testid="header-menu-button"
          aria-label="Open navigation menu"
        >
          <Iconify
            icon="hugeicons:menu-02"
            width={24}
            data-testid="header-menu-icon"
          />
        </Button>

        <div className="flex-1 flex items-center justify-end">
          <Button
            type="button"
            onClick={handleSignOut}
            data-testid="header-signout-button"
            aria-label="Signout from application"
          >
            Sign out
          </Button>
        </div>
      </div>
    </header>
  );
}

export default memo(Header);
