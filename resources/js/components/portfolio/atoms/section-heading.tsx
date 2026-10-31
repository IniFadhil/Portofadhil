type SectionHeadingProps = {
    /** The short label on the accent rule, e.g. `Tentang`. */
    kicker: string;
    title: string;
    lead?: string;
    className?: string;
};

export default function SectionHeading({
    kicker,
    title,
    lead,
    className,
}: SectionHeadingProps) {
    return (
        <div className={className}>
            <span className="flex items-center gap-2 text-xs font-bold tracking-widest text-accent-teal uppercase">
                <span className="h-[2px] w-4 bg-accent-teal" aria-hidden />
                {kicker}
            </span>

            <h2 className="mt-1 font-display text-3xl font-black tracking-tight text-sand uppercase sm:text-4xl">
                {title}
            </h2>

            {lead ? (
                <p className="mt-1 text-xs text-slate-muted sm:text-sm">
                    {lead}
                </p>
            ) : null}
        </div>
    );
}
