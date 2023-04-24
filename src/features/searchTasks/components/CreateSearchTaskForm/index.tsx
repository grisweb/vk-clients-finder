import { FC } from 'react';
import { CustomSelectOptionInterface, Group } from '@vkontakte/vkui';
import { FieldValues } from 'react-hook-form';

import { Form, TextField, SelectField, Button } from 'features/form/components';

const testOptions: CustomSelectOptionInterface[] = [
  {
    value: '14',
    label: 'от 14'
  },
  {
    value: '15',
    label: 'от 15'
  }
];

const CreateSearchTaskForm: FC = () => {
  const handleSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <Group>
      <Form onSubmit={handleSubmit}>
        <TextField
          name="title"
          label="Заголовок"
          required
          placeholder="Введите заголовок"
        />
        <SelectField
          name="age_from"
          label="Возраст"
          placeholder="От"
          options={testOptions}
          allowClearButton
        />
        <Button>Создать задачу</Button>
      </Form>
    </Group>
  );
};

export default CreateSearchTaskForm;
