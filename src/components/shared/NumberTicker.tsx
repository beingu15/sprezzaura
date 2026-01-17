
'use client';

import { useEffect, useRef } from 'react';
import { useInView, animate } from 'framer-motion';

type NumberTickerProps = {
  value: number;
  title: string;
  suffix?: string;
  className?: string;
};

export function NumberTicker({ value, title, suffix, className }: NumberTickerProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView || !ref.current) return;

    const node = ref.current;

    const controls = animate(0, value, {
      duration: 2,
      onUpdate(value) {
        node.textContent = Math.round(value).toString();
      },
    });

    return () => controls.stop();
  }, [isInView, value]);

  return (
    <div className={`text-center ${className}`}>
      <h3 className="text-4xl md:text-5xl font-bold text-primary">
        <span ref={ref}>0</span>
        {suffix}
      </h3>
      <p className="text-sm md:text-base text-muted-foreground mt-2">{title}</p>
    </div>
  );
}
