export const AMBIENTE_CATEGORY_IDS = [
  "casa-de-banho",
  "interiores",
  "exteriores",
] as const;

export type AmbienteCategoryId = (typeof AMBIENTE_CATEGORY_IDS)[number];

export type AmbienteFilterId = "all" | AmbienteCategoryId;

export type AmbienteIntroCard = {
  id: string;
  categoryId: AmbienteCategoryId;
  image: string;
};

export const AMBIENTE_SLUGS = [
  "suite-mineral",
  "banho-zen",
  "sala-luminosa",
  "cozinha-aberta",
  "terraco-mediterraneo",
  "jardim-contemporaneo",
  "suite-marmore",
  "living-neutro",
] as const;

export type AmbienteSlug = (typeof AMBIENTE_SLUGS)[number];

export type AmbienteProductTypeId =
  | "pavimento"
  | "revestimento"
  | "lavatorio"
  | "torneira"
  | "iluminacao"
  | "mobiliario";

export type AmbienteProduct = {
  type: AmbienteProductTypeId;
  /** Translation key under `ambientes.items.{slug}.materials.{materialKey}` */
  materialKey: string;
  href: string;
};

export type Ambiente = {
  slug: AmbienteSlug;
  category: AmbienteCategoryId;
  coverImage: string;
  images: readonly string[];
  products: readonly AmbienteProduct[];
  /** Relative visual weight in the editorial gallery (1 = default, 2 = taller). */
  span?: 1 | 2;
};

export type AmbienteListItem = {
  slug: AmbienteSlug;
  category: AmbienteCategoryId;
  categoryLabel: string;
  name: string;
  excerpt: string;
  coverImage: string;
  imageAlt: string;
  span: 1 | 2;
  href: string;
};
