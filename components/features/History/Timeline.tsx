type Milestone = {
  year: string;
  title: string;
  description: string;
};

type TimelineProps = {
  title: string;
  description: string;
  milestones: Milestone[];
};

export function Timeline({ title, description, milestones }: TimelineProps) {
  return (
    <div>
      <header className="mx-auto mb-10 max-w-5xl text-center md:mb-14">
        <h2 className="font-display text-3xl leading-tight text-foreground md:text-4xl">
          {title}
        </h2>
        <p className="mt-4 font-sans text-base leading-relaxed text-secondary md:text-lg">
          {description}
        </p>
      </header>

      {/* Mobile: vertical timeline */}
      <ol className="relative mx-auto max-w-md space-y-8 border-l border-border md:hidden">
        {milestones.map((milestone) => (
          <li key={milestone.year} className="relative pl-8">
            <span
              className="absolute top-1 left-0 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-white"
              aria-hidden="true"
            >
              •
            </span>
            <p className="font-display text-2xl text-primary">{milestone.year}</p>
            <h3 className="mt-1 font-sans text-base font-semibold text-foreground">
              {milestone.title}
            </h3>
            <p className="mt-1 font-sans text-sm leading-relaxed text-secondary">
              {milestone.description}
            </p>
          </li>
        ))}
      </ol>

      {/* Desktop: horizontal timeline */}
      <ol className="relative mx-auto hidden max-w-6xl gap-6 px-10 md:grid md:grid-cols-4 lg:px-14">
        <li
          className="pointer-events-none absolute top-7 right-0 left-0 h-px bg-border"
          aria-hidden="true"
        />
        {milestones.map((milestone) => (
          <li
            key={milestone.year}
            className="relative flex flex-col items-center pt-1 text-center"
          >
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-sm">
              <span className="font-display text-sm text-white">
                {milestone.year}
              </span>
            </div>
            <h3 className="font-sans text-base font-semibold text-foreground">
              {milestone.title}
            </h3>
            <p className="mt-2 max-w-[16rem] font-sans text-sm leading-relaxed text-secondary">
              {milestone.description}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
