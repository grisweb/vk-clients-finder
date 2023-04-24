import { FC, useEffect } from 'react';
import { CustomSelect, FormItem, SelectProps } from '@vkontakte/vkui';
import { useController, useFormContext } from 'react-hook-form';

import ruleMessages from '../../constants';

interface SelectFieldProps extends SelectProps {
  name: string;
  label?: string;
  required?: boolean;
  helperText?: string;
}

const SelectField: FC<SelectFieldProps> = ({
  name,
  label,
  helperText,
  required = false,
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
      top={label && `${label}${required ? ' *' : ''}`}
      bottom={fieldState.error ? fieldState.error.message : helperText}
      status={fieldState.error ? 'error' : 'default'}
    >
      <CustomSelect
        {...field}
        getRef={ref}
        value={value || ''}
        {...otherProps}
      />
    </FormItem>
  );
};

export default SelectField;
