import Image from "next/image";

type MissionCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  image?: string;
};

export function MissionCard({
  eyebrow,
  title,
  description,
  image = "/images/others/mission.jpg",
}: MissionCardProps) {
  return (
    <div className="relative isolate min-h-[280px] overflow-hidden bg-primary p-6 text-white md:p-8">
      <div className="absolute inset-0">
        <Image src={image} alt="" fill className="object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/20" />

      <div className="relative z-10 flex h-full flex-col">
        <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-white/75 uppercase">
          {eyebrow}
        </p>
        <h2 className="font-display text-3xl leading-tight md:text-4xl">
          {title}
        </h2>
        <p className="mt-4 max-w-sm font-sans text-sm leading-relaxed text-white/90 md:text-base">
          {description}
        </p>
      </div>
    </div>
  );
}
