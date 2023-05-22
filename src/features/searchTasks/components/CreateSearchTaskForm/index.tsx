import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Group } from '@vkontakte/vkui';

import { useCreateSearchTaskMutation } from 'app/services/searchTasksApi';
import {
  Form,
  TextField,
  Button,
  CheckboxField,
  ChipsField
} from 'features/form/components';
import { useSnackbar } from 'hooks';

import {
  AgeField,
  CityField,
  BirthField,
  SexField,
  StatusField
} from '../form';

import Separator from '../Separator';
import UniversityGroup from '../UniversityGroup';
import { CreateSearchTaskForm as CreateSearchTaskFormFields } from '../../types';

const CreateSearchTaskForm: FC = () => {
  const [create, { isLoading }] = useCreateSearchTaskMutation();

  const snackbar = useSnackbar();

  const navigate = useNavigate();

  const handleSubmit = async (data: CreateSearchTaskFormFields) => {
    try {
      await create(data).unwrap();
      navigate('/');
    } catch {
      snackbar({ title: 'Ошибка. Не удалось создать задачу' });
    }
  };

  return (
    <Group>
      <Form onSubmit={handleSubmit}>
        <TextField
          name="title"
          label="Название задачи"
          required
          placeholder="Введите заголовок"
        />
        <Separator />
        <AgeField />
        <Separator />
        <BirthField />
        <Separator />
        <CityField />
        <UniversityGroup />
        <Separator />
        <SexField />
        <StatusField />
        <CheckboxField name="has_photo" label="С фотографией" />
        <Separator />
        <ChipsField
          name="keywords"
          label="Ключевые слова"
          placeholder="Введите ключевые слова"
          required
        />
        <Button loading={isLoading}>Создать задачу</Button>
      </Form>
    </Group>
  );
};

export default CreateSearchTaskForm;
