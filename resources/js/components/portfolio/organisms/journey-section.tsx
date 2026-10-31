import Reveal from '@/components/portfolio/atoms/reveal';
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
            <SectionHeading
                title={JOURNEY.title[locale]}
                lead={JOURNEY.lead[locale]}
            />

            <Reveal delay={80}>
                <div className="mt-14 max-w-4xl space-y-16">
                    {JOURNEY.items.map((item) => (
                        <TimelineItem
                            key={item.org}
                            label={JOURNEY.workLabel[locale]}
                            meta={item.kind[locale]}
                            title={item.role}
                            org={item.org}
                        >
                            <ul className="max-w-[62ch] space-y-2.5 text-lg leading-relaxed text-slate-muted">
                                {item.points.map((point) => (
                                    <li key={point.en}>{point[locale]}</li>
                                ))}
                            </ul>

                            <p className="text-base text-sand">
                                {JOURNEY.tags.join(' · ')}
                            </p>
                        </TimelineItem>
                    ))}

                    <TimelineItem
                        label={JOURNEY.educationLabel[locale]}
                        meta={education.period[locale]}
                        title={education.role[locale]}
                        org={education.org}
                    >
                        <p className="max-w-[62ch] text-lg leading-relaxed text-slate-muted">
                            {education.body[locale]}
                        </p>

                        <p className="text-base text-slate-muted">
                            {JOURNEY.gpaLabel[locale]}:{' '}
                            <span className="font-display text-2xl font-bold text-accent-teal">
                                {education.note[locale]}
                            </span>
                        </p>
                    </TimelineItem>
                </div>
            </Reveal>
        </Section>
    );
}
