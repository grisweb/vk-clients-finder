import { FC } from 'react';
import { SimpleCell, SimpleCellProps } from '@vkontakte/vkui';
import { LinkProps, useHref, useLinkClickHandler } from 'react-router-dom';

type SimpleCellLinkProps = Omit<
  SimpleCellProps,
  'Component' | 'href' | 'onClick'
> &
  LinkProps;

const SimpleCellLink: FC<SimpleCellLinkProps> = ({
  to,
  children,
  ...props
}) => {
  const href = useHref(to);
  const handleClick = useLinkClickHandler(to);

  return (
    <SimpleCell Component="a" href={href} onClick={handleClick} {...props}>
      {children}
    </SimpleCell>
  );
};

export default SimpleCellLink;
