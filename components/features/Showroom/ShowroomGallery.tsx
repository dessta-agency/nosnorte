"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Modal } from "@/components/ui/Modal/Modal";
import { Reveal } from "@/components/ui/Reveal/Reveal";
import {
  GALLERY_MEDIA_GAP,
  GALLERY_MEDIA_RADIUS,
  MEDIA_HOVER_CARD,
  MEDIA_HOVER_MEDIA,
} from "@/constants/layout";

/** First tiles appear immediately (typically the row below the hero). */
const IMMEDIATE_TILE_COUNT = 3;

export type ShowroomImage = {
  src: string;
  alt: string;
  title?: string;
  span?: number;
};

type ShowroomGalleryProps = {
  title?: string;
  images: ShowroomImage[];
  closeLabel: string;
  previousLabel: string;
  nextLabel: string;
};

function ChevronLeftIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className={className}
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function ChevronRightIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      className={className}
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  );
}

export function ShowroomGallery({
  title,
  images,
  closeLabel,
  previousLabel,
  nextLabel,
}: ShowroomGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedImage =
    selectedIndex !== null ? images[selectedIndex] : undefined;
  const canNavigate = images.length > 1;

  function goToPrevious() {
    setSelectedIndex((current) => {
      if (current === null || images.length === 0) return current;
      return (current - 1 + images.length) % images.length;
    });
  }

  function goToNext() {
    setSelectedIndex((current) => {
      if (current === null || images.length === 0) return current;
      return (current + 1) % images.length;
    });
  }

  useEffect(() => {
    if (selectedIndex === null || !canNavigate) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setSelectedIndex((current) => {
          if (current === null || images.length === 0) return current;
          return (current - 1 + images.length) % images.length;
        });
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        setSelectedIndex((current) => {
          if (current === null || images.length === 0) return current;
          return (current + 1) % images.length;
        });
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, canNavigate, images.length]);

  const navButtonClassName =
    "absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

  return (
    <div>
      {title ? (
        <h2 className="mb-8 font-display text-3xl leading-tight text-foreground md:mb-10 md:text-4xl">
          {title}
        </h2>
      ) : null}

      <ul
        className={`grid auto-rows-48 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 ${GALLERY_MEDIA_GAP}`}
      >
        {images.map((image, index) => {
          const span = image.span ?? 1;
          const isImmediate = index < IMMEDIATE_TILE_COUNT;

          return (
            <li
              key={image.src}
              className={`min-h-0 ${MEDIA_HOVER_CARD}`}
              style={{ gridRow: `span ${span}` }}
            >
              <Reveal
                className="h-full"
                immediate={isImmediate}
                durationMs={isImmediate ? undefined : 2200}
                threshold={isImmediate ? undefined : 0.2}
                delayMs={isImmediate ? 0 : (index % 3) * 120}
              >
                <button
                  type="button"
                  onClick={() => setSelectedIndex(index)}
                  aria-label={image.title ?? image.alt}
                  className={`relative h-full w-full cursor-pointer overflow-hidden ${GALLERY_MEDIA_RADIUS} bg-gray-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className={`object-cover ${MEDIA_HOVER_MEDIA}`}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority={isImmediate}
                  />
                </button>
              </Reveal>
            </li>
          );
        })}
      </ul>

      {selectedImage ? (
        <Modal
          isOpen
          onClose={() => setSelectedIndex(null)}
          title={selectedImage.title ?? selectedImage.alt}
          closeLabel={closeLabel}
          hideTitle
          variant="media"
          className="max-w-[min(100%,64rem)]"
        >
          <div className="relative w-fit max-w-full">
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              width={2400}
              height={1600}
              className="block h-auto max-h-[min(80vh,42rem)] w-auto max-w-full object-contain"
              sizes="(max-width: 1024px) calc(100vw - 2rem), 64rem"
              priority
            />

            {canNavigate ? (
              <>
                <button
                  type="button"
                  onClick={goToPrevious}
                  aria-label={previousLabel}
                  className={`${navButtonClassName} left-2 sm:left-3`}
                >
                  <ChevronLeftIcon className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={goToNext}
                  aria-label={nextLabel}
                  className={`${navButtonClassName} right-2 sm:right-3`}
                >
                  <ChevronRightIcon className="h-6 w-6" />
                </button>
              </>
            ) : null}
          </div>
        </Modal>
      ) : null}
    </div>
  );
}
