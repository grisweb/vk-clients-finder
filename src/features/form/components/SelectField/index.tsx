import { FC, useEffect } from 'react';
import { CustomSelect, FormItem, SelectProps } from '@vkontakte/vkui';
import { useController, useFormContext } from 'react-hook-form';

import ruleMessages from '../../constants';

interface SelectFieldProps extends SelectProps {
  name: string;
  label?: string;
  required?: boolean;
  helperText?: string;
  valueAsNumber?: boolean;
}

const SelectField: FC<SelectFieldProps> = ({
  name,
  label,
  helperText,
  required = false,
  valueAsNumber,
  options,
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
    defaultValue: null,
    shouldUnregister: true
  });

  useEffect(() => {
    if (value === '' || !options.find((option) => option.value === value)) {
      field.onChange(null);
    }
  }, [field, options, value]);

  return (
    <FormItem
      top={label && `${label}${required ? ' *' : ''}`}
      bottom={fieldState.error ? fieldState.error.message : helperText}
      status={fieldState.error ? 'error' : 'default'}
    >
      <CustomSelect
        {...field}
        onChange={(evt) => {
          field.onChange(valueAsNumber ? +evt.target.value : evt.target.value);
        }}
        getRef={ref}
        value={value || ''}
        options={options}
        {...otherProps}
      />
    </FormItem>
  );
};

export default SelectField;
