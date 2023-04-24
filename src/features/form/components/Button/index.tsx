import { FC, PropsWithChildren } from 'react';
import { Button as VkButton, ButtonProps, FormItem } from '@vkontakte/vkui';
import { useAppSelector } from 'app/hooks';

const Button: FC<PropsWithChildren & ButtonProps> = ({
  children,
  loading,
  ...otherProps
}) => {
  const isSubmitting = useAppSelector((state) => state.form.isSubmitting);

  return (
    <FormItem>
      <VkButton
        stretched
        size="l"
        loading={isSubmitting || loading}
        type="submit"
        {...otherProps}
      >
        {children}
      </VkButton>
    </FormItem>
  );
};
export default Button;
