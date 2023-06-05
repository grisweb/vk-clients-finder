import { FC } from 'react';
import { ModalRoot, ModalPage, ModalPageHeader } from '@vkontakte/vkui';

import { useAppDispatch, useAppSelector } from 'app/hooks';

import VkConnectAction from 'features/auth/components/VkConnectAction';
import SearchTaskModal from 'features/searchTasks/components/SearchTaskModal';

import Modals from '../../constants';
import { setActiveModal } from '../../layoutSlice';

const Modal: FC = () => {
  const activeModal = useAppSelector((state) => state.layout.activeModal);

  const dispatch = useAppDispatch();
  const taskHandleClose = () => {
    dispatch(setActiveModal(null));
  };

  return (
    <ModalRoot activeModal={activeModal}>
      <ModalPage hideCloseButton id={Modals.VkConnect}>
        <VkConnectAction />
      </ModalPage>
      <ModalPage
        onClose={taskHandleClose}
        id={Modals.TaskModal}
        header={<ModalPageHeader>Параметры задачи</ModalPageHeader>}
      >
        <SearchTaskModal />
      </ModalPage>
    </ModalRoot>
  );
};

export default Modal;
