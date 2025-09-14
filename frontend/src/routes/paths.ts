const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

export const paths = {
  // AUTH
  auth: {
    signIn: `${ROOTS.AUTH}/sign-in`,
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    game: {
      root: `${ROOTS.DASHBOARD}/game`,
      new: `${ROOTS.DASHBOARD}/game/new`,
      list: `${ROOTS.DASHBOARD}/game/list`,
      edit: (id: number) => `${ROOTS.DASHBOARD}/game/${id}/edit`,
    },
  },
};
