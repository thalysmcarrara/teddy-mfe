import { Navigate, useRoutes } from 'react-router-dom';
import { lazy } from 'react';
import { AuthLayout } from '@src/layouts/auth-layout'
import { DashboardLayout } from '@src/layouts/dashboard-layout'
import { AuthGuard, GuestGuard } from '@src/auth/guard';
import { paths } from './paths';

const LoginPage = lazy(() => import('@src/pages/auth/login'));

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: paths.customers,
      element: (
        <AuthGuard>
          <DashboardLayout>Customers Page</DashboardLayout>
        </AuthGuard>
      )
    },
    {
      path: paths.selected,
      element: (
        <AuthGuard>
          <DashboardLayout><>Selected Page</></DashboardLayout>
        </AuthGuard>
      )
    },
    {
      path: paths.login,
      element: (
        <GuestGuard>
          <AuthLayout>
            <LoginPage />
          </AuthLayout>
        </GuestGuard>
      ),
    },
    {
      path: paths.home,
      element: <Navigate to={paths.customers} replace />
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
