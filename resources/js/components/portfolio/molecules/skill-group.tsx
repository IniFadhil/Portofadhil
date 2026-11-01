type SkillGroupProps = {
    label: string;
    items: string[];
};

const PILL =
    'rounded-lg bg-deck-850 px-3 py-1.5 text-sand transition-colors hover:bg-deck-800';

/** One row of the skills table: the group on the left, its tools on the right. */
export default function SkillGroup({ label, items }: SkillGroupProps) {
    return (
        <div className="flex flex-col justify-between gap-3 rounded-2xl bg-deck-900 p-4 transition-colors hover:bg-deck-850 sm:p-5 md:flex-row md:items-center">
            <span className="shrink-0 text-sm font-bold tracking-wider text-slate-muted md:w-56">
                {label}
            </span>

            <div className="flex flex-wrap gap-2 text-base">
                {items.map((item) => (
                    <span key={item} className={PILL}>
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
}
