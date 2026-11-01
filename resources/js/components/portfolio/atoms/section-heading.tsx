type SectionHeadingProps = {
    title: string;
    lead?: string;
    className?: string;
};

export default function SectionHeading({
    title,
    lead,
    className,
}: SectionHeadingProps) {
    return (
        <div className={className}>
            <h2 className="font-display text-4xl font-black tracking-[-0.02em] text-sand uppercase sm:text-5xl">
                {title}
            </h2>

            {lead ? (
                <p className="mt-3 max-w-2xl text-base text-slate-muted">
                    {lead}
                </p>
            ) : null}
        </div>
    );
}
