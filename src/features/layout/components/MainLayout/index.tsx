import { FC, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {
  CellButton,
  IconButton,
  PanelHeader,
  SplitCol,
  SplitLayout,
  Div,
  Snackbar,
  Title,
  unstable_Popover as Popover
} from '@vkontakte/vkui';
import {
  Icon28User,
  Icon28ErrorCircleOutline,
  Icon28ListBulletSquareOutline,
  Icon28ListCheckOutline
} from '@vkontakte/icons';

import { SimpleCellLink } from 'features/ui/components';
import useVkConnect from 'features/auth/hooks/useVkConnect';
import { useAppSelector, useAppDispatch } from 'app/hooks';
import { getToken } from 'features/auth/authSlice';
import { useGetMeQuery, useLogoutMutation } from 'app/services/authApi';

import { snackbar } from '../../layoutSlice';
import FullScreenLoader from '../FullScreenLoader';
import Modal from '../Modal';
import styles from './MainLayout.module.scss';

const MainLayout: FC = () => {
  const token = useAppSelector(getToken);
  const snackbarState = useAppSelector((state) => state.layout.snackbar);
  const dispatch = useAppDispatch();

  const { data: user, isFetching } = useGetMeQuery(null, {
    skip: !token
  });

  const [shown, setShown] = useState(false);

  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    await logout(null);
  };

  const { isConnecting } = useVkConnect();

  const popout = useAppSelector((state) => state.layout.popout);

  if (isFetching || isConnecting) {
    return <FullScreenLoader />;
  }

  if (!isFetching && !user) {
    return <Navigate to="/login" />;
  }

  return (
    <SplitLayout
      className={styles['main-layout']}
      header={<PanelHeader separator={false} />}
      modal={<Modal />}
      popout={popout}
    >
      <SplitCol fixed width={280} maxWidth={280}>
        <PanelHeader
          before={
            <Div>
              <Title>VK Clients Finder</Title>
            </Div>
          }
        />
        <div>
          <SimpleCellLink
            className={styles['nav-link']}
            before={<Icon28ListBulletSquareOutline />}
            to="/search-tasks"
          >
            Задачи
          </SimpleCellLink>
          <SimpleCellLink
            className={styles['nav-link']}
            before={<Icon28ListCheckOutline />}
            to="/"
          >
            Избранное
          </SimpleCellLink>
        </div>
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

      {snackbarState && (
        <Snackbar
          onClose={() => dispatch(snackbar(null))}
          duration={snackbarState.duration}
          before={
            <Icon28ErrorCircleOutline fill="var(--vkui--color_icon_negative)" />
          }
        >
          {snackbarState.title}
        </Snackbar>
      )}
    </SplitLayout>
  );
};

export default MainLayout;
