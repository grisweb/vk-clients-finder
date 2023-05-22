import { FC, useState } from 'react';
import { FormItem, ChipsInputProps, ChipsInput } from '@vkontakte/vkui';
import { ChipOption } from '@vkontakte/vkui/dist/components/Chip/Chip';
import { useController, useFormContext } from 'react-hook-form';

import ruleMessages from '../../constants';

interface ChipsFieldProps extends Omit<ChipsInputProps<ChipOption>, 'value'> {
  name: string;
  label: string;
}

const ChipsField: FC<ChipsFieldProps> = ({
  name,
  label,
  required = false,
  ...otherProps
}) => {
  const { control } = useFormContext();

  const {
    fieldState,
    field: { ref, onChange, ...field }
  } = useController({
    name,
    control,
    rules: {
      required: required ? ruleMessages.required : undefined
    },
    defaultValue: null
  });

  const [value, setValue] = useState<ChipOption[]>([]);

  const handleChange = (newValue: ChipOption[]) => {
    setValue(newValue);
    onChange(newValue.map((option) => option.value));
  };

  return (
    <FormItem
      top={`${label}${required ? ' *' : ''}`}
      bottom={fieldState.error && fieldState.error.message}
      status={fieldState.error ? 'error' : 'default'}
    >
      <ChipsInput
        getRef={ref}
        onChange={handleChange}
        {...field}
        value={value}
        {...otherProps}
      />
    </FormItem>
  );
};

export default ChipsField;
