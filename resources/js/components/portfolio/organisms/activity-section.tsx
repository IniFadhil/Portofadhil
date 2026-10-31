import Reveal from '@/components/portfolio/atoms/reveal';
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
 * cannot be fetched the panel says so and offers the profile instead.
 */
export default function ActivitySection({ locale }: ActivitySectionProps) {
    const [chartFailed, setChartFailed] = useState(false);

    return (
        <Section id="aktivitas">
            <SectionHeading
                title={ACTIVITY.title[locale]}
                lead={ACTIVITY.lead[locale]}
            />

            <Reveal delay={80}>
                <div className="mt-14 bg-deck-900 p-6 sm:p-8">
                    {chartFailed ? (
                        <p className="text-lg text-slate-muted">
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
                            className="h-auto w-full"
                        />
                    )}

                    <div className="flex items-center justify-end gap-2 pt-4 text-sm text-slate-muted">
                        <span>{ACTIVITY.less[locale]}</span>
                        <span className="size-3 bg-deck-800" />
                        <span className="size-3 bg-teal-950" />
                        <span className="size-3 bg-teal-700" />
                        <span className="size-3 bg-accent-teal" />
                        <span className="size-3 bg-accent-mint" />
                        <span>{ACTIVITY.more[locale]}</span>
                    </div>
                </div>

                <div className="mt-8 flex flex-col justify-between gap-3 text-base text-slate-muted sm:flex-row sm:items-center">
                    <span>{PROFILE.githubHandle}</span>

                    <a
                        href={PROFILE.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-semibold text-sand transition-colors hover:text-accent-teal"
                    >
                        <span>{ACTIVITY.profileLabel[locale]}</span>
                        <ArrowUpRight className="size-4" aria-hidden />
                    </a>
                </div>
            </Reveal>
        </Section>
    );
}
