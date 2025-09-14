import { AuthActionType, type ActionsType, type AuthPayload } from '../types';
import { setSession } from './utils';

function initialize(payload: AuthPayload[AuthActionType.INITIAL]): ActionsType {
  return {
    type: AuthActionType.INITIAL,
    payload,
  };
}

function signIn(payload: AuthPayload[AuthActionType.SIGN_IN]): ActionsType {
  return {
    type: AuthActionType.SIGN_IN,
    payload,
  };
}

function signOut(): ActionsType {
  setSession(null);
  return {
    type: AuthActionType.SIGN_OUT,
  };
}

const authAction = {
  initialize,
  signIn,
  signOut,
};

export default authAction;
