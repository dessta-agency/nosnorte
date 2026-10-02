import Image from "next/image";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow/SectionEyebrow";
import { Link } from "@/i18n/navigation";

type IntroCard = {
  id: string;
  title: string;
  subtitle: string;
  image: string;
};

type EnvironmentsIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  cards: IntroCard[];
};

/**
 * Diagonal cut in rem (not %). Same absolute cut on every card → same slant angle
 * regardless of card width. Values track card height so the angle stays ~constant:
 * cut ≈ 0.135 × height (matches the original 4.32rem cut on a 32rem-tall card).
 */
const cardBaseClassName =
  "relative @container h-[20rem] min-w-0 flex-1 overflow-hidden sm:h-[24rem] md:h-[28rem] lg:h-[32rem]";

const cardOverlapClassName =
  "not-first:-ml-10 sm:not-first:-ml-12 md:not-first:-ml-14 lg:not-first:-ml-[calc(4.32rem-0.25rem)]";

const cardClipClassName = [
  "max-w-96",
  "[clip-path:polygon(2.75rem_0,100%_0,calc(100%-2.75rem)_100%,0_100%)]",
  "sm:[clip-path:polygon(3.25rem_0,100%_0,calc(100%-3.25rem)_100%,0_100%)]",
  "md:[clip-path:polygon(3.75rem_0,100%_0,calc(100%-3.75rem)_100%,0_100%)]",
  "lg:[clip-path:polygon(4.32rem_0,100%_0,calc(100%-4.32rem)_100%,0_100%)]",
  "xl:max-w-[26rem]",
].join(" ");

const cardClipLastClassName = [
  "max-w-96",
  "[clip-path:polygon(2.75rem_0,100%_0,100%_100%,0_100%)]",
  "sm:[clip-path:polygon(3.25rem_0,100%_0,100%_100%,0_100%)]",
  "md:[clip-path:polygon(3.75rem_0,100%_0,100%_100%,0_100%)]",
  "lg:max-w-none lg:flex-[1.25] lg:[clip-path:polygon(4.32rem_0,100%_0,100%_100%,0_100%)]",
].join(" ");

const cardTextInsetClassName =
  "pl-12 pr-12 sm:pl-14 sm:pr-14 md:pl-16 md:pr-16 lg:pl-[4.75rem] lg:pr-[4.75rem]";

const cardTextInsetLastClassName =
  "pl-12 pr-5 sm:pl-14 sm:pr-8 md:pl-16 lg:pl-[4.75rem]";

export function EnvironmentsIntro({
  eyebrow,
  title,
  description,
  ctaLabel,
  ctaHref,
  cards,
}: EnvironmentsIntroProps) {
  return (
    <section className="overflow-x-clip pt-12 md:pt-16">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-10">
        <div className="relative z-10 mx-auto w-[90%] max-w-xl shrink-0 px-6 md:px-8 lg:mx-0 lg:ml-[5%] lg:w-auto lg:max-w-md lg:pr-4 xl:max-w-lg 2xl:max-w-xl">
          <SectionEyebrow>{eyebrow}</SectionEyebrow>
          <h2 className="font-display text-3xl leading-tight text-foreground md:text-4xl lg:text-5xl">
            {title}
          </h2>
          <p className="mt-4 font-sans text-base leading-relaxed text-secondary md:text-lg">
            {description}
          </p>
          <Link
            href={ctaHref}
            className="group mt-8 inline-flex items-center gap-3 font-sans text-sm font-medium text-foreground transition-colors duration-200 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {ctaLabel}
            <span
              aria-hidden
              className="flex h-10 w-10 items-center justify-center rounded-full border border-foreground/30 transition-colors duration-200 group-hover:border-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </span>
          </Link>
        </div>

        <ul className="flex w-full min-w-0 flex-1 items-stretch justify-end">
          {cards.map((card, index) => {
            const isLast = index === cards.length - 1;

            return (
              <li
                key={card.id}
                className={`${cardBaseClassName} ${cardOverlapClassName} ${
                  isLast ? cardClipLastClassName : cardClipClassName
                }`}
              >
                <Image
                  src={card.image}
                  alt=""
                  fill
                  className="object-cover"
                  sizes={
                    isLast
                      ? "(max-width: 1024px) 40vw, 40vw"
                      : "(max-width: 1024px) 33vw, 26rem"
                  }
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-linear-to-t from-black/80 via-black/35 to-transparent"
                />
                <div
                  className={`absolute inset-x-0 bottom-0 z-10 flex w-full flex-col items-start justify-end pt-4 pb-6 text-white sm:pb-8 ${
                    isLast ? cardTextInsetLastClassName : cardTextInsetClassName
                  }`}
                >
                  <div className="flex w-full min-h-38 flex-col justify-start sm:min-h-42 lg:min-h-46">
                    <span className="font-sans text-[clamp(0.7rem,0.2rem+1.9cqw,0.8125rem)] tracking-widest text-white/80">
                      {card.id}
                    </span>
                    <span
                      aria-hidden
                      className="mt-2 block h-px w-8 bg-white/70"
                    />
                    <h3 className="mt-3 font-display text-[clamp(1.125rem,0.45rem+3.6cqw,1.75rem)] leading-tight text-balance wrap-break-word">
                      {card.title}
                    </h3>
                    <p className="mt-2 max-w-[18ch] font-sans text-[clamp(0.7rem,0.25rem+2cqw,0.9375rem)] leading-relaxed text-white/85">
                      {card.subtitle}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div
        role="separator"
        aria-hidden
        className="h-px w-full bg-border/60"
      />
    </section>
  );
}
