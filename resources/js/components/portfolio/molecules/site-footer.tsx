import Container from '@/components/portfolio/atoms/container';
import { FOOTER, PROFILE } from '@/data/portfolio';
import type { Locale } from '@/data/portfolio';

type SiteFooterProps = {
    locale: Locale;
};

/** The close: the name back at full width, then the small print. */
export default function SiteFooter({ locale }: SiteFooterProps) {
    return (
        <footer className="w-full bg-deck-950 py-16">
            <Container>
                <p className="font-display text-[clamp(2rem,6vw,4.5rem)] leading-none font-bold tracking-[-0.04em] text-sand">
                    {PROFILE.name}
                </p>

                <div className="mt-10 flex flex-col gap-2 text-base text-slate-muted sm:flex-row sm:items-center sm:justify-between">
                    <p>{FOOTER.credit[locale]}</p>
                    <p>
                        {PROFILE.name} &copy; {new Date().getFullYear()}
                    </p>
                </div>
            </Container>
        </footer>
    );
}
