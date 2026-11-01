import type { ReactNode } from 'react';

type TimelineItemProps = {
    label: string;
    meta: string;
    title: string;
    org: string;
    children: ReactNode;
};

/**
 * One card in the track record: the label and its meta tag on a rule, the role
 * and the organisation, then whatever body the entry needs.
 */
export default function TimelineItem({
    label,
    meta,
    title,
    org,
    children,
}: TimelineItemProps) {
    return (
        <div className="flex flex-col justify-between rounded-2xl bg-deck-850 p-6 transition-colors hover:bg-deck-800 sm:p-8">
            <div className="space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-[13px] font-bold text-accent-teal">
                        {label}
                    </span>
                    <span className="rounded-md bg-deck-800 px-2.5 py-1 text-[13px] font-medium text-slate-muted">
                        {meta}
                    </span>
                </div>

                <div>
                    <h3 className="flex items-center gap-2 text-xl font-bold text-sand">
                        <span
                            aria-hidden
                            className="size-2 shrink-0 rounded-full bg-accent-teal"
                        />
                        {title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-muted sm:text-base">
                        {org}
                    </p>
                </div>

                {children}
            </div>
        </div>
    );
}
