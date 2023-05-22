import { ChangeEvent, FC, useState } from 'react';
import { CustomSelectOption } from '@vkontakte/vkui';

import useDebounce from 'hooks/useDebounce';
import { useGetCitiesQuery } from 'app/services/vkApi';
import { SelectField } from 'features/form/components';

const CityField: FC = () => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 400);

  const { data } = useGetCitiesQuery(debouncedQuery);

  const handleChange = (evt: ChangeEvent) => {
    setQuery((evt as ChangeEvent<HTMLInputElement>).target.value);
  };

  return (
    <SelectField
      label="Город"
      name="city"
      placeholder="Выберете город"
      options={
        data
          ? data.map((value) => ({
              ...value,
              label: value.title,
              value: value.id
            }))
          : []
      }
      onInputChange={handleChange}
      searchable
      renderOption={({ option, ...otherProps }) => (
        <CustomSelectOption description={option.region} {...otherProps} />
      )}
      valueAsNumber
      allowClearButton
      onBlurCapture={() => {
        setQuery('');
      }}
    />
  );
};

export default CityField;
