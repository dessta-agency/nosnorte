import {
  AMBIENTE_CATALOG,
  type AmbienteId,
} from "@/constants/ambiente-copy";
import {
  AMBIENTE_INTRO_CARD_KEYS,
  type Ambiente,
  type AmbienteIntroCard,
  type AmbienteProduct,
  type AmbienteSlug,
} from "@/types/ambiente";

const SHOWROOM_IMAGE_BASE = "/images/showroom";

const DEFAULT_PRODUCTS = [
  { type: "pavimento", materialKey: "pavimento" },
  { type: "revestimento", materialKey: "revestimento" },
  { type: "lavatorio", materialKey: "lavatorio" },
  { type: "torneira", materialKey: "torneira" },
] as const satisfies readonly AmbienteProduct[];

function imageSrc(fileName: string): string {
  return `${SHOWROOM_IMAGE_BASE}/${fileName}`;
}

function buildAmbiente(
  id: AmbienteId,
  fileName: string,
  index: number,
): Ambiente {
  const total = AMBIENTE_CATALOG.length;
  const neighborA =
    AMBIENTE_CATALOG[(index + 1) % total]?.fileName ?? fileName;
  const neighborB =
    AMBIENTE_CATALOG[(index + 2) % total]?.fileName ?? fileName;

  return {
    slug: id,
    category: "casa-de-banho",
    coverImage: imageSrc(fileName),
    images: [imageSrc(fileName), imageSrc(neighborA), imageSrc(neighborB)],
    span: (index % 3 === 0 ? 2 : 1) as 1 | 2,
    products: DEFAULT_PRODUCTS,
  };
}

/**
 * Ambientes entries use forced numeric IDs from `AMBIENTE_CATALOG` (stable URLs).
 */
export function getAmbientes(): Ambiente[] {
  return AMBIENTE_CATALOG.map((entry, index) =>
    buildAmbiente(entry.id, entry.fileName, index),
  );
}

/**
 * Intro cards use the first catalog images (bathroom style copy).
 */
export function getAmbienteIntroCards(): AmbienteIntroCard[] {
  return AMBIENTE_INTRO_CARD_KEYS.flatMap((messageKey, index) => {
    const entry = AMBIENTE_CATALOG[index];
    if (!entry) return [];

    return [
      {
        id: String(index + 1).padStart(2, "0"),
        messageKey,
        image: imageSrc(entry.fileName),
      },
    ];
  });
}

export function getAmbienteBySlug(slug: string): Ambiente | undefined {
  return getAmbientes().find((ambiente) => ambiente.slug === slug);
}

export function getAllAmbienteSlugs(): AmbienteSlug[] {
  return getAmbientes().map((ambiente) => ambiente.slug);
}
