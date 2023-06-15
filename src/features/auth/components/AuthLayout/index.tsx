import { FC } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Div, Group, Title } from '@vkontakte/vkui';

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
      <div className={styles['auth-layout-split']}>
        <Div className={styles['desc-block']}>
          <Title level="1" className={styles.title}>
            VK Clients Finder
          </Title>
          <Title level="2" className={styles.description}>
            Данный веб-сервис позволит вам найти потенциальных клиентов для
            вашей фирмы на основе данных из социальной сети ВКонтакте
          </Title>
        </Div>
        <Group className={styles['form-block']}>
          <Title className={styles['form-title']}>
            {location.pathname === '/login' ? 'Вход' : 'Регистрация'}
          </Title>
          <Outlet />
        </Group>
      </div>
    </div>
  );
};

export default AuthLayout;
