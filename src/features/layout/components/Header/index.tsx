import { FC } from 'react';
import { Title, IconButton } from '@vkontakte/vkui';
import { Icon28MoonOutline, Icon28SunOutline } from '@vkontakte/icons';
import { useAppDispatch, useAppSelector } from 'app/hooks';

import { toggleAppearance } from '../../layoutSlice';
import styles from './Header.module.scss';

const iconSize = {
  width: 24,
  height: 24
};

const Header: FC = () => {
  const appearance = useAppSelector((state) => state.layout.appearance);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(toggleAppearance());
  };

  return (
    <div className={styles.header}>
      <div className="container">
        <div className={styles['header-content']}>
          <Title level="1">VK Clients Finder</Title>
          <IconButton aria-label="Изменить тему" onClick={handleClick}>
            {appearance === 'dark' ? (
              <Icon28MoonOutline {...iconSize} />
            ) : (
              <Icon28SunOutline {...iconSize} />
            )}
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default Header;
