import Emphasis from '@/components/portfolio/atoms/emphasis';
import Section from '@/components/portfolio/atoms/section';
import SectionHeading from '@/components/portfolio/atoms/section-heading';
import { ABOUT } from '@/data/portfolio';
import type { Locale } from '@/data/portfolio';

type AboutSectionProps = {
    locale: Locale;
};

export default function AboutSection({ locale }: AboutSectionProps) {
    return (
        <Section id="tentang" tone="tint">
            <div className="flex flex-col justify-between gap-8 md:flex-row md:items-start lg:gap-16">
                <div className="md:w-1/3">
                    <SectionHeading
                        kicker={ABOUT.kicker[locale]}
                        title={ABOUT.title[locale]}
                    />
                </div>

                <div className="space-y-4 text-base leading-relaxed text-slate-muted sm:text-lg md:w-2/3">
                    <p>
                        <Emphasis text={ABOUT.lead[locale]} />
                    </p>

                    <p>
                        <Emphasis text={ABOUT.body[locale]} />
                    </p>

                    <p className="text-sand/90">{ABOUT.note[locale]}</p>
                </div>
            </div>
        </Section>
    );
}
