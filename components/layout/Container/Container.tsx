import type { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={["mx-auto w-full px-2 md:w-[90%] md:px-8", className].filter(Boolean).join(" ")}>
      {children}
    </div>
  );
}
