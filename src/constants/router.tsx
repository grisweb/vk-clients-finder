import { createBrowserRouter, Navigate } from 'react-router-dom';

import {
  CreateSearchTaskPage,
  HomePage,
  LoginPage,
  RegisterPage,
  FoundUsersPage
} from 'pages';
import { MainLayout } from 'features/layout/components';
import AuthLayout from 'features/auth/components/AuthLayout';

const router = createBrowserRouter([
  {
    path: '/',
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: 'login',
            element: <LoginPage />
          },
          {
            path: 'register',
            element: <RegisterPage />
          }
        ]
      },
      {
        element: <MainLayout />,
        children: [
          {
            path: '/',
            element: <Navigate to="/search-tasks" replace />
          },
          {
            path: 'search-tasks',
            element: <HomePage />
          },
          {
            path: 'search-tasks/create',
            element: <CreateSearchTaskPage />
          },
          {
            path: 'search-tasks/:taskId',
            element: <FoundUsersPage />
          }
        ]
      }
    ]
  }
]);

export default router;
