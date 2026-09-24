"use client";

import { Children, useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import type { CarouselProps } from "@/types/carousel";

export function Carousel({
  children,
  autoplayDelay = 5000,
  loop = true,
  className = "",
}: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop, align: "start" },
    [Autoplay({ delay: autoplayDelay, stopOnInteraction: false })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const slideCount = Children.count(children);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi]);

  const currentSlide = selectedIndex + 1;

  return (
    <div className={`relative ${className}`}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">{children}</div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
        {Array.from({ length: slideCount }, (_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => scrollTo(index)}
            className={`h-1.5 rounded-full transition-all ${
              index === selectedIndex
                ? "w-5 bg-white"
                : "w-1.5 bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="absolute bottom-8 right-8 z-20 md:bottom-12 md:right-12 lg:bottom-16 lg:right-16">
        <div className="flex items-center gap-1 font-sans text-sm font-light text-white">
          <span>{String(currentSlide).padStart(2, "0")}</span>
          <span className="text-white/60">/</span>
          <span>{String(slideCount).padStart(2, "0")}</span>
        </div>
      </div>
    </div>
  );
}
