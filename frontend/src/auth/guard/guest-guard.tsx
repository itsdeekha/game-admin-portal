import { useNavigate } from '@tanstack/react-router';
import { ReactNode, useCallback, useEffect } from 'react';
import { paths } from '~/routes/paths';
import { useAuthContext } from '../hooks';

interface GuestGuardProps {
  children: ReactNode;
}

export default function GuestGuard({ children }: GuestGuardProps) {
  const navigate = useNavigate();

  const { authenticated } = useAuthContext();

  const check = useCallback(() => {
    if (authenticated) {
      navigate({ to: paths.dashboard.root, replace: true });
    }
  }, [authenticated, navigate]);

  useEffect(() => {
    check();
  }, [check]);

  return <>{children}</>;
}
