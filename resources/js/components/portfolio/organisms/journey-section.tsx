import Section from '@/components/portfolio/atoms/section';
import SectionHeading from '@/components/portfolio/atoms/section-heading';
import TimelineItem from '@/components/portfolio/molecules/timeline-item';
import { JOURNEY } from '@/data/portfolio';
import type { Locale } from '@/data/portfolio';

type JourneySectionProps = {
    locale: Locale;
};

export default function JourneySection({ locale }: JourneySectionProps) {
    const { education } = JOURNEY;

    return (
        <Section id="pengalaman" tone="tint">
            <SectionHeading className="mb-8" title={JOURNEY.title[locale]} />

            <div className="grid grid-cols-1 gap-6 pt-2 md:grid-cols-2">
                {JOURNEY.items.map((item) => (
                    <TimelineItem
                        key={item.org}
                        label={JOURNEY.workLabel[locale]}
                        meta={item.kind[locale]}
                        title={item.role}
                        org={item.org}
                    >
                        <ul className="list-inside list-disc space-y-2.5 text-base leading-relaxed text-slate-muted">
                            {item.points.map((point) => (
                                <li key={point.en}>{point[locale]}</li>
                            ))}
                        </ul>

                        <div className="flex flex-wrap gap-2 pt-4">
                            {JOURNEY.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded bg-deck-800 px-2.5 py-1 text-[13px] text-slate-muted"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </TimelineItem>
                ))}

                <TimelineItem
                    label={JOURNEY.educationLabel[locale]}
                    meta={education.period[locale]}
                    title={education.role[locale]}
                    org={education.org}
                >
                    <div className="inline-flex items-baseline gap-2 rounded-xl bg-deck-800 p-3">
                        <span className="text-sm font-semibold text-slate-muted">
                            {JOURNEY.gpaLabel[locale]}:
                        </span>
                        <span className="font-display text-lg font-bold text-accent-teal">
                            {education.note[locale]}
                        </span>
                    </div>

                    <p className="text-sm leading-relaxed text-slate-muted">
                        {education.body[locale]}
                    </p>
                </TimelineItem>
            </div>
        </Section>
    );
}
