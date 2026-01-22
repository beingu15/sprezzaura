// src/components/shared/LottieAnimation.tsx
'use client';

import Lottie from 'lottie-react';

type Props = {
  animationPath: string;
  className?: string;
};

export default function LottieAnimation({ animationPath, className }: Props) {
  return (
    <Lottie
      animationData={require(`../../../public${animationPath}`)}
      loop
      autoplay
      className={className}
    />
  );
}
