type SkillGroupProps = {
    label: string;
    items: string[];
};

/** One row of the skills table: the group, then its tools as running text. */
export default function SkillGroup({ label, items }: SkillGroupProps) {
    return (
        <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:gap-10">
            <span className="shrink-0 text-base font-semibold text-sand md:w-52">
                {label}
            </span>

            <span className="text-lg leading-relaxed text-slate-muted">
                {items.join(' · ')}
            </span>
        </div>
    );
}
