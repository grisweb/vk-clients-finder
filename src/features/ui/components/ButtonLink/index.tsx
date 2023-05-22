import { FC } from 'react';
import { Button, ButtonProps } from '@vkontakte/vkui';
import { LinkProps, useHref, useLinkClickHandler } from 'react-router-dom';

type ButtonLinkProps = Omit<ButtonProps, 'Component' | 'href' | 'onClick'> &
  LinkProps;

const ButtonLink: FC<ButtonLinkProps> = ({ to, children, ...props }) => {
  const href = useHref(to);
  const handleClick = useLinkClickHandler(to);

  return (
    <Button Component="a" href={href} onClick={handleClick} {...props}>
      {children}
    </Button>
  );
};

export default ButtonLink;
