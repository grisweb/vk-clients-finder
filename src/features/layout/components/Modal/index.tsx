import { FC } from 'react';
import { ModalRoot, ModalPage } from '@vkontakte/vkui';

import { useAppSelector } from 'app/hooks';

import VkConnectAction from 'features/auth/components/VkConnectAction';
import Modals from '../../constants';

const Modal: FC = () => {
  const activeModal = useAppSelector((state) => state.layout.activeModal);

  return (
    <ModalRoot activeModal={activeModal}>
      <ModalPage hideCloseButton id={Modals.VkConnect}>
        <VkConnectAction />
      </ModalPage>
    </ModalRoot>
  );
};

export default Modal;
