import { FC, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
  ActionSheet,
  ActionSheetDefaultIosCloseItem,
  ActionSheetItem,
  Cell,
  Div,
  Group,
  Header,
  IconButton,
  Title
} from '@vkontakte/vkui';
import {
  Icon16MoreVertical,
  Icon20DeleteOutline,
  Icon20DocumentListOutline
} from '@vkontakte/icons';

import {
  useGetFoundUsersQuery,
  useGetSearchTaskQuery
} from 'app/services/searchTasksApi';

import { BlockLoader, Pagination } from 'features/ui/components';
import { usePagination } from 'hooks';
import { useAppDispatch } from 'app/hooks';
import { setActiveModal, setPopout } from 'features/layout/layoutSlice';
import Modals from 'features/layout/constants';

import FoundUsersList from '../FoundUsersList';
import { setTaskParams } from '../../searchTasksSlice';

const SearchTaskDetail: FC = () => {
  const { taskId } = useParams();

  const { page, handleChange } = usePagination();

  const {
    data: foundUsers,
    isLoading: usersIsLoading,
    refetch: usersRefetch
  } = useGetFoundUsersQuery({
    taskId: taskId as string,
    page,
    per_page: 20
  });

  const {
    data: task,
    isLoading: taskIsLoading,
    refetch: taskRefetch
  } = useGetSearchTaskQuery(taskId as string);

  useEffect(() => {
    taskRefetch();
    usersRefetch();
  }, [taskRefetch, usersRefetch]);

  const taskMoreRef = useRef<SVGSVGElement>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (task) {
      dispatch(setTaskParams(task.params));
    }
  }, [dispatch, task]);

  const handleClose = () => {
    dispatch(setPopout(null));
  };

  const modalHandleClick = () => {
    dispatch(setActiveModal(Modals.TaskModal));
  };

  const moreHandleClick = () => {
    dispatch(
      setPopout(
        <ActionSheet
          iosCloseItem={<ActionSheetDefaultIosCloseItem />}
          onClose={handleClose}
          toggleRef={taskMoreRef}
        >
          <ActionSheetItem
            autoClose
            onClick={modalHandleClick}
            before={<Icon20DocumentListOutline />}
          >
            Подробнее
          </ActionSheetItem>
          <ActionSheetItem
            onClick={() => {
              window.location.href = `${process.env.REACT_APP_API_URL}/found-users/csv?task_id=${taskId}`;
            }}
            autoClose
            before={<Icon20DocumentListOutline />}
          >
            Экспорт в CSV
          </ActionSheetItem>
          <ActionSheetItem
            autoClose
            before={<Icon20DeleteOutline />}
            mode="destructive"
          >
            Удалить задачу
          </ActionSheetItem>
        </ActionSheet>
      )
    );
  };

  if (usersIsLoading || taskIsLoading) {
    return <BlockLoader />;
  }

  if (!foundUsers || !task) {
    return <div>Страница не существует!</div>;
  }

  return (
    <>
      <Group>
        <Cell
          disabled
          after={
            <IconButton aria-label="Действия">
              <Icon16MoreVertical
                onClick={moreHandleClick}
                getRootRef={taskMoreRef}
              />
            </IconButton>
          }
        >
          <Title level="3">{task.title}</Title>
        </Cell>
      </Group>
      <Group>
        <Header mode="secondary">
          Найденные клиенты ({foundUsers.meta.total})
        </Header>
        {task.status === 'in_progress' ? (
          <Div>Идет поиск...</Div>
        ) : (
          <>
            <FoundUsersList
              foundUsers={foundUsers.found_users}
              placeholder="Клиенты не найдены"
            />
            {foundUsers.meta.count < foundUsers.meta.total && (
              <Pagination
                currentPage={page}
                totalPages={Math.ceil(
                  foundUsers.meta.total / foundUsers.meta.per_page
                )}
                onChange={handleChange}
              />
            )}
          </>
        )}
      </Group>
    </>
  );
};

export default SearchTaskDetail;
