/**
 * Forced numeric Ambientes IDs (used in URLs) mapped to showroom files + copy keys.
 * `copyKey` resolves messages under `ambientes.items.{copyKey}`.
 */
export const AMBIENTE_CATALOG = [
  {
    id: "1",
    copyKey: "suite-mineral",
    fileName: "alex-tyson-BfVqm3io8uE-unsplash.jpg",
  },
  {
    id: "2",
    copyKey: "linha-clara",
    fileName: "alex-tyson-JxfqdB-YCpk-unsplash.jpg",
  },
  {
    id: "3",
    copyKey: "pedra-suave",
    fileName: "alexander-fife-rDSwQ_6XFUs-unsplash.jpg",
  },
  {
    id: "4",
    copyKey: "atmosfera-zen",
    fileName: "amira-aboalnaga-O7WjrXiKy_s-unsplash.jpg",
  },
  {
    id: "5",
    copyKey: "volume-branco",
    fileName: "backbone-L4iRkKL5dng-unsplash.jpg",
  },
  {
    id: "6",
    copyKey: "textura-quente",
    fileName: "beks-mu-2tEdrFYjfMY-unsplash.jpg",
  },
  {
    id: "7",
    copyKey: "luz-filtrada",
    fileName: "brian-zajac-HTnMlMudzx0-unsplash.jpg",
  },
  {
    id: "8",
    copyKey: "areia-mate",
    fileName: "chastity-cortijo-6TY_WrJTwSI-unsplash.jpg",
  },
  {
    id: "9",
    copyKey: "quietude",
    fileName: "claus-grunstaudl-I72dFJRFT3k-unsplash.jpg",
  },
  {
    id: "10",
    copyKey: "grafite-soft",
    fileName: "clay-banks-ckdoA-tv9uw-unsplash.jpg",
  },
  {
    id: "11",
    copyKey: "composicao-aberta",
    fileName: "collov-home-design-kSoe7EoxHIE-unsplash.jpg",
  },
  {
    id: "12",
    copyKey: "horizonte-neutro",
    fileName: "horizon-eye-d2FZKMgAtKQ-unsplash.jpg",
  },
  {
    id: "13",
    copyKey: "veio-natural",
    fileName: "jared-rice-PibraWHb4h8-unsplash.jpg",
  },
  {
    id: "14",
    copyKey: "escultura-clara",
    fileName: "lotus-design-n-print-8WG4EXvdM4M-unsplash.jpg",
  },
  {
    id: "15",
    copyKey: "geometria-soft",
    fileName: "lotus-design-n-print-g51F6-WYzyU-unsplash.jpg",
  },
  {
    id: "16",
    copyKey: "calacatta",
    fileName: "mohammad-najjar-yH1k2Qp86Tk-unsplash.jpg",
  },
  {
    id: "17",
    copyKey: "terra-cozida",
    fileName: "murad-kerimli-N03PjHWOEFA-unsplash.jpg",
  },
  {
    id: "18",
    copyKey: "contorno-preto",
    fileName: "poojan-thanekar-lXHnEe5AGVo-unsplash.jpg",
  },
  {
    id: "19",
    copyKey: "espelho-longo",
    fileName: "raquel-navalon-alvarez-TWj0qbJn4zI-unsplash.jpg",
  },
  {
    id: "20",
    copyKey: "microcimento",
    fileName: "serjan-midili-mLx6oMw32PI-unsplash.jpg",
  },
  {
    id: "21",
    copyKey: "marmore-vivo",
    fileName: "steven-ungermann-Aac7IlKnYX8-unsplash.jpg",
  },
] as const;

export type AmbienteId = (typeof AMBIENTE_CATALOG)[number]["id"];
export type AmbienteCopyKey = (typeof AMBIENTE_CATALOG)[number]["copyKey"];

export function getAmbienteCatalogEntry(id: string) {
  return AMBIENTE_CATALOG.find((entry) => entry.id === id);
}

export function getAmbienteCopyKey(id: string): AmbienteCopyKey | "auto" {
  return getAmbienteCatalogEntry(id)?.copyKey ?? "auto";
}
