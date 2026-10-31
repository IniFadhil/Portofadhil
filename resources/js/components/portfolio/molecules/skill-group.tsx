type SkillGroupProps = {
    label: string;
    items: string[];
};

const PILL =
    'rounded-lg border border-deck-700/60 bg-deck-850 px-3 py-1.5 text-sand transition-colors hover:border-accent-teal';

/** One row of the skills table: the group on the left, its tools on the right. */
export default function SkillGroup({ label, items }: SkillGroupProps) {
    return (
        <div className="flex flex-col justify-between gap-3 rounded-2xl border border-deck-700/60 bg-deck-900/60 p-4 transition-colors hover:border-accent-teal/30 sm:p-5 md:flex-row md:items-center">
            <span className="shrink-0 text-xs font-bold tracking-wider text-slate-muted uppercase md:w-56">
                {label}
            </span>

            <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
                {items.map((item) => (
                    <span key={item} className={PILL}>
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
}
