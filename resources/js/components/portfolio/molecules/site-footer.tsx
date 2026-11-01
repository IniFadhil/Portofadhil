import Container from '@/components/portfolio/atoms/container';
import { PROFILE } from '@/data/portfolio';

export default function SiteFooter() {
    return (
        <footer className="w-full bg-[#071113] py-10 text-sm text-slate-muted">
            <Container className="text-center">
                <p className="font-semibold text-sand">
                    {PROFILE.name} &copy; {new Date().getFullYear()}
                </p>
            </Container>
        </footer>
    );
}
