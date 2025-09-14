import { createSigner, createVerifier } from 'fast-jwt';
import { config } from '~/config';

const signSync = createSigner({
  key: config.auth.secret,
  expiresIn: config.auth.expires,
});

export function signJwt(payload: string | Buffer | object) {
  return signSync(payload);
}

const verifySync = createVerifier({
  key: config.auth.secret,
});

export function verifyJwt<T>(jwt: string): T {
  return verifySync(jwt);
}
