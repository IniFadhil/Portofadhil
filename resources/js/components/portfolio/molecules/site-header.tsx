import LanguageSwitch from '@/components/portfolio/molecules/language-switch';
import { PROFILE, SECTIONS, UI } from '@/data/portfolio';
import type { Locale } from '@/data/portfolio';
import { useActiveSection } from '@/hooks/use-active-section';
import { cn } from '@/lib/utils';
import { Download } from 'lucide-react';

const SECTION_IDS = SECTIONS.map(({ id }) => id);

type SiteHeaderProps = {
    locale: Locale;
    onLocaleChange: (locale: Locale) => void;
};

const LINK = 'transition-colors hover:text-sand';

/**
 * The sticky top bar: the name, the section links, the language toggle and the
 * CV action. One flat bar, no chrome, and the links wrap on a phone instead of
 * scrolling off the edge.
 */
export default function SiteHeader({
    locale,
    onLocaleChange,
}: SiteHeaderProps) {
    const copy = UI[locale];
    const active = useActiveSection(SECTION_IDS);

    return (
        <header className="sticky top-0 z-40 w-full bg-deck-950">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-12">
                <a
                    href="#hero"
                    className="shrink-0 text-lg font-bold tracking-tight text-sand transition-colors hover:text-accent-teal"
                >
                    {PROFILE.name}
                </a>

                <nav
                    aria-label={copy.sections}
                    className="hidden shrink-0 items-center gap-7 text-base text-slate-muted lg:flex"
                >
                    {SECTIONS.map(({ id, hash }) => (
                        <a
                            key={id}
                            href={hash}
                            aria-current={active === id ? 'true' : undefined}
                            className={cn(
                                LINK,
                                active === id && 'text-accent-teal',
                            )}
                        >
                            {copy.nav[id]}
                        </a>
                    ))}
                </nav>

                <div className="flex shrink-0 items-center gap-3">
                    <div className="hidden sm:block">
                        <LanguageSwitch
                            locale={locale}
                            label={copy.language}
                            onChange={onLocaleChange}
                        />
                    </div>

                    <a
                        href={PROFILE.cv}
                        download
                        className="inline-flex items-center gap-2 rounded-full bg-accent-teal px-4 py-2 text-base font-bold text-[#0a1618] transition-colors hover:bg-accent-mint"
                    >
                        <span>{copy.downloadCv}</span>
                        <Download className="size-4" aria-hidden />
                    </a>
                </div>
            </div>

            <nav
                aria-label={copy.sections}
                className="flex flex-wrap gap-x-5 gap-y-1 px-5 pb-3 text-base font-medium text-slate-muted sm:px-8 lg:hidden lg:px-12"
            >
                {SECTIONS.map(({ id, hash }) => (
                    <a
                        key={id}
                        href={hash}
                        aria-current={active === id ? 'true' : undefined}
                        className={cn(
                            LINK,
                            active === id && 'text-accent-teal',
                        )}
                    >
                        {copy.nav[id]}
                    </a>
                ))}
            </nav>
        </header>
    );
}
