import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={["mx-auto w-[90%] px-6 md:px-8", className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
