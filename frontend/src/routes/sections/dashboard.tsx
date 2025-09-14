import { createRoute, Outlet } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';
import { AuthGuard, RoleBasedGuard } from '~/auth/guard';
import { LoadingScreen } from '~/components/loading-screen';
import DashboardLayout from '~/layouts/dashboard';
import { Role } from '~/models/user.model';
import { rootRoute } from './root';

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: () => (
    <AuthGuard>
      <DashboardLayout>
        <RoleBasedGuard roles={[Role.SuperAdmin]}>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </RoleBasedGuard>
      </DashboardLayout>
    </AuthGuard>
  ),
});

const dashboardIndexRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/',
  component: lazy(() => import('~/views/dashboard/app')),
});

const gameRoute = createRoute({
  getParentRoute: () => dashboardRoute,
  path: '/game',
  component: () => <Outlet />,
});

const gameIndexRoute = createRoute({
  getParentRoute: () => gameRoute,
  path: '/',
  component: lazy(() => import('~/views/dashboard/game/list')),
});

const gameListRoute = createRoute({
  getParentRoute: () => gameRoute,
  path: '/list',
  component: lazy(() => import('~/views/dashboard/game/list')),
});

const gameNewRoute = createRoute({
  getParentRoute: () => gameRoute,
  path: '/new',
  component: lazy(() => import('~/views/dashboard/game/create')),
});

const gameEditRoute = createRoute({
  getParentRoute: () => gameRoute,
  path: '/$id/edit',
  component: lazy(() => import('~/views/dashboard/game/edit')),
});

export const dashboardRoutes = [
  dashboardRoute.addChildren([
    dashboardIndexRoute,
    gameRoute.addChildren([
      gameIndexRoute,
      gameListRoute,
      gameNewRoute,
      gameEditRoute,
    ]),
  ]),
];
