import type { ReactNode } from "react";

export type SectionEyebrowProps = {
  children: ReactNode;
  className?: string;
};

export function SectionEyebrow({
  children,
  className = "",
}: SectionEyebrowProps) {
  return (
    <div className={`mb-2 flex items-center gap-3 ${className}`}>
      <span className="h-0.5 w-8 shrink-0 bg-primary" aria-hidden />
      <p className="font-sans text-xs font-medium tracking-[0.2em] text-muted uppercase">
        {children}
      </p>
    </div>
  );
}
