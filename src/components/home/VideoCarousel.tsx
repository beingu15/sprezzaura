
'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { videoSlides } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Volume2, VolumeX } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GsapAnimator } from '../shared/GsapAnimator';

export function VideoCarousel() {
  const autoplay = useRef(
    Autoplay({ delay: 8000, stopOnInteraction: false, stopOnMouseEnter: true })
  );
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [autoplay.current]);
  const [isMuted, setIsMuted] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    const onProgress = () => {
      const p = autoplay.current.options.delay
        ? autoplay.current.internalEngine().percentOfInterval
        : 0;
      setProgress(p * 100);
    };

    const timer = setInterval(onProgress, 50);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
      clearInterval(timer);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        try {
          if (index === activeIndex) {
            video.play().catch(error => {
              console.warn("Video autoplay prevented for active slide:", error);
            });
          } else {
            video.pause();
            video.currentTime = 0;
          }
        } catch (error) {
          console.error("Error controlling video playback:", error);
        }
      }
    });
  }, [activeIndex]);

   useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.muted = isMuted;
      }
    });
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  return (
    <section className="relative h-[60vh] md:h-screen w-full overflow-hidden text-white">
      <div ref={emblaRef} className="h-full">
        <div className="flex h-full">
          {videoSlides.map((slide, index) => {
            const posterImage = PlaceHolderImages.find(p => p.id === slide.posterImageId);
            return (
              <div className="relative flex-[0_0_100%] h-full" key={slide.id}>
                <video
                  ref={el => (videoRefs.current[index] = el)}
                  src={slide.videoUrl}
                  poster={posterImage?.imageUrl}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  playsInline
                  muted={isMuted}
                  loop
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10 flex flex-col justify-end h-full p-8 md:p-16 container mx-auto">
                    <GsapAnimator key={slide.id}>
                        <h2 className="text-4xl md:text-6xl font-headline font-bold text-shadow-lg mb-2">
                            {slide.title}
                        </h2>
                        <p className="text-lg md:text-xl max-w-xl text-shadow">
                            {slide.subtitle}
                        </p>
                    </GsapAnimator>
                </div>
              </div>
            );
          })}
        </div>
      </div>
       <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 w-full max-w-xs md:max-w-md mx-auto">
        <div className="flex items-center gap-2 px-8">
            {videoSlides.map((_, index) => (
                <div key={index} className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-white transition-transform duration-50"
                        style={{
                            transform: `translateX(-${100 - (index === activeIndex ? progress : index < activeIndex ? 100 : 0)}%)`,
                            transformOrigin: 'left',
                        }}
                    />
                </div>
            ))}
            <button onClick={toggleMute} className="ml-4 p-2 rounded-full hover:bg-white/10 transition-colors">
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                <span className="sr-only">{isMuted ? 'Unmute' : 'Mute'}</span>
            </button>
        </div>
      </div>
    </section>
  );
}
