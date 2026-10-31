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

type PortfolioTemplateProps = {
    locale: Locale;
    onLocaleChange: (locale: Locale) => void;
};

/**
 * The whole page: one responsive layout, so there is no second implementation to
 * keep in step. The page paints immediately; there is no opening overlay.
 */
export default function PortfolioTemplate({
    locale,
    onLocaleChange,
}: PortfolioTemplateProps) {
    return (
        <div className="relative min-h-dvh deck-field font-ui text-sand antialiased">
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
    );
}
