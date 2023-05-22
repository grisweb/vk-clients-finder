import { FC } from 'react';
import { Spacing } from '@vkontakte/vkui';
import { Separator as VkSeparator } from '@vkontakte/vkui/dist/components/Separator/Separator';

const Separator: FC = () => (
  <Spacing size={8}>
    <VkSeparator />
  </Spacing>
);

export default Separator;
