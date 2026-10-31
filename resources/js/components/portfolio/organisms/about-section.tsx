import Emphasis from '@/components/portfolio/atoms/emphasis';
import Reveal from '@/components/portfolio/atoms/reveal';
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
            <div className="grid gap-10 md:grid-cols-12 md:gap-12">
                <SectionHeading
                    className="md:col-span-5"
                    title={ABOUT.title[locale]}
                />

                <Reveal delay={80} className="md:col-span-7">
                    <div className="max-w-[62ch] space-y-5 text-lg leading-relaxed text-slate-muted">
                        <p>
                            <Emphasis text={ABOUT.lead[locale]} />
                        </p>

                        <p>
                            <Emphasis text={ABOUT.body[locale]} />
                        </p>

                        <p className="text-sand">{ABOUT.note[locale]}</p>
                    </div>
                </Reveal>
            </div>
        </Section>
    );
}
