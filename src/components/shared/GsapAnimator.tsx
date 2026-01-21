'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface GsapAnimatorProps {
  children: React.ReactNode;
  stagger?: number;
  className?: string;
}

export function GsapAnimator({
  children,
  stagger,
  className,
}: GsapAnimatorProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    
    // Select direct children if stagger is used, otherwise the wrapper itself
    const targets = stagger ? gsap.utils.toArray(element.children) : element;

    const anim = gsap.fromTo(
      targets,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
        stagger,
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    );
    
    return () => {
      // Kill the animation and ScrollTrigger instance
      anim.kill();
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
