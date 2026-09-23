import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-4">
      <h1 className="text-2xl font-semibold">404</h1>
      <p className="text-muted">Página não encontrada.</p>
      <Link href="/" className="text-primary underline">
        Voltar ao início
      </Link>
    </main>
  );
}
