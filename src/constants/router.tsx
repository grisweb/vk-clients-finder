import { createBrowserRouter } from 'react-router-dom';

import { CreateSearchTaskPage, HomePage, LoginPage, RegisterPage } from 'pages';
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
            index: true,
            element: <HomePage />
          },
          {
            path: 'search-tasks/create',
            element: <CreateSearchTaskPage />
          }
        ]
      }
    ]
  }
]);

export default router;
