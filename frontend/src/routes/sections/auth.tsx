import { createRoute, Outlet } from '@tanstack/react-router';
import { lazy } from 'react';

import { GuestGuard } from '~/auth/guard';
import CompactLayout from '~/layouts/compact';
import { rootRoute } from './root';

const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/auth',
  component: () => (
    <GuestGuard>
      <CompactLayout>
        <Outlet />
      </CompactLayout>
    </GuestGuard>
  ),
});

const signInRoute = createRoute({
  getParentRoute: () => authRoute,
  path: '/sign-in',
  component: lazy(() => import('~/views/auth/sign-in')),
});

export const authRoutes = [authRoute.addChildren([signInRoute])];
