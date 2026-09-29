import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type IconButtonBaseProps = {
  icon: ReactNode;
  className?: string;
  "aria-label": string;
};

type IconButtonAsButton = IconButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof IconButtonBaseProps> & {
    href?: undefined;
  };

type IconButtonAsLink = IconButtonBaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof IconButtonBaseProps> & {
    href: string;
  };

export type IconButtonProps = IconButtonAsButton | IconButtonAsLink;

const BASE_STYLES =
  "group inline-flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-primary text-white shadow-md transition-all duration-300 hover:bg-primary/90 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary md:h-16 md:w-16";

export function IconButton({
  icon,
  className = "",
  href,
  ...props
}: IconButtonProps) {
  const classes = `${BASE_STYLES} ${className}`;

  const content = (
    <span className="flex items-center justify-center transition-transform duration-300 group-hover:translate-x-0.5">
      {icon}
    </span>
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
