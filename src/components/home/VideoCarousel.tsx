'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Volume2, VolumeX } from 'lucide-react';
import { videoSlides } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export function VideoCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    duration: 30,
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const sectionRef = useRef<HTMLElement | null>(null);
  const progressRef = useRef<number>(0);
  const animationFrame = useRef<number>();

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
    setProgress(0);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.5 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (index === activeIndex && isVisible) {
        video.currentTime = 0;
        video.muted = isMuted;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [activeIndex, isMuted, isVisible]);

  useEffect(() => {
    const video = videoRefs.current[activeIndex];
    if (!video || !isVisible) return;

    const update = () => {
      if (video.duration) {
        progressRef.current = (video.currentTime / video.duration) * 100;
        setProgress(progressRef.current);
      }
      animationFrame.current = requestAnimationFrame(update);
    };

    animationFrame.current = requestAnimationFrame(update);

    const handleEnd = () => emblaApi?.scrollNext();
    video.addEventListener('ended', handleEnd);

    return () => {
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
      video.removeEventListener('ended', handleEnd);
    };
  }, [activeIndex, emblaApi, isVisible]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[85svh] md:h-screen overflow-hidden bg-black text-white"
    >
      <div ref={emblaRef} className="h-full overflow-hidden">
        <div className="flex h-full">
          {videoSlides.map((slide, index) => {
            const poster = PlaceHolderImages.find(
              p => p.id === slide.posterImageId
            )?.imageUrl;

            const isActive = index === activeIndex;

            return (
              <div
                key={slide.id}
                className="relative flex-[0_0_100%] h-full"
              >
                <video
                  ref={el => {
                    if (el) videoRefs.current[index] = el;
                  }}
                  src={slide.videoUrl}
                  poster={poster}
                  playsInline
                  preload="metadata"
                  muted={isMuted}
                  className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-out ${
                    isActive
                      ? 'scale-105 opacity-100'
                      : 'scale-100 opacity-40'
                  }`}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                <div className="absolute bottom-24 md:bottom-32 left-6 md:left-16 max-w-2xl z-10">
                  <h2
                    className={`text-3xl md:text-6xl font-headline font-bold transition-all duration-700 ${
                      isActive
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-8 opacity-0'
                    }`}
                  >
                    {slide.title}
                  </h2>
                  <p
                    className={`mt-4 text-base md:text-xl opacity-90 transition-all duration-1000 ${
                      isActive
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-8 opacity-0'
                    }`}
                  >
                    {slide.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-xl px-6 z-20">
        <div className="flex items-center gap-3">
          {videoSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className="relative flex-1 h-[3px] bg-white/30 rounded-full overflow-hidden"
            >
              <div
                className="absolute left-0 top-0 h-full bg-white transition-all duration-150 ease-linear"
                style={{
                  width:
                    index < activeIndex
                      ? '100%'
                      : index === activeIndex
                      ? `${progress}%`
                      : '0%',
                }}
              />
            </button>
          ))}

          <button
            onClick={() => setIsMuted(v => !v)}
            className="ml-2 p-2 rounded-full bg-white/10 backdrop-blur hover:bg-white/20 transition"
          >
            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        </div>
      </div>
    </section>
  );
}
