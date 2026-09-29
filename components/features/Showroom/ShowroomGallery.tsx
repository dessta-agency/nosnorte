"use client";

import Image from "next/image";
import { useState } from "react";
import { Modal } from "@/components/ui/Modal/Modal";

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
};

export function ShowroomGallery({
  title,
  images,
  closeLabel,
}: ShowroomGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedImage =
    selectedIndex !== null ? images[selectedIndex] : undefined;

  return (
    <div>
      {title ? (
        <h2 className="mb-8 font-display text-3xl leading-tight text-foreground md:mb-10 md:text-4xl">
          {title}
        </h2>
      ) : null}

      <ul className="grid auto-rows-48 grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
        {images.map((image, index) => {
          const span = image.span ?? 1;

          return (
            <li
              key={image.src}
              className="min-h-0"
              style={{ gridRow: `span ${span}` }}
            >
              <button
                type="button"
                onClick={() => setSelectedIndex(index)}
                aria-label={image.title ?? image.alt}
                className="group relative h-full w-full cursor-pointer overflow-hidden rounded-2xl bg-gray-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </button>
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
          className="max-w-5xl"
        >
          <div className="relative aspect-4/3 max-h-[80vh] w-full overflow-hidden rounded-lg bg-gray-light sm:aspect-auto sm:h-[min(70vh,42rem)]">
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 64rem"
              priority
            />
          </div>
        </Modal>
      ) : null}
    </div>
  );
}
