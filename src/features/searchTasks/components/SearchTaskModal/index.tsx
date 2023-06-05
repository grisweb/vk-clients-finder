import { FC } from 'react';
import { Group, SimpleCell, InfoRow } from '@vkontakte/vkui';
import { capitalize } from 'lodash';

import { useAppSelector } from 'app/hooks';
import getEntries from 'utils/entries';

import SearchTaskParams from '../../constants';
import { SearchTaskParams as SearchTaskParamsType } from '../../types';

const SearchTaskModal: FC = () => {
  const taskParams = useAppSelector((state) => state.searchTasks.taskParams);

  const getValue = <T extends keyof SearchTaskParamsType>(
    key: T,
    value: SearchTaskParamsType[T]
  ) => {
    if (key === 'has_photo') {
      return 'Да';
    }

    if (key === 'birth_month') {
      return capitalize(
        new Date(0, value as number).toLocaleDateString('ru', {
          month: 'long'
        })
      );
    }

    if (key === 'keywords') {
      return (value as SearchTaskParamsType['keywords']).map((keyword) => (
        <div key={key}>{keyword}</div>
      ));
    }

    return value;
  };

  return taskParams ? (
    <Group>
      {getEntries(taskParams).map(([key, value]) => (
        <SimpleCell disabled key={key}>
          <InfoRow header={SearchTaskParams[key]}>
            {getValue(key, value)}
          </InfoRow>
        </SimpleCell>
      ))}
    </Group>
  ) : null;
};

export default SearchTaskModal;
