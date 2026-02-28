'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Volume2, VolumeX } from 'lucide-react';
import { videoSlides } from '@/lib/data';
import { motion, AnimatePresence } from 'framer-motion';

export function VideoCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    duration: 18, // smoother animation
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Slide change handler
  const onSelect = useCallback(() => {
    if (!emblaApi) return;

    const index = emblaApi.selectedScrollSnap();
    setActiveIndex(index);
    setProgress(0);
  }, [emblaApi]);

  // Embla events
  useEffect(() => {
    if (!emblaApi) return;

    onSelect();
    emblaApi.on('select', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  // Visibility detection (pause when off screen)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  // Play only active video
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      if (index === activeIndex && isVisible) {
        video.muted = isMuted;
        video.currentTime = 0;

        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [activeIndex, isMuted, isVisible]);

  // Progress tracking (efficient)
  useEffect(() => {
    const video = videoRefs.current[activeIndex];

    if (!video || !isVisible) return;

    const updateProgress = () => {
      if (video.duration) {
        setProgress((video.currentTime / video.duration) * 100);
      }
    };

    const handleVideoEnd = () => {
      emblaApi?.scrollNext();
    };

    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('ended', handleVideoEnd);

    return () => {
      video.removeEventListener('timeupdate', updateProgress);
      video.removeEventListener('ended', handleVideoEnd);
    };
  }, [activeIndex, emblaApi, isVisible]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[80svh] md:h-screen overflow-hidden bg-black text-white"
    >
      {/* Carousel */}
      <div ref={emblaRef} className="h-full overflow-hidden">
        <div className="flex h-full">

          {videoSlides.map((slide, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                key={slide.id}
                className="relative flex-[0_0_100%] h-full"
              >

                {/* Optimized Video */}
                <video
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
                  src={slide.videoUrl}
                  playsInline
                  muted={isMuted}
                  preload={isActive ? "auto" : "none"}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Text */}
                <div className="container relative z-10 px-6 md:px-16 h-full flex items-center">

                  <div className="max-w-3xl">

                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{
                            duration: 0.7,
                            ease: "easeOut"
                          }}
                        >

                          <h2 className="text-4xl md:text-7xl font-bold leading-tight">
                            {slide.title}
                          </h2>

                          <p className="mt-6 text-lg md:text-2xl text-gray-200">
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

      {/* Indicators */}
      <div className="absolute bottom-12 left-0 w-full z-20">

        <div className="container px-6 md:px-16">

          <div className="flex items-center gap-4 max-w-xl">

            <div className="flex-1 flex gap-2">

              {videoSlides.map((_, index) => (

                <button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className="relative flex-1 h-[4px] bg-white/20 rounded-full overflow-hidden"
                >

                  <div
                    className="absolute left-0 top-0 h-full bg-white"
                    style={{
                      width:
                        index < activeIndex
                          ? "100%"
                          : index === activeIndex
                          ? `${progress}%`
                          : "0%",
                      transition:
                        index === activeIndex
                          ? "none"
                          : "width 0.3s ease",
                    }}
                  />

                </button>

              ))}

            </div>

            {/* Mute Button */}
            <button
              onClick={() => setIsMuted((v) => !v)}
              className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all"
            >
              {isMuted ? (
                <VolumeX size={20} />
              ) : (
                <Volume2 size={20} />
              )}
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}
