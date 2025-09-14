import http from '~/services/http';

export const ACCESS_TOKEN_STORAGE_KEY = 'accessToken';

export const setSession = (accessToken: string | null) => {
  if (accessToken) {
    localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, accessToken);
    http.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
    delete http.defaults.headers.common.Authorization;
  }
};
