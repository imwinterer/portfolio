import { Article } from '@/libs/microcms';

import PortfolioList from '@/components/app/home/PortfolioList';

import styles from './index.module.scss';

type Props = {
  articles?: Article[];
}

export default function Portfolio({ articles }: Props) {

  return (
    <div className={styles.wrapper}>
      <PortfolioList articles={articles} />
    </div>
  );
}