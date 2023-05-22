import { FC } from 'react';
import { SelectField } from 'features/form/components';

const statusOptions = [
  {
    label: 'Не женат (не замужем)',
    value: 1
  },
  {
    label: 'Встречается',
    value: 2
  },
  {
    label: 'Помолвлен(-а)',
    value: 3
  },
  {
    label: 'Женат (замужем)',
    value: 4
  },
  {
    label: 'Всё сложно',
    value: 5
  },
  {
    label: 'В активном поиске',
    value: 6
  },
  {
    label: 'Влюблён(-а)',
    value: 7
  },
  {
    label: 'В гражданском браке',
    value: 8
  }
];

const StatusField: FC = () => (
  <SelectField
    label="Семейное положение"
    placeholder="Выберете семейное положение"
    name="status"
    options={statusOptions}
    valueAsNumber
    allowClearButton
  />
);

export default StatusField;
