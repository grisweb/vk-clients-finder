import { PropsWithChildren } from 'react';
import {
  useForm,
  FormProvider,
  FieldValues,
  FieldValue,
  SubmitHandler
} from 'react-hook-form';
import { pickBy } from 'lodash';
import { FormLayout, FormStatus } from '@vkontakte/vkui';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import ruleMessages from '../../constants';

type FormProps<TFormValues extends FieldValues> = {
  onSubmit: SubmitHandler<TFormValues>;
  errorMessage?: string;
  schema?: yup.ObjectSchema<FieldValues>;
} & PropsWithChildren;

yup.setLocale({
  mixed: {
    required: ruleMessages.required
  }
});

const Form = <TFormValues extends FieldValues>({
  onSubmit,
  children,
  errorMessage,
  schema
}: FormProps<TFormValues>) => {
  const { reset, ...methods } = useForm({
    resolver: schema && yupResolver(schema)
  });

  const handleSubmit = (data: FieldValues) => {
    const submittedData = pickBy<FieldValue<FieldValues>>(
      data,
      (value) => value && value.length > 0
    );
    onSubmit(submittedData as TFormValues);
  };

  return (
    <FormProvider {...methods} reset={reset}>
      <FormLayout onSubmit={methods.handleSubmit(handleSubmit)} noValidate>
        {errorMessage && <FormStatus header={errorMessage} mode="error" />}
        {children}
      </FormLayout>
    </FormProvider>
  );
};

export default Form;
