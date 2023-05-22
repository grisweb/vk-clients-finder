import { FC, useEffect, useState } from 'react';
import { useWatch } from 'react-hook-form';
import { range, capitalize } from 'lodash';

import { SelectField } from 'features/form/components';
import { CustomSelectOptionInterface } from '@vkontakte/vkui';

const yearOptions = range(2009, 1901).map((value) => ({
  label: value.toString(),
  value
}));

const monthOptions = Array.from({ length: 12 }, (_, i) => ({
  label: capitalize(new Date(i, i).toLocaleDateString('ru', { month: 'long' })),
  value: i + 1
}));

const daysInMonth = (month: number, year?: number) =>
  new Date(year || 0, month, 0).getDate();

const BirthField: FC = () => {
  const [dayOptions, setDayOptions] = useState<CustomSelectOptionInterface[]>(
    []
  );

  const year = useWatch({ name: 'birth_year' });
  const month = useWatch({ name: 'birth_month' });

  useEffect(() => {
    let daysCount = 31;

    if (month) {
      daysCount = daysInMonth(month, year);
    }

    const options = range(1, daysCount + 1).map((value) => ({
      label: value.toString(),
      value
    }));

    setDayOptions(options);
  }, [year, month]);

  return (
    <>
      <SelectField
        label="Дата рождения"
        name="birth_year"
        options={yearOptions}
        placeholder="Год"
        allowClearButton
        valueAsNumber
      />
      <SelectField
        name="birth_month"
        options={monthOptions}
        placeholder="Месяц"
        allowClearButton
        valueAsNumber
      />
      <SelectField
        name="birth_day"
        options={dayOptions}
        placeholder="День"
        allowClearButton
        valueAsNumber
      />
    </>
  );
};

export default BirthField;
