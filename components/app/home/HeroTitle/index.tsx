'use client'

import Image from "next/image";

import { useRef } from 'react';

import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CSSPlugin } from 'gsap/CSSPlugin';

import styles from './index.module.scss';

gsap.registerPlugin(useGSAP, ScrollTrigger, CSSPlugin);


export default function HeroTitle() {

  const container = useRef<HTMLHeadingElement>(null);
  
  useGSAP(() => {

    if(container.current){

      gsap.to(
        container.current,
        {
          opacity: 1,
          filter: 'blur(0rem)',
          duration: .8,
          ease: 'ease1.out',
          delay: 1,
        }
      );

    }
  }, { scope: container })

  return (
    <h1 className={styles.title} ref={container}>
      <Image
        src={`/name.svg`}
        alt="Masashi Otsuka"
        width={600}
        height={142}
        priority
        className={styles.svg}
      />
      <span className={styles.text}>PORTFOLIO</span>
    </h1>
  );
}