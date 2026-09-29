import Image from "next/image";

type ValueIcon = "advice" | "diversity" | "delivery";

type ValueCardProps = {
  title: string;
  description: string;
  icon?: ValueIcon;
};

const ICON_SRC: Record<ValueIcon, string> = {
  advice: "/icons/technical.png",
  diversity: "/icons/layers.png",
  delivery: "/icons/delivery.png",
};

export function ValueCard({
  title,
  description,
  icon = "advice",
}: ValueCardProps) {
  return (
    <article className="flex flex-col items-center text-center">
      <div className="relative mb-6 h-12 w-12">
        <Image
          src={ICON_SRC[icon]}
          alt=""
          fill
          className="object-contain"
          sizes="48px"
        />
      </div>
      <h3 className="mb-3 font-sans text-lg font-semibold leading-snug text-foreground">
        {title}
      </h3>
      <p className="font-sans text-sm leading-relaxed text-secondary">
        {description}
      </p>
    </article>
  );
}
