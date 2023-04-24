import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Button,
  Group,
  Placeholder,
  SimpleCell,
  Header
} from '@vkontakte/vkui';
import {
  Icon56UsersOutline,
  Icon28Clock,
  Icon28CancelCircleFillRed,
  Icon28CheckCircleFill
} from '@vkontakte/icons';

const HomePage: FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/search-tasks/create');
  };

  return (
    <>
      <Group>
        <Header mode="secondary">Список задач</Header>
        <SimpleCell before={<Icon28Clock />}>
          Поиск клиентов в младшую группу по английскому языку
        </SimpleCell>
        <SimpleCell before={<Icon28CheckCircleFill />}>
          Поиск менеджера
        </SimpleCell>
        <SimpleCell before={<Icon28CheckCircleFill />}>
          Поиск клиентов во взрослые группы по английскому языку
        </SimpleCell>
        <SimpleCell before={<Icon28CancelCircleFillRed />}>
          Поиск преподавателей по английскому языку
        </SimpleCell>
      </Group>
      <Group>
        <Placeholder
          icon={<Icon56UsersOutline />}
          header="Вы не создали ни одной задачи"
          action={
            <Button size="m" onClick={handleClick}>
              Создать задачу
            </Button>
          }
        >
          Создайте задачу на поиск потенциальных клиентов вашей фирмы
        </Placeholder>
      </Group>
    </>
  );
};

export default HomePage;
