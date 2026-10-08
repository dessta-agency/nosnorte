import Image from "next/image";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow/SectionEyebrow";
import { Link } from "@/i18n/navigation";

function BackArrowIcon() {
  return (
    <Image
      src="/icons/back.png"
      alt=""
      width={16}
      height={16}
      className="shrink-0"
    />
  );
}

export type EnvironmentDetailMaterial = {
  typeLabel: string;
  name: string;
};

export type EnvironmentDetailImage = {
  src: string;
  alt: string;
};

type EnvironmentDetailViewProps = {
  name: string;
  categoryLabel: string;
  description: string;
  materialsTitle: string;
  materials: EnvironmentDetailMaterial[];
  galleryTitle: string;
  galleryImages: EnvironmentDetailImage[];
  backLabel: string;
  backHref: string;
};

export function EnvironmentDetailView({
  name,
  categoryLabel,
  description,
  materialsTitle,
  materials,
  galleryTitle,
  galleryImages,
  backLabel,
  backHref,
}: EnvironmentDetailViewProps) {
  return (
    <article className="py-10 md:py-14">
      <Link
        href={backHref}
        className="inline-flex items-center gap-2 font-sans text-sm font-semibold text-primary underline-offset-4 transition-colors duration-200 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <BackArrowIcon />
        {backLabel}
      </Link>

      <header className="mt-8 max-w-3xl">
        <SectionEyebrow>{categoryLabel}</SectionEyebrow>
        <h1 className="font-display text-4xl leading-tight text-foreground md:text-5xl">
          {name}
        </h1>
        <p className="mt-5 font-sans text-base leading-relaxed text-secondary md:text-lg">
          {description}
        </p>
      </header>

      <section className="mt-14 md:mt-16">
        <h2 className="font-display text-2xl text-foreground md:text-3xl">
          {materialsTitle}
        </h2>
        <ul className="mt-8 divide-y divide-border/60 border-y border-border/60">
          {materials.map((material) => (
            <li
              key={`${material.typeLabel}-${material.name}`}
              className="py-5"
            >
              <p className="font-sans text-xs font-medium tracking-[0.16em] text-muted uppercase">
                {material.typeLabel}
              </p>
              <p className="mt-1 font-sans text-base text-foreground md:text-lg">
                {material.name}
              </p>
            </li>
          ))}
        </ul>
      </section>

      {galleryImages.length > 0 ? (
        <section className="mt-14 md:mt-20">
          <h2 className="mb-8 font-display text-2xl text-foreground md:mb-10 md:text-3xl">
            {galleryTitle}
          </h2>
          <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:gap-6">
            {galleryImages.map((image, index) => (
              <li
                key={`${image.src}-${index}`}
                className={index === 0 ? "sm:col-span-2" : undefined}
              >
                <figure
                  className={`relative overflow-hidden rounded-2xl bg-gray-light ${
                    index === 0 ? "aspect-[16/9]" : "aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes={
                      index === 0 ? "100vw" : "(max-width: 640px) 100vw, 50vw"
                    }
                  />
                </figure>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  );
}
