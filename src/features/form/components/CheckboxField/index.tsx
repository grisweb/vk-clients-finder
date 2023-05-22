import { FC } from 'react';
import { Checkbox, CheckboxProps, FormItem } from '@vkontakte/vkui';
import { useController, useFormContext } from 'react-hook-form';
import ruleMessages from '../../constants';

interface CheckboxFieldProps extends CheckboxProps {
  name: string;
  label: string;
}

const CheckboxField: FC<CheckboxFieldProps> = ({
  name,
  label,
  required = false,
  ...otherProps
}) => {
  const { control } = useFormContext();

  const {
    field: { value, ref, ...field }
  } = useController({
    name,
    control,
    rules: {
      required: required ? ruleMessages.required : undefined
    },
    defaultValue: false
  });

  return (
    <FormItem>
      <Checkbox {...field} getRef={ref} value={value} {...otherProps}>
        {label}
      </Checkbox>
    </FormItem>
  );
};

export default CheckboxField;
