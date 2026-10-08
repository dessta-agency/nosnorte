import fs from "node:fs";
import path from "node:path";

const SHOWROOM_DIR = path.join(process.cwd(), "public", "images", "showroom");
const IMAGE_EXTENSIONS = new Set([
  ".jpg",
  ".jpeg",
  ".png",
  ".webp",
  ".avif",
  ".gif",
]);

export type ShowroomImageFile = {
  /** 1-based id for display / i18n numbering */
  id: string;
  fileName: string;
  src: string;
  /** URL-safe slug derived from the file name (no extension). */
  slug: string;
  /** Masonry row span for gallery layouts. */
  span: 1 | 2;
};

function toSlug(fileName: string): string {
  const base = fileName.replace(/\.[^.]+$/, "");
  const slug = base
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || "imagem";
}

/**
 * Reads every image file in `public/images/showroom/`.
 * Adding or removing files updates the Showroom listing.
 * Ambientes uses the same folder via a curated catalog (`AMBIENTE_CATALOG`), not this helper.
 */
export function getShowroomImages(): ShowroomImageFile[] {
  if (!fs.existsSync(SHOWROOM_DIR)) {
    return [];
  }

  const slugCounts = new Map<string, number>();

  return fs
    .readdirSync(SHOWROOM_DIR, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isFile() &&
        IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase()),
    )
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }))
    .map((fileName, index) => {
      const baseSlug = toSlug(fileName);
      const count = slugCounts.get(baseSlug) ?? 0;
      slugCounts.set(baseSlug, count + 1);
      const slug = count === 0 ? baseSlug : `${baseSlug}-${count + 1}`;

      return {
        id: String(index + 1),
        fileName,
        src: `/images/showroom/${fileName}`,
        slug,
        span: (index % 3 === 0 ? 2 : 1) as 1 | 2,
      };
    });
}
