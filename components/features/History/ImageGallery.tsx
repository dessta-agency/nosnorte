import Image from "next/image";

type GalleryImage = {
  src: string;
  alt: string;
  caption?: string;
};

type ImageGalleryProps = {
  title?: string;
  images: GalleryImage[];
};

export function ImageGallery({ title, images }: ImageGalleryProps) {
  return (
    <div>
      {title ? (
        <h2 className="mb-8 font-display text-3xl leading-tight text-foreground md:mb-10 md:text-4xl">
          {title}
        </h2>
      ) : null}

      <ul className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
        {images.map((image) => (
          <li key={image.src + image.alt}>
            <figure className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-light">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              {image.caption ? (
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-4 pt-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="font-sans text-sm font-medium text-white">
                    {image.caption}
                  </span>
                </figcaption>
              ) : null}
            </figure>
          </li>
        ))}
      </ul>
    </div>
  );
}
