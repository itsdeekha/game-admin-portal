import { useNavigate } from '@tanstack/react-router';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { paths } from '~/routes/paths';
import { useAuthContext } from '../hooks';

interface AuthGuardProps {
  children: ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const navigate = useNavigate();
  const { authenticated, initialized } = useAuthContext();
  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    if (!authenticated && initialized) {
      const searchParams = new URLSearchParams({
        returnTo: window.location.href,
      }).toString();

      const href = `${paths.auth.signIn}?${searchParams}`;

      navigate({ to: href, replace: true });
    } else {
      setChecked(true);
    }
  }, [authenticated, navigate, initialized]);

  useEffect(() => {
    check();
  }, []);

  if (!checked) return null;

  return <>{children}</>;
}
