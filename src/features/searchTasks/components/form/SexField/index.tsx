import { FC } from 'react';
import { SelectField } from 'features/form/components';

const sexOptions = [
  {
    label: 'Женский',
    value: 1
  },
  {
    label: 'Мужской',
    value: 2
  }
];

const SexField: FC = () => (
  <SelectField
    label="Пол"
    placeholder="Выберете пол"
    name="sex"
    options={sexOptions}
    valueAsNumber
    allowClearButton
  />
);

export default SexField;
