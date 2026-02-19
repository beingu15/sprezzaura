
'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Volume2, VolumeX } from 'lucide-react';
import { videoSlides } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { motion, AnimatePresence } from 'framer-motion';

export function VideoCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    duration: 30,
    skipSnaps: false,
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement | null>(null);
  const animationFrame = useRef<number>();

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const index = emblaApi.selectedScrollSnap();
    setActiveIndex(index);
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

  // Intersection Observer to pause/play based on visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Sync video playback with active index
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (index === activeIndex && isVisible) {
        video.muted = isMuted;
        video.currentTime = 0; // Reset to start on slide change
        video.play().catch(() => {
          console.log('Autoplay prevented - waiting for user interaction');
        });
      } else {
        video.pause();
      }
    });
  }, [activeIndex, isMuted, isVisible]);

  // Handle progress tracking and auto-next
  useEffect(() => {
    const video = videoRefs.current[activeIndex];
    if (!video || !isVisible) return;

    const updateProgress = () => {
      if (video.duration) {
        const p = (video.currentTime / video.duration) * 100;
        setProgress(p);
      }
      animationFrame.current = requestAnimationFrame(updateProgress);
    };

    animationFrame.current = requestAnimationFrame(updateProgress);

    const handleVideoEnd = () => {
      if (emblaApi) {
        emblaApi.scrollNext();
      }
    };

    video.addEventListener('ended', handleVideoEnd);

    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
      video.removeEventListener('ended', handleVideoEnd);
    };
  }, [activeIndex, emblaApi, isVisible]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[80svh] md:h-screen overflow-hidden bg-black text-white"
    >
      <div ref={emblaRef} className="h-full overflow-hidden">
        <div className="flex h-full">
          {videoSlides.map((slide, index) => {
            const poster = PlaceHolderImages.find(
              (p) => p.id === slide.posterImageId
            )?.imageUrl;

            const isActive = index === activeIndex;

            return (
              <div
                key={slide.id}
                className="relative flex-[0_0_100%] h-full flex items-center justify-center"
              >
                <video
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
                  src={slide.videoUrl}
                  poster={poster}
                  playsInline
                  preload="auto"
                  muted={isMuted}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                    isActive ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="container relative z-10 px-6 md:px-16">
                  <div className="max-w-3xl">
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                        >
                          <h2 className="text-4xl md:text-7xl font-headline font-bold leading-tight">
                            {slide.title}
                          </h2>
                          <p className="mt-6 text-lg md:text-2xl text-gray-200 font-body">
                            {slide.subtitle}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Indicators UI */}
      <div className="absolute bottom-12 left-0 w-full z-20">
        <div className="container px-6 md:px-16">
          <div className="flex items-center gap-4 max-w-xl">
            <div className="flex-1 flex gap-2">
              {videoSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className="relative flex-1 h-[4px] bg-white/20 rounded-full overflow-hidden transition-all group"
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <div
                    className="absolute left-0 top-0 h-full bg-white transition-all"
                    style={{
                      width:
                        index < activeIndex
                          ? '100%'
                          : index === activeIndex
                          ? `${progress}%`
                          : '0%',
                      transition: index === activeIndex ? 'none' : 'width 0.3s ease',
                    }}
                  />
                  <div className="absolute inset-0 group-hover:bg-white/10" />
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsMuted((v) => !v)}
              className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all"
              aria-label={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
