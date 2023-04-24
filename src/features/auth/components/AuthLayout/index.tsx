import { FC } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Group, Title } from '@vkontakte/vkui';

import FullScreenLoader from 'features/layout/components/FullScreenLoader';

import { useGetMeQuery } from 'app/services/authApi';
import { useAppSelector } from 'app/hooks';
import { getToken } from '../../authSlice';

import styles from './AuthLayout.module.scss';

const AuthLayout: FC = () => {
  const location = useLocation();

  const token = useAppSelector(getToken);

  const { currentData: data, isLoading } = useGetMeQuery(null, {
    skip: !token
  });

  if (!isLoading && data) {
    return <Navigate to="/" />;
  }

  if (isLoading && !data) {
    return <FullScreenLoader />;
  }

  return (
    <div className={styles['auth-layout']}>
      <Group className={styles['form-block']}>
        <Title className={styles['form-title']}>
          {location.pathname === '/login' ? 'Вход' : 'Регистрация'}
        </Title>
        <Outlet />
      </Group>
    </div>
  );
};

export default AuthLayout;
