'use client'

import { useRef } from 'react';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CSSPlugin } from 'gsap/CSSPlugin';

import styles from './index.module.scss';

gsap.registerPlugin(useGSAP, ScrollTrigger, CSSPlugin);


export default function Portfolio() {

  const container = useRef<HTMLHeadingElement>(null);
  
  useGSAP(() => {

    if(container.current){

      gsap.to(
        container.current,
        {
          opacity: 1,
          filter: 'blur(0rem)',
          duration: .5,
          ease: 'ease1.out',
          scrollTrigger: {
            trigger: container.current,
            start: 'top center',
          },
        }
      );

    }
  }, { scope: container })

  return (
    <footer className={styles.wrapper}>
      <p ref={container}>@2024 Masashi Otsuka</p>
    </footer>
  );
}