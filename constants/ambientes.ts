import type {
  Ambiente,
  AmbienteIntroCard,
  AmbienteSlug,
} from "@/types/ambiente";

/**
 * Structural mock data for Ambientes.
 * Copy lives in messages/{locale}.json under the ambientes namespace.
 * Replace this source with an API later.
 */
export const AMBIENTE_INTRO_CARDS = [
  {
    id: "01",
    categoryId: "casa-de-banho",
    image: "/images/showroom/1.jpg",
  },
  {
    id: "02",
    categoryId: "interiores",
    image: "/images/showroom/4.jpg",
  },
  {
    id: "03",
    categoryId: "exteriores",
    image: "/images/showroom/7.jpg",
  },
] as const satisfies readonly AmbienteIntroCard[];

export const AMBIENTES = [
  {
    slug: "suite-mineral",
    category: "casa-de-banho",
    coverImage: "/images/showroom/1.jpg",
    images: [
      "/images/showroom/1.jpg",
      "/images/showroom/2.jpg",
      "/images/showroom/3.jpg",
    ],
    span: 2,
    products: [
      { type: "pavimento", materialKey: "pavimento", href: "/produtos" },
      { type: "revestimento", materialKey: "revestimento", href: "/produtos" },
      { type: "lavatorio", materialKey: "lavatorio", href: "/produtos" },
      { type: "torneira", materialKey: "torneira", href: "/produtos" },
    ],
  },
  {
    slug: "banho-zen",
    category: "casa-de-banho",
    coverImage: "/images/showroom/2.jpg",
    images: [
      "/images/showroom/2.jpg",
      "/images/showroom/5.jpg",
      "/images/showroom/8.jpg",
    ],
    span: 1,
    products: [
      { type: "revestimento", materialKey: "revestimento", href: "/produtos" },
      { type: "lavatorio", materialKey: "lavatorio", href: "/produtos" },
      { type: "torneira", materialKey: "torneira", href: "/produtos" },
    ],
  },
  {
    slug: "sala-luminosa",
    category: "interiores",
    coverImage: "/images/showroom/4.jpg",
    images: [
      "/images/showroom/4.jpg",
      "/images/home/image1.jpg",
      "/images/showroom/6.jpg",
    ],
    span: 1,
    products: [
      { type: "pavimento", materialKey: "pavimento", href: "/produtos" },
      { type: "revestimento", materialKey: "revestimento", href: "/produtos" },
      { type: "iluminacao", materialKey: "iluminacao", href: "/produtos" },
    ],
  },
  {
    slug: "cozinha-aberta",
    category: "interiores",
    coverImage: "/images/showroom/6.jpg",
    images: [
      "/images/showroom/6.jpg",
      "/images/showroom/9.jpg",
      "/images/home/image2.jpg",
    ],
    span: 2,
    products: [
      { type: "pavimento", materialKey: "pavimento", href: "/produtos" },
      { type: "revestimento", materialKey: "revestimento", href: "/produtos" },
      { type: "mobiliario", materialKey: "mobiliario", href: "/produtos" },
    ],
  },
  {
    slug: "terraco-mediterraneo",
    category: "exteriores",
    coverImage: "/images/showroom/7.jpg",
    images: [
      "/images/showroom/7.jpg",
      "/images/showroom/10.jpg",
      "/images/home/image3.jpg",
    ],
    span: 2,
    products: [
      { type: "pavimento", materialKey: "pavimento", href: "/produtos" },
      { type: "revestimento", materialKey: "revestimento", href: "/produtos" },
    ],
  },
  {
    slug: "jardim-contemporaneo",
    category: "exteriores",
    coverImage: "/images/showroom/10.jpg",
    images: [
      "/images/showroom/10.jpg",
      "/images/showroom/8.jpg",
      "/images/showroom/3.jpg",
    ],
    span: 1,
    products: [
      { type: "pavimento", materialKey: "pavimento", href: "/produtos" },
      { type: "iluminacao", materialKey: "iluminacao", href: "/produtos" },
    ],
  },
  {
    slug: "suite-marmore",
    category: "casa-de-banho",
    coverImage: "/images/showroom/5.jpg",
    images: [
      "/images/showroom/5.jpg",
      "/images/showroom/1.jpg",
      "/images/showroom/9.jpg",
    ],
    span: 1,
    products: [
      { type: "pavimento", materialKey: "pavimento", href: "/produtos" },
      { type: "revestimento", materialKey: "revestimento", href: "/produtos" },
      { type: "lavatorio", materialKey: "lavatorio", href: "/produtos" },
      { type: "torneira", materialKey: "torneira", href: "/produtos" },
    ],
  },
  {
    slug: "living-neutro",
    category: "interiores",
    coverImage: "/images/showroom/9.jpg",
    images: [
      "/images/showroom/9.jpg",
      "/images/showroom/4.jpg",
      "/images/home/image1.jpg",
    ],
    span: 1,
    products: [
      { type: "pavimento", materialKey: "pavimento", href: "/produtos" },
      { type: "mobiliario", materialKey: "mobiliario", href: "/produtos" },
      { type: "iluminacao", materialKey: "iluminacao", href: "/produtos" },
    ],
  },
] as const satisfies readonly Ambiente[];

export function getAmbienteBySlug(slug: string): Ambiente | undefined {
  return AMBIENTES.find((ambiente) => ambiente.slug === slug);
}

export function getAllAmbienteSlugs(): AmbienteSlug[] {
  return AMBIENTES.map((ambiente) => ambiente.slug);
}
