import { type ActionsType, AuthActionType, type AuthState } from '../types';

export default function reducer(
  state: AuthState,
  action: ActionsType
): AuthState {
  if (action.type === AuthActionType.INITIAL) {
    return {
      ...state,
      user: action.payload.user,
      initialized: true,
    };
  }

  if (action.type === AuthActionType.SIGN_IN) {
    return {
      ...state,
      user: action.payload.user,
    };
  }

  if (action.type === AuthActionType.SIGN_OUT) {
    return {
      ...state,
      user: null,
    };
  }

  return state;
}
