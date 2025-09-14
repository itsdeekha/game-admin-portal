import { ReactNode, useCallback, useEffect, useMemo, useReducer } from 'react';
import { getProfile } from '~/services/auth';
import { AuthContextType, AuthState } from '../types';
import authAction from './auth-action';
import { AuthContext } from './auth-context';
import reducer from './reducer';
import { ACCESS_TOKEN_STORAGE_KEY, setSession } from './utils';

const initialState: AuthState = {
  user: null,
  initialized: false,
};

interface Props {
  children: ReactNode;
}

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);

      if (!accessToken) {
        dispatch(authAction.initialize({ user: null }));
        return;
      }

      setSession(accessToken);

      const user = await getProfile();

      dispatch(authAction.initialize({ user }));
    } catch (error) {
      console.error(error);
      dispatch(authAction.initialize({ user: null }));
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const memoizedValue = useMemo<AuthContextType>(
    () => ({
      user: state.user,
      initialized: state.initialized,
      authenticated: !!state.user,
      dispatch,
    }),
    [state.initialized, state.user]
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}
