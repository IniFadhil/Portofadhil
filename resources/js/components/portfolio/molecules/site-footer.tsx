import Container from '@/components/portfolio/atoms/container';
import { FOOTER, PROFILE } from '@/data/portfolio';
import type { Locale } from '@/data/portfolio';

type SiteFooterProps = {
    locale: Locale;
};

export default function SiteFooter({ locale }: SiteFooterProps) {
    return (
        <footer className="w-full bg-[#071113] py-10 text-sm text-slate-muted">
            <Container className="flex flex-col items-center justify-between gap-2 text-center sm:flex-row sm:text-left">
                <p>{FOOTER.credit[locale]}</p>
                <p className="font-semibold text-sand">
                    {PROFILE.name} &copy; {new Date().getFullYear()}
                </p>
            </Container>
        </footer>
    );
}
