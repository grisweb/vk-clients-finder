import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { range } from 'lodash';
import { CustomSelectOptionInterface } from '@vkontakte/vkui';

import { SelectField } from 'features/form/components';
import useDebounce from 'hooks/useDebounce';

import { useGetUniversitiesQuery } from 'app/services/vkApi';

import { CreateSearchTaskForm } from '../../../types';

const years = range(2030, 1945).map((value) => ({
  value,
  label: value.toString()
}));

const UniversityField: FC = () => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query);

  const handleChange = (evt: ChangeEvent) => {
    setQuery((evt as ChangeEvent<HTMLInputElement>).target.value);
  };

  const city = useWatch<CreateSearchTaskForm>({ name: 'city' }) as number;

  const { currentData: data } = useGetUniversitiesQuery(
    { city, q: debouncedQuery },
    {
      skip: !city
    }
  );

  const university = useWatch<CreateSearchTaskForm>({
    name: 'university'
  }) as number;

  const [universities, setUniversities] = useState<
    CustomSelectOptionInterface[]
  >([]);

  useEffect(() => {
    if (!city) {
      setUniversities([]);
    } else {
      setUniversities(
        data ? data.map(({ title, id }) => ({ label: title, value: id })) : []
      );
    }
  }, [city, data]);

  return (
    <>
      <SelectField
        label="Университет"
        name="university"
        placeholder="Выберете университет"
        options={universities}
        allowClearButton
        searchable
        valueAsNumber
        onInputChange={handleChange}
        disabled={!city}
        onBlurCapture={() => {
          setQuery('');
        }}
      />
      {university && (
        <SelectField
          placeholder="Выберете год выпуска"
          name="university_year"
          options={years}
          valueAsNumber
        />
      )}
    </>
  );
};

export default UniversityField;
