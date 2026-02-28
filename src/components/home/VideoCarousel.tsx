'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { Volume2, VolumeX } from 'lucide-react';
import { videoSlides } from '@/lib/data';
import { motion, AnimatePresence } from 'framer-motion';

export function VideoCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    duration: 20,
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isVisible, setIsVisible] = useState(true);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const progressRefs = useRef<(HTMLDivElement | null)[]>([]);
  const sectionRef = useRef<HTMLElement | null>(null);

  // Slide change handler
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const index = emblaApi.selectedScrollSnap();
    setActiveIndex(index);
    
    // Reset all progress bars
    progressRefs.current.forEach((ref, i) => {
      if (ref) ref.style.width = i < index ? '100%' : '0%';
    });
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
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Play/Pause management
  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;
      if (index === activeIndex && isVisible) {
        video.muted = isMuted;
        video.currentTime = 0;
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Auto-play might be blocked by browser
          });
        }
      } else {
        video.pause();
      }
    });
  }, [activeIndex, isMuted, isVisible]);

  // Direct DOM Progress tracking (prevents laggy re-renders)
  useEffect(() => {
    let frameId: number;
    const video = videoRefs.current[activeIndex];
    const progressBar = progressRefs.current[activeIndex];

    if (!video || !progressBar || !isVisible) return;

    const updateProgress = () => {
      if (video.duration) {
        const percentage = (video.currentTime / video.duration) * 100;
        progressBar.style.width = `${percentage}%`;
      }
      frameId = requestAnimationFrame(updateProgress);
    };

    const handleVideoEnd = () => {
      emblaApi?.scrollNext();
    };

    video.addEventListener('ended', handleVideoEnd);
    frameId = requestAnimationFrame(updateProgress);

    return () => {
      video.removeEventListener('ended', handleVideoEnd);
      cancelAnimationFrame(frameId);
    };
  }, [activeIndex, emblaApi, isVisible]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[80svh] md:h-screen overflow-hidden bg-black text-white"
    >
      {/* Carousel */}
      <div ref={emblaRef} className="h-full overflow-hidden">
        <div className="flex h-full touch-pan-y">
          {videoSlides.map((slide, index) => {
            const isActive = index === activeIndex;
            return (
              <div
                key={slide.id}
                className="relative flex-[0_0_100%] h-full transform-gpu"
              >
                {/* Optimized Video */}
                <video
                  ref={(el) => { videoRefs.current[index] = el; }}
                  src={slide.videoUrl}
                  playsInline
                  muted={isMuted}
                  preload={index === activeIndex || index === (activeIndex + 1) % videoSlides.length ? "auto" : "none"}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 transform-gpu ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

                {/* Text */}
                <div className="container relative z-10 px-6 md:px-16 h-full flex items-center pointer-events-none">
                  <div className="max-w-3xl">
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.div
                          key={slide.id}
                          initial={{ opacity: 0, y: 40 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                          <h2 className="text-4xl md:text-7xl font-bold leading-tight drop-shadow-2xl">
                            {slide.title}
                          </h2>
                          <p className="mt-6 text-lg md:text-2xl text-gray-200 font-medium max-w-2xl drop-shadow-lg">
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

      {/* Indicators and Controls */}
      <div className="absolute bottom-12 left-0 w-full z-20">
        <div className="container px-6 md:px-16">
          <div className="flex items-center gap-6 max-w-xl">
            <div className="flex-1 flex gap-3">
              {videoSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => emblaApi?.scrollTo(index)}
                  className="relative flex-1 h-[3px] bg-white/20 rounded-full overflow-hidden transition-all hover:h-[5px]"
                  aria-label={`Go to slide ${index + 1}`}
                >
                  <div
                    ref={(el) => { progressRefs.current[index] = el; }}
                    className="absolute left-0 top-0 h-full bg-white transition-none"
                    style={{ width: index < activeIndex ? '100%' : '0%' }}
                  />
                </button>
              ))}
            </div>

            {/* Mute Button */}
            <button
              onClick={() => setIsMuted((v) => !v)}
              className="p-3.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all active:scale-95"
              aria-label={isMuted ? "Unmute video" : "Mute video"}
            >
              {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}