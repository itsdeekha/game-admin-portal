import { ReactNode } from 'react';
import { LoadingScreen } from '~/components/loading-screen';
import { AuthContext } from './auth-context';

interface Props {
  children: ReactNode;
}

export function AuthConsumer({ children }: Props) {
  return (
    <AuthContext.Consumer>
      {(auth) => (auth.initialized ? children : <LoadingScreen />)}
    </AuthContext.Consumer>
  );
}
