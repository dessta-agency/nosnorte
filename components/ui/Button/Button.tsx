import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

export type ButtonVariant =
  | "primary"
  | "outline"
  | "light"
  | "dark"
  | "secondary";

type ButtonBaseProps = {
  variant?: ButtonVariant;
  startIcon?: ReactNode;
  showArrow?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonAsButton = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    href?: undefined;
  };

type ButtonAsLink = ButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const BASE_STYLES =
  "group relative inline-flex cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-lg px-6 py-3 font-sans text-sm font-semibold tracking-wide transition-shadow duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:px-7 md:py-3.5";

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white shadow-md",
  outline: "border-2 border-primary bg-white text-primary",
  light: "bg-gray-light text-foreground shadow-sm hover:shadow-md",
  dark: "bg-foreground text-white shadow-md",
  secondary: "bg-gray-light text-foreground shadow-sm hover:shadow-md",
};

const FILL_STYLES: Partial<Record<ButtonVariant, string>> = {
  primary: "bg-primary-hover",
  outline: "bg-primary",
  dark: "bg-secondary",
};

const TEXT_HOVER_STYLES: Partial<Record<ButtonVariant, string>> = {
  primary: "group-hover:text-white",
  outline: "group-hover:text-white",
  dark: "group-hover:text-white",
};

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5 ${className}`}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
      />
    </svg>
  );
}

export function Button({
  variant = "primary",
  startIcon,
  showArrow = false,
  className = "",
  children,
  href,
  ...props
}: ButtonProps) {
  const hasFill = Boolean(FILL_STYLES[variant]);
  const classes = `${BASE_STYLES} ${VARIANT_STYLES[variant]} ${className}`;

  const content = (
    <>
      {hasFill && (
        <span
          aria-hidden
          className={`pointer-events-none absolute inset-0 origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 ${FILL_STYLES[variant]}`}
        />
      )}
      {startIcon && (
        <span className="relative z-10 flex shrink-0 items-center justify-center">
          {startIcon}
        </span>
      )}
      <span
        className={`relative z-10 transition-colors duration-300 ${TEXT_HOVER_STYLES[variant] ?? ""}`}
      >
        {children}
      </span>
      {showArrow && (
        <span
          className={`relative z-10 transition-colors duration-300 ${TEXT_HOVER_STYLES[variant] ?? ""}`}
        >
          <ArrowIcon />
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        {...(props as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      {...(props as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {content}
    </button>
  );
}
