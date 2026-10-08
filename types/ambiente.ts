export const AMBIENTE_CATEGORY_IDS = ["casa-de-banho"] as const;

export type AmbienteCategoryId = (typeof AMBIENTE_CATEGORY_IDS)[number];

export type AmbienteFilterId = "all" | AmbienteCategoryId;

export const AMBIENTE_INTRO_CARD_KEYS = [
  "contemporanea",
  "spa",
  "suite",
] as const;

export type AmbienteIntroCardKey = (typeof AMBIENTE_INTRO_CARD_KEYS)[number];

export type AmbienteIntroCard = {
  id: string;
  /** Message key under `ambientes.intro_cards` */
  messageKey: AmbienteIntroCardKey;
  image: string;
};

/** Slug derived from the showroom image file name. */
export type AmbienteSlug = string;

export type AmbienteProductTypeId =
  | "pavimento"
  | "revestimento"
  | "lavatorio"
  | "torneira"
  | "iluminacao"
  | "mobiliario";

export type AmbienteProduct = {
  type: AmbienteProductTypeId;
  /** Translation key under `ambientes.items.*.materials.{materialKey}` */
  materialKey: string;
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
