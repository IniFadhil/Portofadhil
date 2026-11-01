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
                className="mb-8"
                title={ACHIEVEMENTS.title[locale]}
                lead={ACHIEVEMENTS.lead[locale]}
            />

            <div className="space-y-3.5 pt-2">
                {ACHIEVEMENTS.items.map((item) => (
                    <div
                        key={item.title.en}
                        className="flex flex-col justify-between gap-4 rounded-2xl bg-deck-900 p-5 transition-colors hover:bg-deck-850 sm:flex-row sm:items-center sm:p-6"
                    >
                        <div className="flex items-start gap-4 sm:items-center">
                            <span className="rounded bg-deck-800 px-2.5 py-1 text-[13px] font-bold text-slate-muted">
                                {ACHIEVEMENTS.labels[item.kind][locale]}
                            </span>

                            <div>
                                <h3 className="text-base font-bold text-sand">
                                    {item.title[locale]}
                                </h3>
                                <p className="text-sm text-slate-muted">
                                    {item.issuer}
                                </p>
                            </div>
                        </div>

                        <span className="text-sm text-slate-muted">
                            {item.period[locale]}
                        </span>
                    </div>
                ))}
            </div>
        </Section>
    );
}
