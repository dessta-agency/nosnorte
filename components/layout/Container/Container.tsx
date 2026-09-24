import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={["mx-auto w-[96%] px-4", className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
