import { FC } from 'react';
import { Div, Group, Header, Placeholder } from '@vkontakte/vkui';
import {
  Icon28CancelCircleFillRed,
  Icon28CheckCircleFill,
  Icon28Clock,
  Icon56UsersOutline,
  Icon24AddCircleOutline
} from '@vkontakte/icons';

import { useGetSearchTasksQuery } from 'app/services/searchTasksApi';
import {
  SimpleCellLink,
  ButtonLink,
  Pagination,
  BlockLoader
} from 'features/ui/components';

import { usePagination } from 'hooks';

const SearchTasksList: FC = () => {
  const { page, handleChange } = usePagination();

  const { data, isLoading } = useGetSearchTasksQuery(
    { page, per_page: 20 },
    { pollingInterval: 5000 }
  );

  const icons = {
    in_progress: <Icon28Clock />,
    completed: <Icon28CheckCircleFill />,
    error: <Icon28CancelCircleFillRed />
  };

  if (isLoading) {
    return <BlockLoader />;
  }

  return data?.meta.total ? (
    <>
      <Group>
        <SimpleCellLink
          to="/search-tasks/create"
          before={<Icon24AddCircleOutline />}
        >
          Создать задачу
        </SimpleCellLink>
      </Group>
      <Group>
        <Header mode="secondary">Список задач</Header>
        {data.tasks.map(({ id, title, status }) => (
          <SimpleCellLink
            key={id}
            to={`/search-tasks/${id}`}
            before={icons[status]}
          >
            {title}
          </SimpleCellLink>
        ))}
        {data.meta.count < data.meta.total && (
          <Div>
            <Pagination
              currentPage={page}
              totalPages={Math.ceil(data.meta.total / data.meta.per_page)}
              onChange={handleChange}
            />
          </Div>
        )}
      </Group>
    </>
  ) : (
    <Group>
      <Placeholder
        icon={<Icon56UsersOutline />}
        header="Вы не создали ни одной задачи"
        action={
          <ButtonLink to="/search-tasks/create" size="m">
            Создать задачу
          </ButtonLink>
        }
      >
        Создайте задачу на поиск потенциальных клиентов вашей фирмы
      </Placeholder>
    </Group>
  );
};

export default SearchTasksList;
