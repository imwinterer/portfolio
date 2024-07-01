'use client'

import Image from "next/image";
import { useRouter } from 'next/navigation';

import parse from "html-react-parser";

import { type Article } from '@/libs/microcms';

import styles from './index.module.scss';

type Props = {
  data: Article;
};

export default function Article({ data }: Props) {

  const router = useRouter();

  return (
    <main className={styles.main}>
      {data.eyecatch ? (
        <div className={styles.eyecatch}>
          <div className={styles['eyecatch-inner']}>
            <Image
              src={`${data.eyecatch.url}?fm=webp&w=768`}
              alt="アイキャッチ"
              width={768}
              height={432}
              priority
            />
          </div>
        </div>
      ) : null }
      <p className={styles.title}>{data.title}</p>
      <div>
        {data.category ? (
          <div className={styles.item}>
            <p>カテゴリー</p>
            <div>
              <span>{data.category.name}</span>
            </div>
          </div>
        ) : null }
        {data.tag ? (
          <div className={styles.item}>
            <p>担当領域</p>
            <div>
              {data.tag.map((tag) => (
                <span key={tag.id}>
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        ) : null }
      </div>
      <div className={styles.content}>{parse(data.content)}</div>
      <div className={styles.nav}>
        <button onClick={() => { router.back() }} className={`${styles.link} ${styles.internal}`}>
          一覧へ戻る
        </button>
        {data.url ? (
          <a className={`${styles.link} ${styles.external}`} href={data.url} target="_blank" rel="noopener noreferrer">
            サイトへ移動
          </a>
        ) : null }
      </div>
    </main>
  );
}