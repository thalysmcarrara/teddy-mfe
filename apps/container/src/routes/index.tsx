import { Navigate, useRoutes } from 'react-router-dom';

import { AuthLayout } from '@src/layouts/auth-layout'
import { DashboardLayout } from '@src/layouts/dashboard-layout'
import { lazy } from 'react';

const LoginPage = lazy(() => import('@src/pages/auth/login'));

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: (
        <DashboardLayout><>Dashboard content</></DashboardLayout>
      )
    },
    {
      path: '/',
      element: (
        <AuthLayout>
          <LoginPage />
        </AuthLayout>
      ),
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
