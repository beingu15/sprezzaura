'use client';

import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { videoSlides } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Volume2, VolumeX } from 'lucide-react';
import { GsapAnimator } from '../shared/GsapAnimator';
import gsap from 'gsap';

export function VideoCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [isMuted, setIsMuted] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const sectionRef = useRef<HTMLElement | null>(null);
  const gsapTicker = useRef<gsap.core.Tween | null>(null);

  /* -------------------------------------------------
     FIXED: Active index sync (loop-safe)
  ------------------------------------------------- */
  const updateActiveIndex = useCallback(() => {
    if (!emblaApi) return;

    const index = emblaApi.selectedScrollSnap();

    setActiveIndex(prev => (prev !== index ? index : prev));
    setProgress(0);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    updateActiveIndex();

    // 🔥 scroll fires reliably in loop mode
    emblaApi.on('scroll', updateActiveIndex);
    emblaApi.on('reInit', updateActiveIndex);

    return () => {
      emblaApi.off('scroll', updateActiveIndex);
      emblaApi.off('reInit', updateActiveIndex);
    };
  }, [emblaApi, updateActiveIndex]);

  /* -------------------------------------------------
     IntersectionObserver (performance)
  ------------------------------------------------- */
  useEffect(() => {
    if (!sectionRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.4 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  /* -------------------------------------------------
     Pause on tab blur
  ------------------------------------------------- */
  useEffect(() => {
    const onVisibilityChange = () => {
      if (document.hidden) {
        videoRefs.current.forEach(v => v?.pause());
        gsapTicker.current?.pause();
      } else {
        videoRefs.current[activeIndex]?.play().catch(() => {});
        gsapTicker.current?.resume();
      }
    };

    document.addEventListener('visibilitychange', onVisibilityChange);
    return () =>
      document.removeEventListener(
        'visibilitychange',
        onVisibilityChange
      );
  }, [activeIndex]);

  /* -------------------------------------------------
     Video playback + GSAP progress
  ------------------------------------------------- */
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

    const video = videoRefs.current[activeIndex];
    if (!video || !isVisible) return;

    gsapTicker.current?.kill();

    gsapTicker.current = gsap.to(
      {},
      {
        repeat: -1,
        duration: 0.1,
        ease: 'none',
        onUpdate: () => {
          if (!video.duration) return;
          setProgress(
            (video.currentTime / video.duration) * 100
          );
        },
      }
    );

    const onEnd = () => emblaApi?.scrollNext();
    video.addEventListener('ended', onEnd);

    return () => {
      video.removeEventListener('ended', onEnd);
      gsapTicker.current?.kill();
    };
  }, [activeIndex, isVisible, isMuted, emblaApi]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[80svh] md:h-screen text-white overflow-hidden"
    >
      <div ref={emblaRef} className="h-full">
        <div className="flex h-full">
          {videoSlides.map((slide, index) => {
            const poster = PlaceHolderImages.find(
              p => p.id === slide.posterImageId
            )?.imageUrl;

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
                  className={`absolute inset-0 h-full w-full object-cover transition-transform duration-700 ${
                    index === activeIndex
                      ? 'scale-105'
                      : 'scale-100'
                  }`}
                />

                <div className="absolute inset-0 bg-black/50" />

                <div className="relative z-10 flex h-full items-end px-6 pb-20 md:px-16 md:pb-32">
                  <GsapAnimator>
                    <div className="max-w-xl">
                      <h2 className="text-3xl md:text-6xl font-bold mb-3">
                        {slide.title}
                      </h2>
                      <p className="text-base md:text-xl opacity-90">
                        {slide.subtitle}
                      </p>
                    </div>
                  </GsapAnimator>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* -------------------------------------------------
         Click-to-scrub Progress Bars (FIXED)
      ------------------------------------------------- */}
      <div className="absolute bottom-6 left-1/2 z-20 w-full max-w-md -translate-x-1/2 px-4">
        <div className="flex items-center gap-2">
          {videoSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => emblaApi?.scrollTo(index)}
              className="relative flex-1 h-1 rounded-full bg-white/30 overflow-hidden"
            >
              <div
                className="absolute left-0 top-0 h-full bg-white transition-[width] duration-150 ease-linear"
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
            className="ml-3 rounded-full p-2 hover:bg-white/10 transition"
          >
            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
          </button>
        </div>
      </div>
    </section>
  );
}
