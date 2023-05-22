import { FC, useEffect, useState } from 'react';
import { CustomSelectOptionInterface } from '@vkontakte/vkui';

import { SelectField } from 'features/form/components';
import { useGetFacultiesQuery } from 'app/services/vkApi';
import { useWatch } from 'react-hook-form';

import { CreateSearchTaskForm } from '../../../types';

const FacultyField: FC = () => {
  const university = useWatch<CreateSearchTaskForm>({
    name: 'university'
  }) as number;

  const { currentData: data } = useGetFacultiesQuery(university, {
    skip: !university
  });

  const [faculties, setFaculties] = useState<CustomSelectOptionInterface[]>([]);

  useEffect(() => {
    if (!university) {
      setFaculties([]);
    } else {
      setFaculties(
        data ? data.map(({ title, id }) => ({ label: title, value: id })) : []
      );
    }
  }, [university, data]);

  return university ? (
    <SelectField
      placeholder="Выберете факультет"
      name="university_faculty"
      options={faculties}
      searchable
      valueAsNumber
      allowClearButton
    />
  ) : null;
};

export default FacultyField;
