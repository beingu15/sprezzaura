// src/components/shared/LottieAnimation.tsx
'use client';

import Lottie from 'lottie-react';
import { useState, useEffect } from 'react';

type Props = {
  animationPath: string;
  className?: string;
};

export default function LottieAnimation({ animationPath, className }: Props) {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    async function fetchAnimation() {
      try {
        const response = await fetch(animationPath);
        const data = await response.json();
        setAnimationData(data);
      } catch (error) {
        console.error(`Error loading Lottie animation from ${animationPath}:`, error);
      }
    }

    fetchAnimation();
  }, [animationPath]);

  if (!animationData) {
    return null;
  }

  return (
    <Lottie
      animationData={animationData}
      loop
      autoplay
      className={className}
    />
  );
}
