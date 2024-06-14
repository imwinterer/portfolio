'use client'

import { useRef } from "react";

import * as THREE from "three";

import gsap from "gsap";
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { Article } from '@/libs/microcms';

import HeroBackground from '@/components/app/home/HeroBackground';
import HeroTitle from '@/components/app/home/HeroTitle';
import HeroScroller from '@/components/app/home/HeroScroller';

import styles from './index.module.scss';

gsap.registerPlugin(useGSAP, ScrollTrigger);

const vert = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
  }
`;

const frag = `
  varying vec2 vUv;

  uniform float uProgress;

  float PI = 3.141529;

  void main() {
    vec2 newUV = vUv;
    float bottom = 1. - uProgress;
    float curveStrength = 1.;
    float waveStrength = 1.;
    float curve = uProgress + sin(newUV.x * PI * waveStrength) * uProgress * bottom;
    float mask = step(newUV.y, curve);

    vec3 color = vec3(0.07, 0.07, 0.07);
    float alpha = mask * 1.0;

    gl_FragColor = vec4(color, alpha);
  }
`;

type Props = {
  articles?: Article[];
}

export default function Hero({ articles }: Props) {
  
  const container = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!canvas.current) return;

    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight + 1;

    const scene = new THREE.Scene();

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(windowWidth, windowHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    if (canvas.current) {
      canvas.current.appendChild(renderer.domElement);
    }

    const fov = 60;
    const fovRad = (fov / 2) * (Math.PI / 180);
    const dist = windowHeight / 2 / Math.tan(fovRad);
    const camera = new THREE.PerspectiveCamera(
      fov,
      windowWidth / windowHeight,
      1,
      dist * 2
    );
    camera.position.z = dist;

    const light = new THREE.AmbientLight(0x00ffff, 1);
    scene.add(light);

    const geometry = new THREE.PlaneGeometry(1, 1);
    const material = new THREE.ShaderMaterial({
      vertexShader: vert,
      fragmentShader: frag,
      transparent: true,
      uniforms: {
        uProgress: { value: 0 },
      },
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    mesh.scale.x = windowWidth;
    mesh.scale.y = windowHeight;

    renderer.render(scene, camera);

    const resize = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight + 1;
      
      mesh.scale.x = windowWidth;
      mesh.scale.y = windowHeight;

      camera.aspect = windowWidth / windowHeight;
      const dist = windowHeight / 2 / Math.tan(fovRad);
      camera.updateProjectionMatrix();
      camera.position.z = dist;

      renderer.setSize(windowWidth, windowHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', resize);

    const render = () => {
      requestAnimationFrame(render);
      renderer.render(scene, camera);
    };

    render();

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container.current,
        start: 'top top',
        end:'+=' + windowHeight * .5,
        scrub: 1,
        pinSpacing: true, 
        pin: true,
        toggleActions: 'play pause reverse reset',
      }
    });

    tl.to(material.uniforms.uProgress, {
      value: 1,
    });

    return () => {
      window.removeEventListener('resize', resize);
      if (canvas.current) {
        canvas.current.removeChild(renderer.domElement);
      }
    };
  }, { scope: container });

  return (
    <div className={styles.wrapper} ref={container}>
      <HeroBackground articles={articles} />
      <HeroTitle />
      <HeroScroller />
      <div className={styles.canvas} ref={canvas}></div>;
    </div>
  );
}