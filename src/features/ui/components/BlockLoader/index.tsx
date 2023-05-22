import { FC } from 'react';
import { Group, Spinner } from '@vkontakte/vkui';

const BlockLoader: FC = () => {
  return (
    <Group>
      <Spinner size="medium" style={{ padding: '50px 0' }} />
    </Group>
  );
};

export default BlockLoader;
