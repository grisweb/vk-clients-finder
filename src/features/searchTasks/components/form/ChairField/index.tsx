import { FC, useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { CustomSelectOptionInterface } from '@vkontakte/vkui';

import { SelectField } from 'features/form/components';
import { useGetChairsQuery } from 'app/services/vkApi';

import { CreateSearchTaskForm } from '../../../types';

const ChairField: FC = () => {
  const faculty = useWatch<CreateSearchTaskForm>({
    name: 'university_faculty'
  }) as number;

  const { currentData: data } = useGetChairsQuery(faculty, { skip: !faculty });

  const [chairs, setChairs] = useState<CustomSelectOptionInterface[]>([]);

  useEffect(() => {
    if (!faculty) {
      setChairs([]);
    } else {
      setChairs(
        data ? data.map(({ title, id }) => ({ label: title, value: id })) : []
      );
    }
  }, [faculty, data]);

  return faculty ? (
    <SelectField
      placeholder="Выберете специальность"
      name="university_chair"
      options={chairs}
      valueAsNumber
    />
  ) : null;
};

export default ChairField;
