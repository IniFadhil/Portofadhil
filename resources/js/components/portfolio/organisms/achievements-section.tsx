import Section from '@/components/portfolio/atoms/section';
import SectionHeading from '@/components/portfolio/atoms/section-heading';
import { ACHIEVEMENTS } from '@/data/portfolio';
import type { Locale } from '@/data/portfolio';
import { Check } from 'lucide-react';

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
                kicker={ACHIEVEMENTS.kicker[locale]}
                title={ACHIEVEMENTS.title[locale]}
                lead={ACHIEVEMENTS.lead[locale]}
            />

            <div className="space-y-3.5 pt-2">
                {ACHIEVEMENTS.items.map((item) => (
                    <div
                        key={item.title.en}
                        className="flex flex-col justify-between gap-4 rounded-2xl glass-card p-5 transition-colors hover:border-accent-teal/40 sm:flex-row sm:items-center sm:p-6"
                    >
                        <div className="flex items-start gap-4 sm:items-center">
                            <span className="rounded border border-deck-700/60 bg-deck-850 px-2.5 py-1 text-[10px] font-bold tracking-widest text-slate-muted uppercase">
                                {ACHIEVEMENTS.labels[item.kind][locale]}
                            </span>

                            <div>
                                <h3 className="text-base font-bold text-sand">
                                    {item.title[locale]}
                                </h3>
                                <p className="text-xs text-slate-muted">
                                    {item.issuer}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between gap-3 sm:justify-end">
                            <span className="font-mono text-xs text-slate-muted">
                                {item.period[locale]}
                            </span>
                            <span className="flex size-7 items-center justify-center rounded-full bg-accent-teal/20 text-accent-teal">
                                <Check className="size-4" aria-hidden />
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
}
