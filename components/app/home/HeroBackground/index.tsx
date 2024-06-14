'use client'

import Image from "next/image";

import { useRef, useState, useEffect } from 'react';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Article } from '@/libs/microcms';

import styles from './index.module.scss';

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Props = {
  articles?: Article[];
}

type RandomProps = {
  length: number;
  max: number;
}

export default function HeroTitle({ articles }: Props ) {

  const [data, setData] = useState<Article[][]>([]);

  useEffect(() => {
    if (articles) {
      let newData = [...articles];

      while (newData.length < 36) {
        newData.push(...newData.slice(0, 36 - newData.length));
      }

      const getRandomIndexes = ({ length, max }: RandomProps) => {
        const indexes: number[] = [];
        while (indexes.length < length) {
          const index = Math.floor(Math.random() * max);
          if (!indexes.includes(index)) {
            indexes.push(index);
          }
        }
        return indexes;
      };

      const chunks: Article[][] = [];
      for (let i = 0; i < 6; i++) {
        const randomIndexes = getRandomIndexes({ length: 6, max: newData.length });
        const selectedItems = randomIndexes.map(index => newData[index]);

        const uniqueItems: Article[] = [];
        selectedItems.forEach(item => {
          if (!uniqueItems.some(uniqueItem => uniqueItem.id === item.id)) {
            uniqueItems.push(item);
          }
        });

        const transformedData: Article[] = [];
        for (let i = 0; i < selectedItems.length; i++) {
          transformedData.push(uniqueItems[i % uniqueItems.length]);
        }
        chunks.push(transformedData);
      }

      setData(chunks);
    }
  }, [articles]);

  
  const container = useRef<HTMLDivElement>(null);
  
  useEffect(() => {

    if(container.current){
      const blocks = container.current.querySelectorAll(`.${styles.block}`);
        
      blocks.forEach((block, index) => {
        const tl = gsap.timeline();
        
        tl.to(
          block,
          {
            rotateY: 0,
            opacity: 1,
            duration: .8,
            delay: () => {
              return index * .1;
            },
          }
        );

        tl.to(
          block.querySelector(`.${styles.list}`),
          {
            yPercent: () => {
              return index % 2 === 0 ? -50 : 50;
            },
            duration: 30,
            ease: 'none',
            repeat: -1,
          }
        );
      });
    }

  }, [data]);

  return (
    <div className={styles.wrapper} ref={container}>
      <div className={styles.container}>
        {data.map((chunk, index) => (
          <div className={styles.block} key={index}>
            <ul className={styles.list}>
              {chunk.map((item, i) => (
                <li className={styles.card} key={i}>
                {item.eyecatch ? (
                    <Image
                      src={`${item.eyecatch.url}?fm=webp&w=768`}
                      alt="アイキャッチ"
                      width={768}
                      height={432}
                      priority
                    />
                  ) : null }
                </li>
              ))}
              {chunk.map((item, i) => (
                <li className={styles.card} key={i}>
                  {item.eyecatch ? (
                    <Image
                      src={`${item.eyecatch.url}?fm=webp&w=768`}
                      alt="アイキャッチ"
                      width={768}
                      height={432}
                      priority
                    />
                  ) : null }
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}