'use client'

import Link from 'next/link';
import Image from "next/image";

import { Article } from '@/libs/microcms';

import styles from './index.module.scss';

type Props = {
  article: Article;
  eyecatchRef: (el: HTMLDivElement | null) => void;
}

export default function Portfolio({ article, eyecatchRef }: Props) {

  return (
    <li className={styles.wrapper}>
      {article.eyecatch ? (
        <div className={styles.eyecatch}>
          <div className={styles['eyecatch-inner']} ref={eyecatchRef}>
            <Image
              src={`${article.eyecatch.url}?fm=webp&w=768`}
              alt="アイキャッチ"
              width={768}
              height={432}
              priority
            />
          </div>
        </div>
      ) : null }
      <p className={styles.title}>{article.title}</p>
      <div className={styles.data}>
        <div>
          {article.category ? (
            <div className={styles.item}>
              <p>カテゴリー</p>
              <div>
                <span>{article.category.name}</span>
              </div>
            </div>
          ) : null }
          {article.tag ? (
            <div className={styles.item}>
              <p>担当領域</p>
              <div>
                {article.tag.map((tag) => (
                  <span key={tag.id}>
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          ) : null }
        </div>
        <div className={styles.nav}>
          {article.content ? (
            <Link href={`/portfolio/${article.id}`} className={`${styles.link} ${styles.internal}`}>
              詳細を見る
            </Link>
          ) : null }
          {article.url ? (
            <a className={`${styles.link} ${styles.external}`} href={article.url} target="_blank" rel="noopener noreferrer">
              サイトへ移動
            </a>
          ) : null }
        </div>
      </div>
    </li>
  );
}