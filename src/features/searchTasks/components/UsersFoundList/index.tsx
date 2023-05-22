import { FC } from 'react';
import { useParams } from 'react-router-dom';
import {
  Div,
  Group,
  Header,
  SimpleCell,
  Avatar,
  IconButton,
  Cell,
  Title
} from '@vkontakte/vkui';
import { Icon16MoreVertical } from '@vkontakte/icons';

import {
  useGetFoundUsersQuery,
  useGetSearchTaskQuery
} from 'app/services/searchTasksApi';
import { BlockLoader, Pagination } from 'features/ui/components';
import { usePagination } from 'hooks';

const UsersFoundList: FC = () => {
  const { taskId } = useParams();

  const { page, handleChange } = usePagination();

  const { data: foundUsers, isLoading: usersIsLoading } = useGetFoundUsersQuery(
    {
      taskId: taskId as string,
      page,
      per_page: 20
    }
  );

  const { data: task, isLoading: taskIsLoading } = useGetSearchTaskQuery(
    taskId as string
  );

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
              <Icon16MoreVertical />
            </IconButton>
          }
        >
          <Title level="3">{task.title}</Title>
        </Cell>
      </Group>
      <Group>
        <Header mode="secondary">Найденные клиенты</Header>
        {foundUsers.found_users.length ? (
          <>
            {foundUsers.found_users.map(
              ({ id, vk_id, first_name, last_name, img_url }) => (
                <SimpleCell
                  Component="a"
                  href={`https://vk.com/id${vk_id}`}
                  target="_blank"
                  key={id}
                  before={<Avatar size={40} src={img_url} />}
                  after={
                    <IconButton
                      onClick={(evt) => evt.preventDefault()}
                      aria-label="действия"
                    >
                      <Icon16MoreVertical />
                    </IconButton>
                  }
                >
                  {first_name} {last_name}
                </SimpleCell>
              )
            )}
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
        ) : (
          <Div>Клиенты не найдены</Div>
        )}
      </Group>
    </>
  );
};

export default UsersFoundList;
