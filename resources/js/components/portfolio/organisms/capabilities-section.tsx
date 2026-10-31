import Reveal from '@/components/portfolio/atoms/reveal';
import Section from '@/components/portfolio/atoms/section';
import SectionHeading from '@/components/portfolio/atoms/section-heading';
import SkillGroup from '@/components/portfolio/molecules/skill-group';
import { CAPABILITIES, SKILL_FILTERS, UI } from '@/data/portfolio';
import type { Locale, SkillKey } from '@/data/portfolio';
import { cn } from '@/lib/utils';
import { useState } from 'react';

type CapabilitiesSectionProps = {
    locale: Locale;
};

const TAB =
    'rounded-full px-4 py-2 text-base font-semibold transition-colors focus-visible:ring-2 focus-visible:ring-accent-teal focus-visible:outline-none';

/**
 * The skills table, with a filter row above it. `null` is the "all" tab; picking
 * a group key hides every other row. Filtering is presentation only, so the
 * whole table stays in the DOM and every row is reachable without JavaScript.
 */
export default function CapabilitiesSection({
    locale,
}: CapabilitiesSectionProps) {
    const copy = UI[locale];
    const [filter, setFilter] = useState<SkillKey | null>(null);

    const tabs: { key: SkillKey | null; label: string }[] = [
        { key: null, label: copy.filterAll },
        ...SKILL_FILTERS.map((key) => ({ key, label: copy.filters[key] })),
    ];

    const groups = CAPABILITIES.groups.filter(
        (group) => filter === null || group.key === filter,
    );

    return (
        <Section id="perkakas">
            <SectionHeading
                title={CAPABILITIES.title[locale]}
                lead={CAPABILITIES.lead[locale]}
            />

            <Reveal delay={80}>
                <div
                    role="group"
                    aria-label={CAPABILITIES.title[locale]}
                    className="mt-10 flex flex-wrap gap-2"
                >
                    {tabs.map((tab) => (
                        <button
                            key={tab.key ?? 'all'}
                            type="button"
                            onClick={() => setFilter(tab.key)}
                            aria-pressed={filter === tab.key}
                            className={cn(
                                TAB,
                                filter === tab.key
                                    ? 'bg-accent-teal text-[#0a1618]'
                                    : 'bg-deck-900 text-slate-muted hover:text-sand',
                            )}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="mt-12 space-y-7">
                    {groups.map((group) => (
                        <SkillGroup
                            key={`${group.key}-${group.label.en}`}
                            label={group.label[locale]}
                            items={group.items}
                        />
                    ))}
                </div>
            </Reveal>
        </Section>
    );
}
