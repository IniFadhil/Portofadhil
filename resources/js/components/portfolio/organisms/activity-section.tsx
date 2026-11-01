import Section from '@/components/portfolio/atoms/section';
import SectionHeading from '@/components/portfolio/atoms/section-heading';
import { ACTIVITY, PROFILE } from '@/data/portfolio';
import type { Locale } from '@/data/portfolio';
import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';

type ActivitySectionProps = {
    locale: Locale;
};

/**
 * Coding activity: the live public contribution calendar for the GitHub
 * account, so nothing here is a stored number that can go stale. If the chart
 * cannot be fetched the frame says so and offers the profile instead.
 */
export default function ActivitySection({ locale }: ActivitySectionProps) {
    const [chartFailed, setChartFailed] = useState(false);

    return (
        <Section id="aktivitas">
            <SectionHeading
                className="mb-8"
                title={ACTIVITY.title[locale]}
                lead={ACTIVITY.lead[locale]}
            />

            <div className="custom-scrollbar overflow-x-auto rounded-3xl bg-deck-900 p-6">
                {chartFailed ? (
                    <p className="text-sm text-slate-muted">
                        {ACTIVITY.unavailable[locale]}
                    </p>
                ) : (
                    <img
                        src={ACTIVITY.chartUrl}
                        alt={ACTIVITY.chartAlt[locale]}
                        width={722}
                        height={112}
                        loading="lazy"
                        decoding="async"
                        onError={() => setChartFailed(true)}
                        className="h-auto w-full min-w-[700px] rounded-xl bg-white p-2"
                    />
                )}

                <div className="flex items-center justify-end gap-2 pt-3 text-[13px] text-slate-muted">
                    <span>{ACTIVITY.less[locale]}</span>
                    <span className="size-2.5 rounded-sm bg-deck-850" />
                    <span className="size-2.5 rounded-sm bg-teal-950" />
                    <span className="size-2.5 rounded-sm bg-teal-700" />
                    <span className="size-2.5 rounded-sm bg-accent-teal" />
                    <span className="size-2.5 rounded-sm bg-accent-mint" />
                    <span>{ACTIVITY.more[locale]}</span>
                </div>
            </div>

            <div className="flex flex-col items-center justify-between gap-2 pt-6 text-sm text-slate-muted sm:flex-row">
                <span className="text-sm">{PROFILE.githubHandle}</span>

                <a
                    href={PROFILE.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-semibold transition-colors hover:text-accent-teal"
                >
                    <span>{ACTIVITY.profileLabel[locale]}</span>
                    <ArrowUpRight className="size-3.5" aria-hidden />
                </a>
            </div>
        </Section>
    );
}
