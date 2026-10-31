import Reveal from '@/components/portfolio/atoms/reveal';

type SectionHeadingProps = {
    title: string;
    lead?: string;
    className?: string;
};

/**
 * The heading a section opens with: the name of the thing, then one sentence
 * saying what it is. No label above it.
 */
export default function SectionHeading({
    title,
    lead,
    className,
}: SectionHeadingProps) {
    return (
        <Reveal className={className}>
            <h2 className="max-w-[24ch] font-display text-4xl leading-[0.95] font-bold tracking-[-0.03em] text-sand sm:text-5xl">
                {title}
            </h2>

            {lead ? (
                <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-slate-muted">
                    {lead}
                </p>
            ) : null}
        </Reveal>
    );
}
