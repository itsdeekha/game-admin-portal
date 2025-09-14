import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  redirect,
} from '@tanstack/react-router';

import { Suspense } from 'react';
import { LoadingScreen } from '~/components/loading-screen';
import { PATH_AFTER_LOGIN } from '~/configs/global.config';
import { authRoutes } from './auth';
import { dashboardRoutes } from './dashboard';

export const rootRoute = createRootRoute({
  component: () => (
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: () => {
    throw redirect({
      to: PATH_AFTER_LOGIN,
      replace: true,
    });
  },
});

// Create the route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  ...authRoutes,
  ...dashboardRoutes,
]);

// Create and export the router
export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  defaultPreloadStaleTime: 0,
});
