import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

export type TextLinkProps = {
  href: string;
  external?: boolean;
  endIcon?: ReactNode;
  children: ReactNode;
  className?: string;
} & Omit<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  "href" | "children" | "className"
>;

function ExternalLinkIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="h-4 w-4 shrink-0"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
      />
    </svg>
  );
}

export function TextLink({
  href,
  external = false,
  endIcon,
  children,
  className = "",
  ...props
}: TextLinkProps) {
  const classes = `group inline-flex cursor-pointer items-center gap-1.5 font-sans text-sm font-semibold text-primary underline-offset-4 transition-colors duration-200 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${className}`;

  const icon = endIcon ?? (external ? <ExternalLinkIcon /> : null);

  const content = (
    <>
      <span>{children}</span>
      {icon}
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...props}>
      {content}
    </Link>
  );
}
