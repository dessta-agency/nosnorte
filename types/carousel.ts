import type { ReactNode } from "react";

export type HeroSlide = {
  id: string;
  image: string;
  href: string;
  eyebrow: string;
  title: string;
  description: string;
  cta: string;
};

export type CarouselProps = {
  children: ReactNode;
  autoplayDelay?: number;
  loop?: boolean;
  className?: string;
};
