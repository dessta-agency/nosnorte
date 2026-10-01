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

const cardBaseClassName =
  "relative h-[20rem] min-w-0 overflow-hidden sm:h-[24rem] md:h-[28rem] lg:h-[32rem] lg:shrink-0";

const cardOverlapClassName =
  "not-first:-ml-8 sm:not-first:-ml-10 md:not-first:-ml-12 lg:not-first:-ml-[calc(0.18*24rem-0.25rem)] xl:not-first:-ml-[calc(0.18*26rem-0.25rem)]";

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
        <div className="mx-auto w-[90%] max-w-xl shrink-0 px-6 md:px-8 lg:mx-0 lg:ml-[5%] lg:w-auto lg:pr-4">
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

        <ul className="flex w-full min-w-0 flex-1 items-stretch justify-end gap-0">
          {cards.map((card, index) => {
            const isLast = index === cards.length - 1;

            return (
              <li
                key={card.id}
                className={`${cardBaseClassName} ${cardOverlapClassName} ${
                  isLast
                    ? "flex-[1.2] [clip-path:polygon(18%_0,100%_0,100%_100%,0_100%)] lg:min-w-[24rem] lg:flex-1 lg:[clip-path:polygon(4.32rem_0,100%_0,100%_100%,0_100%)] xl:min-w-[26rem] xl:[clip-path:polygon(4.68rem_0,100%_0,100%_100%,0_100%)]"
                    : "flex-1 [clip-path:polygon(18%_0,100%_0,82%_100%,0_100%)] lg:w-[24rem] lg:flex-none xl:w-[26rem]"
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
                  className={`absolute inset-x-0 bottom-0 z-10 flex flex-col items-start justify-end p-4 pb-6 text-white sm:p-5 sm:pb-8 ${
                    isLast ? "pr-6 pl-10 sm:pl-12" : "pr-[22%] pl-9 sm:pl-11"
                  }`}
                >
                  <div className="flex h-[9.5rem] flex-col justify-start sm:h-[10.5rem] lg:h-[11.5rem]">
                    <span className="font-sans text-xs tracking-widest text-white/80">
                      {card.id}
                    </span>
                    <span
                      aria-hidden
                      className="mt-2 block h-px w-8 bg-white/70"
                    />
                    <h3 className="mt-3 font-display text-base leading-tight sm:text-lg md:text-xl lg:text-2xl">
                      {card.title}
                    </h3>
                    <p className="mt-2 max-w-[16ch] font-sans text-[0.7rem] leading-relaxed text-white/85 sm:max-w-[18ch] sm:text-xs lg:text-sm">
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
