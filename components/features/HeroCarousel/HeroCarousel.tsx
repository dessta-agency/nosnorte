import { useTranslations } from "next-intl";
import Image from "next/image";
import { Button } from "@/components/ui/Button/Button";
import { Carousel } from "@/components/ui/Carousel/Carousel";
import { FULL_BLEED_HERO_INSET } from "@/constants/layout";
import type { HeroSlide } from "@/types/carousel";

const SLIDES_DATA = [
  {
    id: "1",
    image: "/images/home/image1.jpg",
  },
  {
    id: "2",
    image: "/images/home/image2.jpg",
  },
  {
    id: "3",
    image: "/images/home/image3.jpg",
  },
] as const;

export function HeroCarousel() {
  const t = useTranslations("hero.slides");

  const slides: HeroSlide[] = SLIDES_DATA.map((slide) => ({
    ...slide,
    eyebrow: t(`${slide.id}.eyebrow`),
    title: t(`${slide.id}.title`),
    description: t(`${slide.id}.description`),
    cta: t(`${slide.id}.cta`),
  }));

  return (
    <Carousel autoplayDelay={5000} loop className="w-full">
      {slides.map((slide, index) => (
        <div key={slide.id} className="relative min-w-0 flex-[0_0_100%]">
          <div className="relative h-[calc(100dvh-5.5rem)]">
            {/* Background image */}
            <div className="absolute inset-0 overflow-hidden">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="100vw"
              />
            </div>

            {/* Modern gradient overlay - from left and bottom */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Content Container */}
            <div className="absolute inset-0 flex items-end">
              <div className={`${FULL_BLEED_HERO_INSET} pb-32 md:pb-40 lg:pb-48`}>
                <div className="max-w-2xl">
                  {/* Eyebrow */}
                  <div className="mb-4 md:mb-6">
                    <span className="inline-block text-xs font-medium tracking-[0.2em] text-white/80 md:text-sm">
                      {slide.eyebrow}
                    </span>
                  </div>

                  {/* Title - Elegant and impactful */}
                  <h2 className="mb-4 font-display text-3xl leading-tight text-white md:mb-5 md:text-4xl md:leading-tight lg:text-5xl lg:leading-tight">
                    {slide.title}
                  </h2>

                  {/* Description - Compact and elegant */}
                  <p className="mb-6 max-w-xl font-sans text-sm leading-relaxed text-white/90 md:mb-8 md:text-base lg:text-lg">
                    {slide.description}
                  </p>

                  <Button variant="primary" showArrow>
                    {slide.cta}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
}
