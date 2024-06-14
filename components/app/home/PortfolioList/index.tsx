'use client'

import { useRef } from 'react';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Article } from '@/libs/microcms';

import PortfolioListItem from '@/components/app/home/PortfolioListItem';

import styles from './index.module.scss';

type Props = {
  articles?: Article[];
}

export default function Portfolio({ articles }: Props) {
  
  const container = useRef<HTMLDivElement>(null);
  const eyecatchRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {

    if(container.current){

      if(eyecatchRefs.current.length > 0){
        ScrollTrigger.batch(eyecatchRefs.current, {
          start: 'top 80%',
          onEnter: batch => gsap.to(batch, {clipPath: 'inset(0% 0% 0% 0%)', duration: .8, ease: 'ease1.out', stagger: .1 }),
        });
      }
    }
  }, { scope: container })
  
  if (!articles) {
    return null;
  }

  const setEyecatchRef = (index: number) => (el: HTMLDivElement | null) => {
    eyecatchRefs.current[index] = el;
  }

  return (
    <div className={styles.wrapper} ref={container}>
      <ul className={styles.list}>
        {articles.map((article, index) => (
          <PortfolioListItem key={article.id} article={article} eyecatchRef={setEyecatchRef(index)}/>
        ))}
      </ul>
    </div>
  );
}