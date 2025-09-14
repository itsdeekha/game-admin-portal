import { Dispatch } from 'react';
import { User } from '~/models/user.model';

export type ActionMapType<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

type AuthUser = User | null;

export interface AuthState {
  user: AuthUser;
  initialized: boolean;
}

export enum AuthActionType {
  INITIAL = 'INITIAL',
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
}

export type AuthPayload = {
  [AuthActionType.INITIAL]: {
    user: AuthUser;
  };
  [AuthActionType.SIGN_IN]: {
    user: AuthUser;
  };
  [AuthActionType.SIGN_OUT]: undefined;
};

export type ActionsType =
  ActionMapType<AuthPayload>[keyof ActionMapType<AuthPayload>];

export interface AuthContextType extends AuthState {
  authenticated: boolean;
  dispatch: Dispatch<ActionsType>;
}
