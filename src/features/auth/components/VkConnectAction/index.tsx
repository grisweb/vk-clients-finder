import { FC } from 'react';
import {
  Button,
  FormItem,
  Group,
  Title,
  Headline,
  Spacing
} from '@vkontakte/vkui';

import vkConfig from 'config/vk';

import styles from './VkConnectAction.module.scss';

const VkConnectAction: FC = () => {
  const handleClick = () => {
    const searchParams = new URLSearchParams({
      scope: 'offline',
      response_type: 'code',
      display: 'page',
      ...vkConfig
    });

    window.location.href = `https://oauth.vk.com/authorize?${searchParams}`;
  };

  return (
    <Group className={styles['modal-wrap']}>
      <FormItem>
        <Title level="2">Подключите свой аккаунт VK</Title>
        <Spacing size={12} />
        <Headline className={styles['sub-text']}>
          Для использования приложения необходимо подключить свой аккаунт VK
        </Headline>
      </FormItem>
      <FormItem>
        <Button size="l" mode="primary" stretched onClick={handleClick}>
          Подключить
        </Button>
      </FormItem>
    </Group>
  );
};

export default VkConnectAction;
