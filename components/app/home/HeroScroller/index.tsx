'use client'

import { useRef } from 'react';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import styles from './index.module.scss';

export default function HeroScroller() {

  const container = useRef<HTMLDivElement>(null);

  useGSAP(() => {

    if(container.current){
      
      const tl = gsap.timeline({ paused: true });

      tl.to(
        container.current,
        {
          yPercent: 500,
          opacity: 0,
          duration: 1.5,
          ease: 'ease1.out',
          repeat: -1,
        }
      );

      gsap.to(
        container.current,
        {
          opacity: 1,
          filter: 'blur(0rem)',
          duration: .6,
          ease: 'ease1.out',
          delay: 1.5,
          onComplete: () => {
            tl.play();
          }
        }
      );

    }
  }, { scope: container })

  return (
    <div className={styles.wrapper} ref={container}></div>
  );
}