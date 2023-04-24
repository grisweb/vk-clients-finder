import { FC, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {
  SplitCol,
  SplitLayout,
  Group,
  Cell,
  CellButton,
  PanelHeader,
  Title,
  unstable_Popover as Popover,
  IconButton
} from '@vkontakte/vkui';
import { Icon28User } from '@vkontakte/icons';

import { useAppSelector } from 'app/hooks';
import { getToken } from 'features/auth/authSlice';
import { useGetMeQuery, useLogoutMutation } from 'app/services/authApi';

import FullScreenLoader from '../FullScreenLoader';
import styles from './MainLayout.module.scss';

const MainLayout: FC = () => {
  const token = useAppSelector(getToken);

  const { data: user, isFetching } = useGetMeQuery(null, {
    skip: !token
  });

  const [shown, setShown] = useState(false);

  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    await logout(null);
  };

  if (isFetching) {
    return <FullScreenLoader />;
  }

  if (!isFetching && !user) {
    return <Navigate to="/login" />;
  }

  return (
    <SplitLayout
      className={styles['main-layout']}
      header={<PanelHeader separator={false} />}
    >
      <SplitCol fixed width={280} maxWidth={280}>
        <PanelHeader before={<Title>VK Clients Finder</Title>} />
        <Group>
          <Cell>Запросы</Cell>
        </Group>
      </SplitCol>
      <SplitCol width="100%" maxWidth="560px" stretchedOnMobile autoSpaced>
        <div>
          <PanelHeader
            after={
              <Popover
                action="click"
                shown={shown}
                onShownChange={setShown}
                content={
                  <>
                    <CellButton centered>Профиль</CellButton>
                    <CellButton centered onClick={handleLogout}>
                      Выйти
                    </CellButton>
                  </>
                }
              >
                <IconButton size={28} aria-label="Меню">
                  <Icon28User />
                </IconButton>
              </Popover>
            }
          />
          <Outlet />
        </div>
      </SplitCol>
    </SplitLayout>
  );
};

export default MainLayout;
