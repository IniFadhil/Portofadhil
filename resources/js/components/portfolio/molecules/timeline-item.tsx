import type { ReactNode } from 'react';

type TimelineItemProps = {
    label: string;
    meta: string;
    title: string;
    org: string;
    children: ReactNode;
};

/**
 * One entry in the track record: the period in the left column, then the role,
 * the organisation and whatever body the entry needs. Space separates entries;
 * there is no card around them.
 */
export default function TimelineItem({
    label,
    meta,
    title,
    org,
    children,
}: TimelineItemProps) {
    return (
        <article className="grid gap-3 md:grid-cols-[9rem_1fr] md:gap-10">
            <p className="text-base text-slate-muted md:pt-1">{meta}</p>

            <div>
                <h3 className="font-display text-2xl font-bold text-sand">
                    {title}
                </h3>
                <p className="mt-1 text-base text-slate-muted">
                    {org} &middot; {label}
                </p>

                <div className="mt-4 space-y-4">{children}</div>
            </div>
        </article>
    );
}
