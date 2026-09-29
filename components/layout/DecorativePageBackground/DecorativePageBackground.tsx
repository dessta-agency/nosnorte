/**
 * Decorative wallpaper accents for long content pages.
 * Place as the first child inside a relatively positioned page root
 * (e.g. PageContainer with `relative isolation-isolate`).
 */
export function DecorativePageBackground() {
  return (
    <div className="page-background-decorative" aria-hidden="true">
      <span className="page-background-decorative__piece page-background-decorative__piece--top-right" />
      <span className="page-background-decorative__piece page-background-decorative__piece--mid-left" />
      <span className="page-background-decorative__piece page-background-decorative__piece--bottom-right" />
    </div>
  );
}
