import { FC } from 'react';
import { useGetFavoritesQuery } from 'app/services/favoritesApi';
import { usePagination } from 'hooks';

import FoundUsersList from 'features/searchTasks/components/FoundUsersList';
import { BlockLoader, Pagination } from 'features/ui/components';
import { Group, Header } from '@vkontakte/vkui';

const FavoritesList: FC = () => {
  const { page, handleChange } = usePagination();

  const { data: foundUsers, isLoading } = useGetFavoritesQuery({
    page,
    per_page: 20
  });

  if (!foundUsers || isLoading) {
    return <BlockLoader />;
  }

  return (
    <Group>
      <Header mode="secondary">Избранное</Header>
      <FoundUsersList
        foundUsers={foundUsers.found_users}
        placeholder="Клиенты в избранном отсутствуют"
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
    </Group>
  );
};

export default FavoritesList;
