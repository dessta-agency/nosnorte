/**
 * Shared horizontal inset for full-bleed heroes (homepage carousel,
 * page heroes via PageHero). Keep these values identical everywhere.
 */
export const FULL_BLEED_HERO_INSET = "w-full px-10 md:px-16 lg:px-24";

/**
 * Shared surface card chrome (radius, border, fill). Compose with local
 * padding, shadow, and interaction styles as needed.
 */
export const SURFACE_CARD = "rounded-2xl border border-border/60 bg-surface";

/**
 * Shared corner radius for media gallery tiles (Ambientes + Showroom).
 * Keep these galleries in sync even when grid/behaviour differ.
 */
export const GALLERY_MEDIA_RADIUS = "rounded-lg";

/**
 * Shared gap between media gallery tiles (Ambientes + Showroom).
 */
export const GALLERY_MEDIA_GAP = "gap-2";

/**
 * Shared media hover for interactive tiles/cards.
 * Put on the outer tile wrapper (e.g. gallery `<li>`), not on the image.
 * Very slight scale-up on hover/focus (stays within typical gallery gaps).
 */
export const MEDIA_HOVER_CARD =
  "group relative transition-transform duration-500 ease-out hover:scale-[1.015] has-[:focus-visible]:scale-[1.015] motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:has-[:focus-visible]:scale-100";

/**
 * Shared image hover for media cards using `MEDIA_HOVER_CARD` (`group`).
 * Put on the covering image — slight darkening, no zoom.
 */
export const MEDIA_HOVER_MEDIA =
  "transition-[filter] duration-500 ease-out group-hover:brightness-[0.85] group-focus-within:brightness-[0.85] motion-reduce:transition-none";
