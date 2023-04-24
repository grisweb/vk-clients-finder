import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spacing, Separator, Link, Text } from '@vkontakte/vkui';
import * as yup from 'yup';

import ruleMessages from 'features/form/constants';

import { useLoginMutation } from 'app/services/authApi';
import { Form, TextField, Button } from 'features/form/components';

import { LoginRequest } from 'features/auth/types';

import styles from './LoginForm.module.scss';

const LoginForm: FC = () => {
  const [login, { isLoading, error }] = useLoginMutation();

  const handleSubmit = async (data: LoginRequest) => {
    await login(data);
  };

  const schema = yup.object({
    email: yup.string().email(ruleMessages.email).required(),
    password: yup
      .string()
      .min(8, ruleMessages.passwordLength)
      .matches(/[A-Z]/gm, ruleMessages.passwordUpperLetters)
      .matches(/[a-z]/gm, ruleMessages.passwordLowerLetters)
      .matches(/[0-9]/gm, ruleMessages.passwordNumbers)
      .required()
  });

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/register');
  };

  return (
    <>
      <Form
        schema={schema}
        onSubmit={handleSubmit}
        errorMessage={error?.message}
      >
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
          autoComplete="current-password"
          required
          // helperText="Введите не менее 8 символов, включая числа, заглавные и строчные буквы."
        />
        <Button loading={isLoading}>Войти</Button>
        <Text className={styles['forgot-link']}>
          <Link href="#forgot">Забыли пароль?</Link>
        </Text>
      </Form>
      <Spacing size={12}>
        <Separator />
      </Spacing>
      <Button type="button" onClick={handleClick} appearance="positive">
        Регистрация
      </Button>
    </>
  );
};

export default LoginForm;
