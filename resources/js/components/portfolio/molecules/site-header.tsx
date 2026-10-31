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

const LINK = 'transition-colors hover:text-accent-teal';

/**
 * The sticky top bar: identity and the availability badge, the section links,
 * the language toggle and the CV action.
 *
 * The section links only appear once there is room for all seven; below that a
 * scroll strip under the bar keeps every anchor reachable on a phone.
 */
export default function SiteHeader({
    locale,
    onLocaleChange,
}: SiteHeaderProps) {
    const copy = UI[locale];
    const active = useActiveSection(SECTION_IDS);

    return (
        <header className="sticky top-0 z-40 w-full border-b border-deck-700/60 bg-[#0a1618]/85 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-8">
                <a
                    href="#hero"
                    className="group flex min-w-0 flex-col gap-1 sm:flex-row sm:items-center sm:gap-3"
                >
                    <span className="truncate text-base font-bold tracking-tight text-sand transition-colors group-hover:text-accent-teal sm:text-lg">
                        {PROFILE.name}
                    </span>

                    <span className="flex w-fit shrink-0 items-center gap-1.5 rounded-full border border-accent-teal/30 bg-deck-900/90 px-2.5 py-0.5">
                        <span
                            aria-hidden
                            className="size-2 status-pulse rounded-full bg-accent-teal"
                        />
                        <span className="text-[10px] font-semibold tracking-wider text-accent-mint uppercase">
                            {copy.status}
                        </span>
                    </span>
                </a>

                <nav
                    aria-label={copy.sections}
                    className="hidden shrink-0 items-center gap-7 text-sm font-medium text-slate-muted lg:flex"
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
                        className="inline-flex items-center gap-2 rounded-lg bg-accent-teal px-4 py-2 text-xs font-bold text-[#0a1618] shadow-[0_0_30px_rgba(45,212,191,0.2)] transition-colors hover:bg-accent-mint sm:text-sm"
                    >
                        <span>{copy.downloadCv}</span>
                        <Download className="size-4" aria-hidden />
                    </a>
                </div>
            </div>

            <div className="border-t border-deck-700/60 lg:hidden">
                <nav
                    aria-label={copy.sections}
                    className="flex custom-scrollbar gap-x-6 overflow-x-auto px-4 py-2.5 text-xs font-semibold text-slate-muted sm:px-8"
                >
                    {SECTIONS.map(({ id, hash }) => (
                        <a
                            key={id}
                            href={hash}
                            aria-current={active === id ? 'true' : undefined}
                            className={cn(
                                'shrink-0',
                                LINK,
                                active === id && 'text-accent-teal',
                            )}
                        >
                            {copy.nav[id]}
                        </a>
                    ))}
                </nav>
            </div>
        </header>
    );
}
