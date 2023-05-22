import { FC } from 'react';
import {
  Div,
  Pagination as VkPagination,
  PaginationProps as VkPaginationProps
} from '@vkontakte/vkui';

import styles from './Pagination.module.scss';

type PaginationProps = VkPaginationProps;

const Pagination: FC<PaginationProps> = (props) => {
  return (
    <Div className={styles['pagination-wrap']}>
      <VkPagination {...props} />
    </Div>
  );
};

export default Pagination;
