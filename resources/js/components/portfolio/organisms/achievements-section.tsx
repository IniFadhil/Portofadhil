import Reveal from '@/components/portfolio/atoms/reveal';
import Section from '@/components/portfolio/atoms/section';
import SectionHeading from '@/components/portfolio/atoms/section-heading';
import { ACHIEVEMENTS } from '@/data/portfolio';
import type { Locale } from '@/data/portfolio';

type AchievementsSectionProps = {
    locale: Locale;
};

/**
 * Certifications and academic results. Every row is a fact from the CV, so
 * there is nothing here that has to be taken on trust.
 */
export default function AchievementsSection({
    locale,
}: AchievementsSectionProps) {
    return (
        <Section id="sertifikasi" tone="tint">
            <SectionHeading
                title={ACHIEVEMENTS.title[locale]}
                lead={ACHIEVEMENTS.lead[locale]}
            />

            <Reveal delay={80}>
                <ul className="mt-14 max-w-5xl space-y-12">
                    {ACHIEVEMENTS.items.map((item) => (
                        <li
                            key={item.title.en}
                            className="grid gap-2 md:grid-cols-[11rem_1fr_7rem] md:gap-10"
                        >
                            <span className="text-base text-slate-muted md:pt-1">
                                {ACHIEVEMENTS.labels[item.kind][locale]}
                            </span>

                            <div>
                                <h3 className="font-display text-2xl font-bold text-sand">
                                    {item.title[locale]}
                                </h3>
                                <p className="mt-1 text-base text-slate-muted">
                                    {item.issuer}
                                </p>
                            </div>

                            <span className="text-base text-slate-muted md:pt-1 md:text-right">
                                {item.period[locale]}
                            </span>
                        </li>
                    ))}
                </ul>
            </Reveal>
        </Section>
    );
}
