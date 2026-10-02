"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { SectionEyebrow } from "@/components/ui/SectionEyebrow/SectionEyebrow";
import { GALLERY_MEDIA_GAP, GALLERY_MEDIA_RADIUS } from "@/constants/layout";
import { Link } from "@/i18n/navigation";
import type { AmbienteFilterId, AmbienteListItem } from "@/types/ambiente";

type FilterOption = {
  id: AmbienteFilterId;
  label: string;
};

type EnvironmentsGalleryProps = {
  eyebrow: string;
  title: string;
  emptyLabel: string;
  filters: FilterOption[];
  items: AmbienteListItem[];
  initialFilter?: AmbienteFilterId;
};

export function EnvironmentsGallery({
  eyebrow,
  title,
  emptyLabel,
  filters,
  items,
  initialFilter = "all",
}: EnvironmentsGalleryProps) {
  const [activeFilter, setActiveFilter] =
    useState<AmbienteFilterId>(initialFilter);

  const visibleItems = useMemo(() => {
    if (activeFilter === "all") return items;
    return items.filter((item) => item.category === activeFilter);
  }, [activeFilter, items]);

  return (
    <section id="galeria" className="scroll-mt-28 pt-8 pb-12 md:pt-12 md:pb-20">
      <div className="mb-8 flex flex-col gap-8 md:mb-12 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <SectionEyebrow>{eyebrow}</SectionEyebrow>
          <h2 className="font-display text-3xl leading-tight text-foreground md:text-4xl">
            {title}
          </h2>
        </div>

        <nav aria-label={title} className="border-b border-border/60">
          <ul className="flex flex-wrap gap-x-4 gap-y-2 md:gap-x-10 md:gap-y-3">
            {filters.map((filter) => {
              const isActive = filter.id === activeFilter;

              return (
                <li key={filter.id}>
                  <button
                    type="button"
                    onClick={() => setActiveFilter(filter.id)}
                    aria-pressed={isActive}
                    className={`-mb-px cursor-pointer border-b-2 pb-2 font-sans text-sm tracking-wide transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary ${
                      isActive
                        ? "border-primary font-semibold text-primary"
                        : "border-transparent font-medium text-muted hover:text-foreground"
                    }`}
                  >
                    {filter.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {visibleItems.length === 0 ? (
        <p className="font-sans text-sm text-muted">{emptyLabel}</p>
      ) : (
        <ul className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[minmax(14rem,18rem)] ${GALLERY_MEDIA_GAP}`}>
          {visibleItems.map((item, index) => {
            const position = index % 6;
            const gridPlacement =
              position === 0
                ? "lg:row-span-2"
                : position === 1
                  ? "lg:col-span-2"
                  : "";

            return (
              <li key={item.slug} className={gridPlacement}>
                <Link
                  href={item.href}
                  className={`relative flex h-full min-h-[16rem] overflow-hidden ${GALLERY_MEDIA_RADIUS} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary sm:min-h-[18rem] lg:min-h-0`}
                >
                  <Image
                    src={item.coverImage}
                    alt={item.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/25 to-transparent" />
                  <div className="relative z-10 flex flex-col justify-end p-6 md:p-8">
                    <p className="mb-2 font-sans text-xs font-medium tracking-[0.18em] text-white/80 uppercase">
                      {item.categoryLabel}
                    </p>
                    <h3 className="font-display text-2xl text-white md:text-3xl">
                      {item.name}
                    </h3>
                    {item.excerpt ? (
                      <p className="mt-2 max-w-md font-sans text-sm leading-relaxed text-white/85 md:text-base">
                        {item.excerpt}
                      </p>
                    ) : null}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
