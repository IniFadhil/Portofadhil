import IntroLoader from '@/components/portfolio/molecules/intro-loader';
import SiteFooter from '@/components/portfolio/molecules/site-footer';
import SiteHeader from '@/components/portfolio/molecules/site-header';
import AboutSection from '@/components/portfolio/organisms/about-section';
import AchievementsSection from '@/components/portfolio/organisms/achievements-section';
import ActivitySection from '@/components/portfolio/organisms/activity-section';
import CapabilitiesSection from '@/components/portfolio/organisms/capabilities-section';
import ContactSection from '@/components/portfolio/organisms/contact-section';
import HeroSection from '@/components/portfolio/organisms/hero-section';
import JourneySection from '@/components/portfolio/organisms/journey-section';
import WorksSection from '@/components/portfolio/organisms/works-section';
import type { Locale } from '@/data/portfolio';
import { useReducedMotion } from 'framer-motion';
import { useEffect, useState } from 'react';

type PortfolioTemplateProps = {
    locale: Locale;
    onLocaleChange: (locale: Locale) => void;
};

/** Set once the intro has played, so a return visit in the same tab skips it. */
const INTRO_KEY = 'portfolio-intro-played';

/**
 * The whole page: one responsive layout, so there is no second implementation to
 * keep in step. The ambient glows sit behind everything and never scroll.
 *
 * The intro is an overlay on top of the live page, decided after hydration: once
 * per tab, and never at all when the visitor asked for reduced motion.
 */
export default function PortfolioTemplate({
    locale,
    onLocaleChange,
}: PortfolioTemplateProps) {
    const reduceMotion = useReducedMotion();
    const [intro, setIntro] = useState(false);

    useEffect(() => {
        if (reduceMotion || window.sessionStorage.getItem(INTRO_KEY)) {
            return;
        }

        window.sessionStorage.setItem(INTRO_KEY, '1');
        setIntro(true);
    }, [reduceMotion]);

    return (
        <div className="relative min-h-dvh deck-field font-ui text-sand antialiased">
            <div
                aria-hidden
                className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
            >
                <div className="absolute -top-40 right-1/4 size-[600px] rounded-full bg-accent-teal/10 blur-[140px]" />
                <div className="absolute top-[40%] -left-36 size-[500px] rounded-full bg-accent-cyan/10 blur-[130px]" />
                <div className="absolute right-10 bottom-10 size-[550px] rounded-full bg-accent-teal/8 blur-[150px]" />
            </div>

            <div className="relative z-10" inert={intro}>
                <SiteHeader locale={locale} onLocaleChange={onLocaleChange} />

                <main className="relative w-full overflow-hidden">
                    <HeroSection locale={locale} />
                    <AboutSection locale={locale} />
                    <CapabilitiesSection locale={locale} />
                    <JourneySection locale={locale} />
                    <WorksSection locale={locale} />
                    <AchievementsSection locale={locale} />
                    <ActivitySection locale={locale} />
                    <ContactSection locale={locale} />
                </main>

                <SiteFooter locale={locale} />
            </div>

            {intro ? (
                <IntroLoader locale={locale} onDone={() => setIntro(false)} />
            ) : null}
        </div>
    );
}
