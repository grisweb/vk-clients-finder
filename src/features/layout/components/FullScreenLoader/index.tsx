import { FC } from 'react';
import { Spinner } from '@vkontakte/vkui';

import styles from './FulllScreenLoader.module.scss';

const FullScreenLoader: FC = () => (
  <div className={styles['loader-wrap']}>
    <Spinner size="large" className={styles.loader} />
  </div>
);

export default FullScreenLoader;
