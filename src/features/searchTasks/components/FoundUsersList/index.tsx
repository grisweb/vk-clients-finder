import { FC } from 'react';
import { Avatar, Div, IconButton, SimpleCell } from '@vkontakte/vkui';
import { Icon16MoreVertical } from '@vkontakte/icons';

import { FoundUser } from '../../types';

interface FoundUsersListProps {
  foundUsers: FoundUser[];
  placeholder: string;
}

const FoundUsersList: FC<FoundUsersListProps> = ({
  foundUsers,
  placeholder
}) => {
  return !foundUsers.length ? (
    <Div>{placeholder}</Div>
  ) : (
    <>
      {foundUsers.map(({ id, vk_id, first_name, last_name, img_url }) => (
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
      ))}
    </>
  );
};

export default FoundUsersList;
