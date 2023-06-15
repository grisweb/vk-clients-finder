import { FC } from 'react';
import { Separator, Spacing } from '@vkontakte/vkui';
import { useNavigate } from 'react-router-dom';

import * as yup from 'yup';
import ruleMessages from 'features/form/constants';

import { Button, Form, TextField } from 'features/form/components';
import { useRegisterMutation } from 'app/services/authApi';

import { RegisterRequest } from '../../types';

const RegisterForm: FC = () => {
  const [register, { isLoading, error }] = useRegisterMutation();

  const handleSubmit = async (data: RegisterRequest) => {
    register(data);
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/login');
  };

  const schema = yup.object({
    name: yup.string().required(),
    email: yup.string().email(ruleMessages.email).required(),
    password: yup
      .string()
      .min(8, ruleMessages.passwordLength)
      .matches(/[A-Z]/gm, ruleMessages.passwordUpperLetters)
      .matches(/[a-z]/gm, ruleMessages.passwordLowerLetters)
      .matches(/[0-9]/gm, ruleMessages.passwordNumbers)
      .required(),
    confirm_password: yup
      .string()
      .oneOf([yup.ref('password'), undefined], 'Пароли должны совпадать')
      .required()
  });

  return (
    <>
      <Form
        schema={schema}
        onSubmit={handleSubmit}
        errorMessage={error?.message}
      >
        <TextField name="name" label="Ваше имя" required />
        <TextField
          name="email"
          label="Ваш email"
          autoComplete="username"
          required
        />
        <TextField
          name="password"
          type="password"
          label="Ваш пароль"
          autoComplete="new-password"
          required
          helperText="Введите не менее 8 символов, включая числа, заглавные и строчные буквы."
        />
        <TextField
          name="confirm_password"
          type="password"
          label="Подтвердите пароль"
          autoComplete="new-password"
          required
        />
        <Button loading={isLoading}>Создать аккаунт</Button>
      </Form>
      <Spacing size={12}>
        <Separator />
      </Spacing>
      <Button type="button" onClick={handleClick} appearance="positive">
        Вход
      </Button>
    </>
  );
};

export default RegisterForm;
