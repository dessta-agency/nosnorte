import type { ReactNode } from "react";
import { Container } from "@/components/layout/Container/Container";

type PageContainerProps = {
  children?: ReactNode;
  className?: string;
};

export function PageContainer({ children, className }: PageContainerProps) {
  return (
    <main className={className}>
      <Container className="mt-8 min-h-[50vh] border border-black">
        {children}
      </Container>
    </main>
  );
}
