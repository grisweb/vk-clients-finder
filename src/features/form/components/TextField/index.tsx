import { FC, useEffect } from 'react';
import { useFormContext, useController } from 'react-hook-form';
import { FormItem, Input, InputProps } from '@vkontakte/vkui';

import ruleMessages from '../../constants';

interface TextFieldProps extends InputProps {
  name: string;
  label: string;
  helperText?: string;
}

const TextField: FC<TextFieldProps> = ({
  name,
  label,
  required = false,
  helperText,
  ...otherProps
}) => {
  const { control } = useFormContext();

  const {
    fieldState,
    field: { value, ref, ...field }
  } = useController({
    name,
    control,
    rules: {
      required: required ? ruleMessages.required : undefined
    },
    defaultValue: null
  });

  useEffect(() => {
    if (value === '') {
      field.onChange(null);
    }
  }, [field, value]);

  return (
    <FormItem
      top={`${label}${required ? ' *' : ''}`}
      bottom={fieldState.error ? fieldState.error.message : helperText}
      status={fieldState.error ? 'error' : 'default'}
    >
      <Input
        {...field}
        getRef={ref}
        value={value || ''}
        max={255}
        {...otherProps}
      />
    </FormItem>
  );
};

export default TextField;
