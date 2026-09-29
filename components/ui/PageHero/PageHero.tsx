import Image from "next/image";
import { FULL_BLEED_HERO_INSET } from "@/constants/layout";

type PageHeroProps = {
  title: string;
  subtitle: string;
  eyebrow?: string;
  backgroundImage?: string;
};

export function PageHero({
  title,
  subtitle,
  eyebrow,
  backgroundImage = "/images/backgrounds/background.png",
}: PageHeroProps) {
  return (
    <section className="relative flex min-h-[42vh] items-end overflow-hidden md:min-h-[50vh]">
      <div className="absolute inset-0">
        <Image
          src={backgroundImage}
          alt=""
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

      <div
        className={`relative z-10 ${FULL_BLEED_HERO_INSET} pb-16 pt-24 md:pb-20 md:pt-32 lg:pb-24`}
      >
        <div className="max-w-2xl">
          {eyebrow ? (
            <div className="mb-4 md:mb-6">
              <span className="inline-block text-xs font-medium tracking-[0.2em] text-white/80 md:text-sm">
                {eyebrow}
              </span>
            </div>
          ) : null}
          <h1 className="mb-4 font-display text-3xl leading-tight text-white md:mb-5 md:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="max-w-xl font-sans text-sm leading-relaxed text-white/90 md:text-base lg:text-lg">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
