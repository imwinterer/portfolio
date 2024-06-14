'use client'

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
      {article.url ? (
        <a className={styles.link} href={article.url} target="_blank" rel="noopener noreferrer">
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
          <div className={styles.content}>
            <p className={styles.title}>{article.title}</p>
            {article.category ? (
              <div className={styles.category}>
                <p>カテゴリー</p>
                <div>
                  <span>{article.category.name}</span>
                </div>
              </div>
            ) : null }
            {article.tag ? (
              <div className={styles.tag}>
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
        </a>
      ) : null }
    </li>
  );
}